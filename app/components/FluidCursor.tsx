"use client";
import { useEffect, useRef } from "react";

/* ── helpers ──────────────────────────────────────────────── */
function hexToRgb(h: string) {
  return {
    r: parseInt(h.slice(1, 3), 16) / 255,
    g: parseInt(h.slice(3, 5), 16) / 255,
    b: parseInt(h.slice(5, 7), 16) / 255,
  };
}
const PALETTE = ["#9333ea", "#3b82f6", "#00ffcc", "#ffffff"].map(hexToRgb);
function randColor() {
  const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
  return { r: c.r * 0.18, g: c.g * 0.18, b: c.b * 0.18 };
}

/* ── shader sources ───────────────────────────────────────── */
const V = /* glsl */ `
precision highp float;
attribute vec2 aPos;
varying vec2 vUv,vL,vR,vT,vB;
uniform vec2 texelSize;
void main(){
  vUv=aPos*.5+.5;vL=vUv-vec2(texelSize.x,0.);vR=vUv+vec2(texelSize.x,0.);
  vT=vUv+vec2(0.,texelSize.y);vB=vUv-vec2(0.,texelSize.y);
  gl_Position=vec4(aPos,0.,1.);}`;

const F_CLEAR = `precision mediump float;precision mediump sampler2D;
varying vec2 vUv;uniform sampler2D uT;uniform float val;
void main(){gl_FragColor=val*texture2D(uT,vUv);}`;

const F_SPLAT = `precision highp float;precision highp sampler2D;
varying vec2 vUv;uniform sampler2D uT;uniform float ar,radius;uniform vec3 color;uniform vec2 pt;
void main(){vec2 p=vUv-pt;p.x*=ar;gl_FragColor=vec4(texture2D(uT,vUv).rgb+exp(-dot(p,p)/radius)*color,1.);}`;

const F_ADV = `precision highp float;precision highp sampler2D;
varying vec2 vUv;uniform sampler2D uVel,uSrc;uniform vec2 ts,dts;uniform float dt,diss;
vec4 bl(sampler2D s,vec2 uv,vec2 t){
  vec2 st=uv/t-.5,i=floor(st),f=fract(st);
  return mix(mix(texture2D(s,(i+vec2(.5,.5))*t),texture2D(s,(i+vec2(1.5,.5))*t),f.x),
             mix(texture2D(s,(i+vec2(.5,1.5))*t),texture2D(s,(i+vec2(1.5,1.5))*t),f.x),f.y);}
void main(){vec2 c=vUv-dt*bl(uVel,vUv,ts).xy*ts;gl_FragColor=bl(uSrc,c,dts)/(1.+diss*dt);}`;

const F_DIV = `precision mediump float;precision mediump sampler2D;
varying vec2 vUv,vL,vR,vT,vB;uniform sampler2D uVel;
void main(){float L=texture2D(uVel,vL).x,R=texture2D(uVel,vR).x,T=texture2D(uVel,vT).y,B=texture2D(uVel,vB).y;
  vec2 C=texture2D(uVel,vUv).xy;
  if(vL.x<0.)L=-C.x;if(vR.x>1.)R=-C.x;if(vT.y>1.)T=-C.y;if(vB.y<0.)B=-C.y;
  gl_FragColor=vec4(.5*(R-L+T-B),0.,0.,1.);}`;

const F_CURL = `precision mediump float;precision mediump sampler2D;
varying vec2 vUv,vL,vR,vT,vB;uniform sampler2D uVel;
void main(){gl_FragColor=vec4(.5*(texture2D(uVel,vR).y-texture2D(uVel,vL).y
  -texture2D(uVel,vT).x+texture2D(uVel,vB).x),0.,0.,1.);}`;

