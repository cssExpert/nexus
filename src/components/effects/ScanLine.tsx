"use client";

export default function ScanLine() {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-[9998] select-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px)",
        }}
      />
      <div className="noise-overlay" />
    </>
  );
}
