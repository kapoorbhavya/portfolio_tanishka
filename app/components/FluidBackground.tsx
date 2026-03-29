"use client";

import { useEffect, useRef } from "react";

// ─── Physics config ─────────────────────────────────────────────────────────
const CONFIG = {
  SIM_RESOLUTION: 128,
  DYE_RESOLUTION: 1024,
  DENSITY_DISSIPATION: 0.98,   // keeps ripples alive longer
  VELOCITY_DISSIPATION: 0.98,
  PRESSURE: 0.8,
  PRESSURE_ITERATIONS: 20,
  CURL: 15,                    // organic micro-swirls
  SPLAT_RADIUS: 0.25,          // large, soft impact
  SPLAT_FORCE: 6000,
  VELOCITY_DIFFUSION: 0.2,     // thick, connected feel
  COLORFUL: false,
  COLOR_UPDATE_SPEED: 10,
  PAUSED: false,
  BACK_COLOR: { r: 0, g: 0, b: 0 },
  TRANSPARENT: false,
};

// ─── WebGL helpers ───────────────────────────────────────────────────────────
function compileShader(gl: WebGL2RenderingContext, type: number, src: string) {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS))
    throw new Error(gl.getShaderInfoLog(s) ?? "shader compile error");
  return s;
}

function createProgram(gl: WebGL2RenderingContext, vert: string, frag: string) {
  const p = gl.createProgram()!;
  gl.attachShader(p, compileShader(gl, gl.VERTEX_SHADER, vert));
  gl.attachShader(p, compileShader(gl, gl.FRAGMENT_SHADER, frag));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS))
    throw new Error(gl.getProgramInfoLog(p) ?? "link error");
  return p;
}

function getUniforms(gl: WebGL2RenderingContext, program: WebGLProgram) {
  const count = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS) as number;
  const uniforms: Record<string, WebGLUniformLocation> = {};
  for (let i = 0; i < count; i++) {
    const info = gl.getActiveUniform(program, i)!;
    uniforms[info.name] = gl.getUniformLocation(program, info.name)!;
  }
  return uniforms;
}

// ─── Shaders ─────────────────────────────────────────────────────────────────
const baseVertSrc = `#version 300 es
  precision highp float;
  in vec2 aPosition;
  out vec2 vUv;
  out vec2 vL;
  out vec2 vR;
  out vec2 vT;
  out vec2 vB;
  uniform vec2 texelSize;
  void main(){
    vUv = aPosition*0.5+0.5;
    vL = vUv - vec2(texelSize.x,0.0);
    vR = vUv + vec2(texelSize.x,0.0);
    vT = vUv + vec2(0.0,texelSize.y);
    vB = vUv - vec2(0.0,texelSize.y);
    gl_Position = vec4(aPosition,0.0,1.0);
  }`;

const clearFrag = `#version 300 es
  precision mediump float;
  in vec2 vUv;
  out vec4 fragColor;
  uniform sampler2D uTexture;
  uniform float value;
  void main(){ fragColor = value*texture(uTexture,vUv); }`;

const splatFrag = `#version 300 es
  precision highp float;
  in vec2 vUv;
  out vec4 fragColor;
  uniform sampler2D uTarget;
  uniform float aspectRatio;
  uniform vec3 color;
  uniform vec2 point;
  uniform float radius;
  void main(){
    vec2 p = vUv - point.xy;
    p.x *= aspectRatio;
    float sp = exp(-dot(p,p)/(radius*radius));
    vec3 base = texture(uTarget,vUv).xyz;
    fragColor = vec4(base + sp*color, 1.0);
  }`;

const advectionFrag = `#version 300 es
  precision highp float;
  in vec2 vUv;
  out vec4 fragColor;
  uniform sampler2D uVelocity;
  uniform sampler2D uSource;
  uniform vec2 texelSize;
  uniform vec2 dyeTexelSize;
  uniform float dt;
  uniform float dissipation;
  vec4 bilerp(sampler2D sam, vec2 uv, vec2 tsize){
    vec2 st = uv/tsize - 0.5;
    vec2 iuv = floor(st);
    vec2 fuv = fract(st);
    vec4 a = texture(sam,(iuv+vec2(0.5,0.5))*tsize);
    vec4 b = texture(sam,(iuv+vec2(1.5,0.5))*tsize);
    vec4 c = texture(sam,(iuv+vec2(0.5,1.5))*tsize);
    vec4 d = texture(sam,(iuv+vec2(1.5,1.5))*tsize);
    return mix(mix(a,b,fuv.x),mix(c,d,fuv.x),fuv.y);
  }
  void main(){
    vec2 coord = vUv - dt*bilerp(uVelocity,vUv,texelSize).xy*texelSize;
    fragColor = dissipation*bilerp(uSource,coord,dyeTexelSize);
    fragColor.a = 1.0;
  }`;