const F_VORT = `precision highp float;precision highp sampler2D;
varying vec2 vUv,vL,vR,vT,vB;uniform sampler2D uVel,uCurl;uniform float curl,dt;
void main(){float L=texture2D(uCurl,vL).x,R=texture2D(uCurl,vR).x,T=texture2D(uCurl,vT).x,B=texture2D(uCurl,vB).x,C=texture2D(uCurl,vUv).x;
  vec2 f=.5*vec2(abs(T)-abs(B),abs(R)-abs(L));f/=length(f)+.0001;f*=curl*C;f.y*=-1.;
  gl_FragColor=vec4(texture2D(uVel,vUv).xy+f*dt,0.,1.);}`;

const F_PRESS = `precision mediump float;precision mediump sampler2D;
varying vec2 vUv,vL,vR,vT,vB;uniform sampler2D uP,uDiv;
void main(){gl_FragColor=vec4(
  (texture2D(uP,vL).x+texture2D(uP,vR).x+texture2D(uP,vB).x+texture2D(uP,vT).x-texture2D(uDiv,vUv).x)*.25,0.,0.,1.);}`;

const F_GRAD = `precision mediump float;precision mediump sampler2D;
varying vec2 vUv,vL,vR,vT,vB;uniform sampler2D uP,uVel;
void main(){vec2 v=texture2D(uVel,vUv).xy-vec2(texture2D(uP,vR).x-texture2D(uP,vL).x,texture2D(uP,vT).x-texture2D(uP,vB).x);
  gl_FragColor=vec4(v,0.,1.);}`;

const F_BPRE = `precision mediump float;precision mediump sampler2D;
varying vec2 vUv;uniform sampler2D uT;uniform vec3 curve;uniform float thr;
void main(){vec3 c=texture2D(uT,vUv).rgb;float br=max(c.r,max(c.g,c.b));
  float rq=clamp(br-curve.x,0.,curve.y);rq=rq*rq*curve.z;
  c*=max(rq,br-thr)/max(br,.0001);gl_FragColor=vec4(c,0.);}`;

const F_BBLUR = `precision mediump float;precision mediump sampler2D;
varying vec2 vL,vR,vT,vB;uniform sampler2D uT;
void main(){gl_FragColor=(texture2D(uT,vL)+texture2D(uT,vR)+texture2D(uT,vT)+texture2D(uT,vB))*.25;}`;

const F_BFIN = `precision mediump float;precision mediump sampler2D;
varying vec2 vL,vR,vT,vB;uniform sampler2D uT;uniform float intensity;
void main(){gl_FragColor=(texture2D(uT,vL)+texture2D(uT,vR)+texture2D(uT,vT)+texture2D(uT,vB))*.25*intensity;}`;

const F_SMASK = `precision highp float;precision highp sampler2D;
varying vec2 vUv;uniform sampler2D uT;
void main(){vec4 c=texture2D(uT,vUv);float br=max(c.r,max(c.g,c.b));c.a=1.-min(br*20.,.95);gl_FragColor=c;}`;

const F_SRAYS = `precision highp float;precision highp sampler2D;
varying vec2 vUv;uniform sampler2D uT;uniform float weight;
void main(){const int IT=16;float Den=.3,Dec=.95,Exp=.7;
  vec2 dir=(vUv-.5)*(1./float(IT)*Den),coord=vUv;float illum=1.,col=texture2D(uT,vUv).a;
  for(int i=0;i<IT;i++){coord-=dir;col+=texture2D(uT,coord).a*illum*weight;illum*=Dec;}
  gl_FragColor=vec4(col*Exp,0.,0.,1.);}`;

