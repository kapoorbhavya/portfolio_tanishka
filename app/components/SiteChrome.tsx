"use client";

import GlobalNavigation from "@/app/components/GlobalNavigation";
import BottomDock from "@/app/components/navigation/BottomDock";

/** Global nav + dock on every page */
export default function SiteChrome() {
  return (
    <>
      <GlobalNavigation />
      <BottomDock />
    </>
  );
}