const divergenceFrag = `#version 300 es
  precision mediump float;
  in vec2 vL; in vec2 vR; in vec2 vT; in vec2 vB;
  out vec4 fragColor;
  uniform sampler2D uVelocity;
  void main(){
    float L=texture(uVelocity,vL).x;
    float R=texture(uVelocity,vR).x;
    float T=texture(uVelocity,vT).y;
    float B=texture(uVelocity,vB).y;
    float div=0.5*(R-L+T-B);
    fragColor=vec4(div,0,0,1);
  }`;

const curlFrag = `#version 300 es
  precision mediump float;
  in vec2 vL; in vec2 vR; in vec2 vT; in vec2 vB;
  out vec4 fragColor;
  uniform sampler2D uVelocity;
  void main(){
    float L=texture(uVelocity,vL).y;
    float R=texture(uVelocity,vR).y;
    float T=texture(uVelocity,vT).x;
    float B=texture(uVelocity,vB).x;
    fragColor=vec4(0.5*(R-L-(T-B)),0,0,1);
  }`;

const vorticityFrag = `#version 300 es
  precision highp float;
  in vec2 vUv; in vec2 vL; in vec2 vR; in vec2 vT; in vec2 vB;
  out vec4 fragColor;
  uniform sampler2D uVelocity;
  uniform sampler2D uCurl;
  uniform float curl;
  uniform float dt;
  void main(){
    float L=texture(uCurl,vL).x;
    float R=texture(uCurl,vR).x;
    float T=texture(uCurl,vT).x;
    float B=texture(uCurl,vB).x;
    float C=texture(uCurl,vUv).x;
    vec2 force=0.5*vec2(abs(T)-abs(B),abs(R)-abs(L));
    force/=length(force)+0.0001;
    force*=curl*C;
    force.y*=-1.0;
    vec2 vel=texture(uVelocity,vUv).xy;
    fragColor=vec4(vel+force*dt,0,1);
  }`;

const pressureFrag = `#version 300 es
  precision mediump float;
  in vec2 vUv; in vec2 vL; in vec2 vR; in vec2 vT; in vec2 vB;
  out vec4 fragColor;
  uniform sampler2D uPressure;
  uniform sampler2D uDivergence;
  void main(){
    float L=texture(uPressure,vL).x;
    float R=texture(uPressure,vR).x;
    float T=texture(uPressure,vT).x;
    float B=texture(uPressure,vB).x;
    float div=texture(uDivergence,vUv).x;
    float p=(L+R+T+B-div)*0.25;
    fragColor=vec4(p,0,0,1);
  }`;

const gradientSubtractFrag = `#version 300 es
  precision mediump float;
  in vec2 vUv; in vec2 vL; in vec2 vR; in vec2 vT; in vec2 vB;
  out vec4 fragColor;
  uniform sampler2D uPressure;
  uniform sampler2D uVelocity;
  void main(){
    float L=texture(uPressure,vL).x;
    float R=texture(uPressure,vR).x;
    float T=texture(uPressure,vT).x;
    float B=texture(uPressure,vB).x;
    vec2 vel=texture(uVelocity,vUv).xy;
    vel-=vec2(R-L,T-B);
    fragColor=vec4(vel,0,1);
  }`;

const displayFrag = `#version 300 es
  precision highp float;
  in vec2 vUv;
  out vec4 fragColor;
  uniform sampler2D uTexture;
  void main(){
    vec3 c = texture(uTexture,vUv).rgb;
    // Soft, dark fluid — white ripples at low opacity
    float lum = dot(c, vec3(0.299,0.587,0.114));
    vec3 fluid = vec3(lum) * 1.4;
    fragColor = vec4(fluid, clamp(lum * 0.55, 0.0, 0.08));
  }`;

// ─── FBO helpers ─────────────────────────────────────────────────────────────
interface FBO {
  texture: WebGLTexture;
  fbo: WebGLFramebuffer;
  width: number;
  height: number;
  texelSizeX: number;
  texelSizeY: number;
  attach: (id: number) => number;
}