const F_DISP = `precision highp float;precision highp sampler2D;
varying vec2 vUv,vL,vR,vT,vB;
uniform sampler2D uT,uBloom,uSun;uniform bool bloom,sunrays,shading;uniform float bIntensity;
vec3 g(vec3 c){c=max(c,vec3(0.));return max(1.055*pow(c,vec3(.4166667))-.055,vec3(0.));}
void main(){vec3 c=texture2D(uT,vUv).rgb;
  if(shading){float dx=length(texture2D(uT,vR).rgb)-length(texture2D(uT,vL).rgb),
    dy=length(texture2D(uT,vT).rgb)-length(texture2D(uT,vB).rgb);
    vec3 n=normalize(vec3(dx,dy,.005)),l=normalize(vec3(.447,.447,.775));
    c+=clamp(dot(n,l),0.,1.)*.5+vec3(pow(max(dot(reflect(-l,n),vec3(0.,0.,1.)),0.),32.)*.4);}
  if(bloom)c+=texture2D(uBloom,vUv).rgb*bIntensity;
  if(sunrays)c+=vec3(texture2D(uSun,vUv).r)*.5;
  c=g(c);gl_FragColor=vec4(c,max(c.r,max(c.g,c.b)));}`;

/* ── webgl utils ──────────────────────────────────────────── */
type GL = WebGLRenderingContext;
function mkProg(gl: GL, vs: string, fs: string) {
  function mkShader(t: number, src: string) {
    const s = gl.createShader(t)!;
    gl.shaderSource(s, src); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) console.error(gl.getShaderInfoLog(s));
    return s;
  }
  const p = gl.createProgram()!;
  gl.attachShader(p, mkShader(gl.VERTEX_SHADER, vs));
  gl.attachShader(p, mkShader(gl.FRAGMENT_SHADER, fs));
  gl.bindAttribLocation(p, 0, "aPos");
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) console.error(gl.getProgramInfoLog(p));
  const u: Record<string, WebGLUniformLocation | null> = {};
  const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS) as number;
  for (let i = 0; i < n; i++) { const info = gl.getActiveUniform(p, i)!; u[info.name] = gl.getUniformLocation(p, info.name); }
  return { p, u };
}

interface FBO { tex: WebGLTexture; fb: WebGLFramebuffer; w: number; h: number; attach(id: number): number; }
interface DFBO { read: FBO; write: FBO; swap(): void; }

function mkFBO(gl: GL, w: number, h: number, ifmt: number, fmt: number, type: number, filt: number): FBO {
  const tex = gl.createTexture()!;
  gl.bindTexture(gl.TEXTURE_2D, tex);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filt);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filt);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texImage2D(gl.TEXTURE_2D, 0, ifmt, w, h, 0, fmt, type, null);
  const fb = gl.createFramebuffer()!;
  gl.bindFramebuffer(gl.FRAMEBUFFER, fb);
  gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, tex, 0);
  gl.viewport(0, 0, w, h); gl.clear(gl.COLOR_BUFFER_BIT);
  return { tex, fb, w, h, attach(id) { gl.activeTexture(gl.TEXTURE0 + id); gl.bindTexture(gl.TEXTURE_2D, tex); return id; } };
}
function mkDFBO(gl: GL, w: number, h: number, ifmt: number, fmt: number, type: number, filt: number): DFBO {
  let a = mkFBO(gl, w, h, ifmt, fmt, type, filt), b = mkFBO(gl, w, h, ifmt, fmt, type, filt);
  return { read: a, write: b, swap() { [this.read, this.write] = [this.write, this.read]; } };
}

/* ── main simulation ──────────────────────────────────────── */
function startSim(canvas: HTMLCanvasElement): () => void {
  const gl = canvas.getContext("webgl", { alpha: true, depth: false, stencil: false, antialias: false }) as GL;
  if (!gl) return () => {};

  const eHF = gl.getExtension("OES_texture_half_float");
  const eHFL = gl.getExtension("OES_texture_half_float_linear");
  const eF = gl.getExtension("OES_texture_float");
  const eFL = gl.getExtension("OES_texture_float_linear");

  let texType: number, linFilt: boolean;
  if (eHF) { texType = eHF.HALF_FLOAT_OES; linFilt = !!eHFL; }
  else if (eF) { texType = gl.FLOAT; linFilt = !!eFL; }
  else { texType = gl.UNSIGNED_BYTE; linFilt = true; }

  // Verify float FB works
  if (texType !== gl.UNSIGNED_BYTE) {
    const t = gl.createTexture()!, f = gl.createFramebuffer()!;
    gl.bindTexture(gl.TEXTURE_2D, t);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 4, 4, 0, gl.RGBA, texType, null);
    gl.bindFramebuffer(gl.FRAMEBUFFER, f);
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0);
    if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) {
      texType = gl.UNSIGNED_BYTE; linFilt = true;
    }
    gl.bindFramebuffer(gl.FRAMEBUFFER, null);
    gl.deleteFramebuffer(f); gl.deleteTexture(t);
  }

  const filt = linFilt ? gl.LINEAR : gl.NEAREST;
  const RGBA = { i: gl.RGBA, f: gl.RGBA };

  // programs
  const pClear   = mkProg(gl, V, F_CLEAR);
  const pSplat   = mkProg(gl, V, F_SPLAT);
  const pAdv     = mkProg(gl, V, F_ADV);
  const pDiv     = mkProg(gl, V, F_DIV);
  const pCurl    = mkProg(gl, V, F_CURL);
  const pVort    = mkProg(gl, V, F_VORT);
  const pPress   = mkProg(gl, V, F_PRESS);
  const pGrad    = mkProg(gl, V, F_GRAD);
  const pBPre    = mkProg(gl, V, F_BPRE);
  const pBBlur   = mkProg(gl, V, F_BBLUR);
  const pBFin    = mkProg(gl, V, F_BFIN);
  const pSMask   = mkProg(gl, V, F_SMASK);
  const pSRays   = mkProg(gl, V, F_SRAYS);
  const pDisp    = mkProg(gl, V, F_DISP);

  // quad
  const vb = gl.createBuffer()!;
  gl.bindBuffer(gl.ARRAY_BUFFER, vb);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,-1,1,1,1,1,-1]), gl.STATIC_DRAW);
  const ib = gl.createBuffer()!;
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, ib);
  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array([0,1,2,0,2,3]), gl.STATIC_DRAW);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.enableVertexAttribArray(0);

  function res(r: number) {
    const ar = canvas.width / canvas.height;
    return ar >= 1 ? { w: Math.round(r * ar), h: r } : { w: r, h: Math.round(r / ar) };
  }

  const SIM=128, DYE=1024, BLM=256, SRR=196;
  const s=res(SIM), d=res(DYE), b=res(BLM), sr=res(SRR);

  let vel  = mkDFBO(gl, s.w, s.h, RGBA.i, RGBA.f, texType, filt);
  let dye  = mkDFBO(gl, d.w, d.h, RGBA.i, RGBA.f, texType, filt);
  let divFBO  = mkFBO(gl, s.w, s.h, RGBA.i, RGBA.f, texType, gl.NEAREST);
  let curlFBO = mkFBO(gl, s.w, s.h, RGBA.i, RGBA.f, texType, gl.NEAREST);
  let press   = mkDFBO(gl, s.w, s.h, RGBA.i, RGBA.f, texType, gl.NEAREST);

  const bloomFBs: FBO[] = [];
  for (let i = 0; i < 10; i++) {
    bloomFBs.push(mkFBO(gl, Math.max(1,b.w>>i), Math.max(1,b.h>>i), RGBA.i, RGBA.f, texType, filt));
  }
  const sunTmp = mkFBO(gl, sr.w, sr.h, RGBA.i, RGBA.f, texType, filt);
  const sunFBO = mkFBO(gl, sr.w, sr.h, RGBA.i, RGBA.f, texType, filt);

  function blit(target: FBO | null) {
    if (target) { gl.bindFramebuffer(gl.FRAMEBUFFER, target.fb); gl.viewport(0,0,target.w,target.h); }
    else { gl.bindFramebuffer(gl.FRAMEBUFFER, null); gl.viewport(0,0,canvas.width,canvas.height); }
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0);
  }

  function use(prog: { p: WebGLProgram; u: Record<string,WebGLUniformLocation|null> }) {
    gl.useProgram(prog.p);
    return prog.u;
  }

  let lastTime = Date.now();
  let colorTimer = 0;

  function splat(x: number, y: number, dx: number, dy: number, col: {r:number,g:number,b:number}) {
    let u = use(pSplat);
    gl.uniform1i(u.uT, vel.read.attach(0));
    gl.uniform1f(u.ar, canvas.width / canvas.height);
    gl.uniform2f(u.pt, x / canvas.width, 1 - y / canvas.height);
    gl.uniform3f(u.color, dx * 9000, -dy * 9000, 0);
    gl.uniform1f(u.radius, 0.35 / 100);
    blit(vel.write); vel.swap();

    u = use(pSplat);
    gl.uniform1i(u.uT, dye.read.attach(0));
    gl.uniform1f(u.ar, canvas.width / canvas.height);
    gl.uniform2f(u.pt, x / canvas.width, 1 - y / canvas.height);
    gl.uniform3f(u.color, col.r, col.g, col.b);
    gl.uniform1f(u.radius, 0.35 / 100);
    blit(dye.write); dye.swap();
  }

  // mouse tracking
  let mx = -1, my = -1, ox = -1, oy = -1, down = false;
  const onMove = (e: MouseEvent) => {
    ox = mx; oy = my; mx = e.clientX; my = e.clientY;
    if (ox < 0) { ox = mx; oy = my; }
    splat(mx, my, mx-ox, my-oy, randColor());
  };
  const onDown = () => { down = true; };
  const onUp   = () => { down = false; };
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mousedown", onDown);
  window.addEventListener("mouseup", onUp);

  // resize
  const onResize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
  window.addEventListener("resize", onResize);
  onResize();

  let raf: number;

  function step() {
    const now = Date.now(), dt = Math.min((now - lastTime) / 1000, 0.016666);
    lastTime = now;
    colorTimer += dt;

    const ts: [number,number] = [1/s.w, 1/s.h];

    // curl
    let u = use(pCurl);
    gl.uniform2f(u.texelSize, ...ts);
    gl.uniform1i(u.uVel, vel.read.attach(0));
    blit(curlFBO);

    // vorticity
    u = use(pVort);
    gl.uniform2f(u.texelSize, ...ts);
    gl.uniform1i(u.uVel, vel.read.attach(0));
    gl.uniform1i(u.uCurl, curlFBO.attach(1));
    gl.uniform1f(u.curl, 8.0);
    gl.uniform1f(u.dt, dt);
    blit(vel.write); vel.swap();

    // divergence
    u = use(pDiv);
    gl.uniform2f(u.texelSize, ...ts);
    gl.uniform1i(u.uVel, vel.read.attach(0));
    blit(divFBO);

    // clear pressure
    u = use(pClear);
    gl.uniform1i(u.uT, press.read.attach(0));
    gl.uniform1f(u.val, 0.1); // PRESSURE param
    blit(press.write); press.swap();

    // pressure iterations
    for (let i = 0; i < 20; i++) {
      u = use(pPress);
      gl.uniform2f(u.texelSize, ...ts);
      gl.uniform1i(u.uP, press.read.attach(0));
      gl.uniform1i(u.uDiv, divFBO.attach(1));
      blit(press.write); press.swap();
    }

    // gradient subtract
    u = use(pGrad);
    gl.uniform2f(u.texelSize, ...ts);
    gl.uniform1i(u.uP, press.read.attach(0));
    gl.uniform1i(u.uVel, vel.read.attach(1));
    blit(vel.write); vel.swap();

    // advect velocity
    u = use(pAdv);
    gl.uniform2f(u.texelSize, ...ts);
    gl.uniform2f(u.dts, ...ts);
    gl.uniform1i(u.uVel, vel.read.attach(0));
    gl.uniform1i(u.uSrc, vel.read.attach(0));
    gl.uniform1f(u.dt, dt);
    gl.uniform1f(u.diss, 0.992);
    blit(vel.write); vel.swap();

    // advect dye
    u = use(pAdv);
    gl.uniform2f(u.texelSize, ts[0], ts[1]);
    gl.uniform2f(u.dts, 1/d.w, 1/d.h);
    gl.uniform1i(u.uVel, vel.read.attach(0));
    gl.uniform1i(u.uSrc, dye.read.attach(1));
    gl.uniform1f(u.dt, dt);
    gl.uniform1f(u.diss, 1.0);
    blit(dye.write); dye.swap();

    // ── bloom ──────────────────────────────────
    const knee = 0.2 * 0.7, curve0 = 0.2 - knee, curve1 = knee * 2, curve2 = 0.25 / (knee + 0.0001);
    u = use(pBPre);
    gl.uniform1i(u.uT, dye.read.attach(0));
    gl.uniform3f(u.curve, curve0, curve1, curve2);
    gl.uniform1f(u.thr, 0.2);
    blit(bloomFBs[0]);

    let last = bloomFBs[0];
    for (let i = 1; i < 10; i++) {
      u = use(pBBlur);
      gl.uniform2f(u.texelSize, 1/last.w, 1/last.h);
      gl.uniform1i(u.uT, last.attach(0));
      blit(bloomFBs[i]); last = bloomFBs[i];
    }
    for (let i = 8; i >= 0; i--) {
      const dst = bloomFBs[i];
      u = use(pBFin);
      gl.uniform2f(u.texelSize, 1/last.w, 1/last.h);
      gl.uniform1i(u.uT, last.attach(0));
      gl.uniform1f(u.intensity, 2.0);
      blit(dst); last = dst;
    }

    // ── sunrays ────────────────────────────────
    u = use(pSMask);
    gl.uniform1i(u.uT, dye.read.attach(0));
    blit(sunTmp);

    u = use(pSRays);
    gl.uniform2f(u.texelSize, 1/sunTmp.w, 1/sunTmp.h);
    gl.uniform1i(u.uT, sunTmp.attach(0));
    gl.uniform1f(u.weight, 1.0);
    blit(sunFBO);

    // ── display ────────────────────────────────
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND);
    u = use(pDisp);
    gl.uniform2f(u.texelSize, 1/canvas.width, 1/canvas.height);
    gl.uniform1i(u.uT, dye.read.attach(0));
    gl.uniform1i(u.uBloom, bloomFBs[0].attach(1));
    gl.uniform1i(u.uSun, sunFBO.attach(2));
    gl.uniform1i(u.bloom, 1);
    gl.uniform1i(u.sunrays, 1);
    gl.uniform1i(u.shading, 1);
    gl.uniform1f(u.bIntensity, 2.0);
    blit(null);
    gl.disable(gl.BLEND);

    raf = requestAnimationFrame(step);
  }

  raf = requestAnimationFrame(step);

  return () => {
    cancelAnimationFrame(raf);
    window.removeEventListener("mousemove", onMove);
    window.removeEventListener("mousedown", onDown);
    window.removeEventListener("mouseup", onUp);
    window.removeEventListener("resize", onResize);
  };
}

/* ── React component ──────────────────────────────────────── */
export default function FluidCursor() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    if (!ref.current) return;
    ref.current.width  = window.innerWidth;
    ref.current.height = window.innerHeight;
    const cleanup = startSim(ref.current);
    return cleanup;
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed", top: 0, left: 0,
        width: "100vw", height: "100vh",
        pointerEvents: "none", zIndex: 2,
      }}
    />
  );
}