interface DoubleFBO {
  read: FBO;
  write: FBO;
  swap: () => void;
}

function createFBO(
  gl: WebGL2RenderingContext,
  w: number,
  h: number,
  internalFormat: number,
  format: number,
  type: number,
  filter: number
): FBO {
  gl.activeTexture(gl.TEXTURE0);
  const texture = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, internalFormat, w, h, 0, format, type, null);

  const fbo = gl.createFramebuffer()!;
  gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
  gl.viewport(0, 0, w, h);
  gl.clear(gl.COLOR_BUFFER_BIT);

  return {
    texture, fbo, width: w, height: h,
    texelSizeX: 1 / w, texelSizeY: 1 / h,
    attach(id: number) { gl.activeTexture(gl.TEXTURE0 + id); gl.bindTexture(gl.TEXTURE_2D, texture); return id; },
  };
}

function createDoubleFBO(
  gl: WebGL2RenderingContext,
  w: number, h: number,
  internalFormat: number, format: number, type: number, filter: number
): DoubleFBO {
  let read = createFBO(gl, w, h, internalFormat, format, type, filter);
  let write = createFBO(gl, w, h, internalFormat, format, type, filter);
  return {
    get read() { return read; },
    get write() { return write; },
    swap() { [read, write] = [write, read]; },
  };
}

// ─── FluidBackground component ───────────────────────────────────────────────
export default function FluidBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      depth: false,
      stencil: false,
      antialias: false,
      preserveDrawingBuffer: false,
    }) as WebGL2RenderingContext | null;

    if (!gl) {
      console.warn("WebGL2 not supported — fluid background disabled");
      return;
    }

    // ── Formats ──────────────────────────────────────────────────────────────
    const halfFloat = gl.getExtension("EXT_color_buffer_float");
    const supportLinear = gl.getExtension("OES_texture_float_linear");
    const RG = gl.RG16F;
    const RGBA = gl.RGBA16F;
    const R = gl.R16F;
    const FMT_RG = gl.RG;
    const FMT_RGBA = gl.RGBA;
    const FMT_R = gl.RED;
    const HALF = gl.HALF_FLOAT;
    const filterMode = supportLinear ? gl.LINEAR : gl.NEAREST;

    if (!halfFloat) { console.warn("EXT_color_buffer_float not supported"); return; }

    // ── Programs ─────────────────────────────────────────────────────────────
    const mkProg = (frag: string) => {
      const p = createProgram(gl, baseVertSrc, frag);
      return { program: p, uniforms: getUniforms(gl, p) };
    };
    const clearProg       = mkProg(clearFrag);
    const splatProg       = mkProg(splatFrag);
    const advectionProg   = mkProg(advectionFrag);
    const divergenceProg  = mkProg(divergenceFrag);
    const curlProg        = mkProg(curlFrag);
    const vorticityProg   = mkProg(vorticityFrag);
    const pressureProg    = mkProg(pressureFrag);
    const gradSubProg     = mkProg(gradientSubtractFrag);
    const displayProg     = mkProg(displayFrag);

    // ── Quad ─────────────────────────────────────────────────────────────────
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,-1,1,1,1,1,-1]), gl.STATIC_DRAW);
    const ibuf = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ibuf);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0,1,2,0,2,3]), gl.STATIC_DRAW);

    const setupAttrib = (prog: WebGLProgram) => {
      const loc = gl.getAttribLocation(prog, "aPosition");
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    };

    const drawQuad = (target: FBO | null) => {
      if (target) {
        gl.viewport(0, 0, target.width, target.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, target.fbo);
      } else {
        gl.viewport(0, 0, canvas.width, canvas.height);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      }
      gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
    };

    // ── FBOs ─────────────────────────────────────────────────────────────────
    const simRes = (res: number) => {
      const ar = canvas.width / canvas.height;
      return ar > 1
        ? { w: Math.round(res * ar), h: res }
        : { w: res, h: Math.round(res / ar) };
    };

    const s = simRes(CONFIG.SIM_RESOLUTION);
    const d = simRes(CONFIG.DYE_RESOLUTION);

    let velocity  = createDoubleFBO(gl, s.w, s.h, RG,   FMT_RG,   HALF, filterMode);
    let density   = createDoubleFBO(gl, d.w, d.h, RGBA,  FMT_RGBA,  HALF, filterMode);
    let divergence = createFBO(gl, s.w, s.h, R,    FMT_R,    HALF, gl.NEAREST);
    let curlFbo   = createFBO(gl, s.w, s.h, R,    FMT_R,    HALF, gl.NEAREST);
    let pressure  = createDoubleFBO(gl, s.w, s.h, R,    FMT_R,    HALF, gl.NEAREST);

    // ── Resize ───────────────────────────────────────────────────────────────
    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      // Re-create FBOs at new resolution (fluid state resets — acceptable)
      const ns = simRes(CONFIG.SIM_RESOLUTION);
      const nd = simRes(CONFIG.DYE_RESOLUTION);
      velocity   = createDoubleFBO(gl, ns.w, ns.h, RG,   FMT_RG,   HALF, filterMode);
      density    = createDoubleFBO(gl, nd.w, nd.h, RGBA,  FMT_RGBA,  HALF, filterMode);
      divergence = createFBO(gl, ns.w, ns.h, R,    FMT_R,    HALF, gl.NEAREST);
      curlFbo    = createFBO(gl, ns.w, ns.h, R,    FMT_R,    HALF, gl.NEAREST);
      pressure   = createDoubleFBO(gl, ns.w, ns.h, R,    FMT_R,    HALF, gl.NEAREST);
    };

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    window.addEventListener("resize", resize);

    // ── Mouse ─────────────────────────────────────────────────────────────────
    const pointer = { x: 0, y: 0, dx: 0, dy: 0, down: false, moved: false };
    const lastPos = { x: -1, y: -1 };

    const normalise = (x: number, y: number) => ({
      x: x / canvas.width,
      y: 1 - y / canvas.height,
    });

    const onMove = (e: MouseEvent) => {
      const { x: nx, y: ny } = normalise(e.clientX, e.clientY);
      if (lastPos.x < 0) { lastPos.x = nx; lastPos.y = ny; }
      pointer.dx = (nx - lastPos.x) * 8;
      pointer.dy = (ny - lastPos.y) * 8;
      lastPos.x = nx; lastPos.y = ny;
      pointer.x = nx; pointer.y = ny;
      pointer.moved = true;
    };
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      const { x: nx, y: ny } = normalise(t.clientX, t.clientY);
      if (lastPos.x < 0) { lastPos.x = nx; lastPos.y = ny; }
      pointer.dx = (nx - lastPos.x) * 8;
      pointer.dy = (ny - lastPos.y) * 8;
      lastPos.x = nx; lastPos.y = ny;
      pointer.x = nx; pointer.y = ny;
      pointer.moved = true;
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: true });

    // ── Splat ─────────────────────────────────────────────────────────────────
    const splat = (x: number, y: number, dx: number, dy: number, color: [number,number,number]) => {
      const ar = canvas.width / canvas.height;

      gl.useProgram(splatProg.program);
      setupAttrib(splatProg.program);

      // velocity splat
      gl.uniform1i(splatProg.uniforms.uTarget, velocity.read.attach(0));
      gl.uniform1f(splatProg.uniforms.aspectRatio, ar);
      gl.uniform2f(splatProg.uniforms.point, x, y);
      gl.uniform3f(splatProg.uniforms.color, dx, dy, 0);
      gl.uniform1f(splatProg.uniforms.radius, CONFIG.SPLAT_RADIUS / 100);
      drawQuad(velocity.write);
      velocity.swap();

      // dye splat
      gl.uniform1i(splatProg.uniforms.uTarget, density.read.attach(0));
      gl.uniform3f(splatProg.uniforms.color, color[0], color[1], color[2]);
      gl.uniform1f(splatProg.uniforms.radius, CONFIG.SPLAT_RADIUS / 100);
      drawQuad(density.write);
      density.swap();
    };

    // ── Simulation step ───────────────────────────────────────────────────────
    let last = performance.now();
    let rafId: number;

    const step = (dt: number) => {
      gl.disable(gl.BLEND);

      const ts = { x: velocity.read.texelSizeX, y: velocity.read.texelSizeY };

      // Curl
      gl.useProgram(curlProg.program);
      setupAttrib(curlProg.program);
      gl.uniform2f(curlProg.uniforms.texelSize, ts.x, ts.y);
      gl.uniform1i(curlProg.uniforms.uVelocity, velocity.read.attach(0));
      drawQuad(curlFbo);

      // Vorticity
      gl.useProgram(vorticityProg.program);
      setupAttrib(vorticityProg.program);
      gl.uniform2f(vorticityProg.uniforms.texelSize, ts.x, ts.y);
      gl.uniform1i(vorticityProg.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(vorticityProg.uniforms.uCurl, curlFbo.attach(1));
      gl.uniform1f(vorticityProg.uniforms.curl, CONFIG.CURL);
      gl.uniform1f(vorticityProg.uniforms.dt, dt);
      drawQuad(velocity.write);
      velocity.swap();

      // Divergence
      gl.useProgram(divergenceProg.program);
      setupAttrib(divergenceProg.program);
      gl.uniform2f(divergenceProg.uniforms.texelSize, ts.x, ts.y);
      gl.uniform1i(divergenceProg.uniforms.uVelocity, velocity.read.attach(0));
      drawQuad(divergence);

      // Clear pressure
      gl.useProgram(clearProg.program);
      setupAttrib(clearProg.program);
      gl.uniform1i(clearProg.uniforms.uTexture, pressure.read.attach(0));
      gl.uniform1f(clearProg.uniforms.value, CONFIG.PRESSURE);
      drawQuad(pressure.write);
      pressure.swap();

      // Pressure solve
      gl.useProgram(pressureProg.program);
      setupAttrib(pressureProg.program);
      gl.uniform2f(pressureProg.uniforms.texelSize, ts.x, ts.y);
      gl.uniform1i(pressureProg.uniforms.uDivergence, divergence.attach(0));
      for (let i = 0; i < CONFIG.PRESSURE_ITERATIONS; i++) {
        gl.uniform1i(pressureProg.uniforms.uPressure, pressure.read.attach(1));
        drawQuad(pressure.write);
        pressure.swap();
      }

      // Gradient subtract
      gl.useProgram(gradSubProg.program);
      setupAttrib(gradSubProg.program);
      gl.uniform2f(gradSubProg.uniforms.texelSize, ts.x, ts.y);
      gl.uniform1i(gradSubProg.uniforms.uPressure, pressure.read.attach(0));
      gl.uniform1i(gradSubProg.uniforms.uVelocity, velocity.read.attach(1));
      drawQuad(velocity.write);
      velocity.swap();

      // Advect velocity
      gl.useProgram(advectionProg.program);
      setupAttrib(advectionProg.program);
      gl.uniform2f(advectionProg.uniforms.texelSize, ts.x, ts.y);
      gl.uniform2f(advectionProg.uniforms.dyeTexelSize, ts.x, ts.y);
      gl.uniform1i(advectionProg.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(advectionProg.uniforms.uSource, velocity.read.attach(0));
      gl.uniform1f(advectionProg.uniforms.dt, dt);
      gl.uniform1f(advectionProg.uniforms.dissipation, CONFIG.VELOCITY_DISSIPATION);
      drawQuad(velocity.write);
      velocity.swap();

      // Advect density
      const dts = { x: density.read.texelSizeX, y: density.read.texelSizeY };
      gl.uniform2f(advectionProg.uniforms.dyeTexelSize, dts.x, dts.y);
      gl.uniform1i(advectionProg.uniforms.uVelocity, velocity.read.attach(0));
      gl.uniform1i(advectionProg.uniforms.uSource, density.read.attach(1));
      gl.uniform1f(advectionProg.uniforms.dissipation, CONFIG.DENSITY_DISSIPATION);
      drawQuad(density.write);
      density.swap();
    };

    // ── Render ────────────────────────────────────────────────────────────────
    const render = (now: number) => {
      rafId = requestAnimationFrame(render);
      const dt = Math.min((now - last) / 1000, 0.016);
      last = now;

      // splat on move
      if (pointer.moved) {
        const speed = Math.sqrt(pointer.dx ** 2 + pointer.dy ** 2);
        const force = CONFIG.SPLAT_FORCE * Math.max(0.1, speed);
        // White fluid — will appear as soft glowing ripples via display shader
        splat(pointer.x, pointer.y,
          pointer.dx * force,
          pointer.dy * force,
          [0.8, 0.85, 1.0]);
        pointer.moved = false;
      }

      step(dt);

      // Draw to screen
      gl.enable(gl.BLEND);
      gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.useProgram(displayProg.program);
      setupAttrib(displayProg.program);
      gl.uniform1i(displayProg.uniforms.uTexture, density.read.attach(0));
      drawQuad(null);
    };

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 2,
      }}
    />
  );
}
