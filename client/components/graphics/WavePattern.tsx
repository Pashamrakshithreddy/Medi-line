import * as React from "react";

import { cn } from "@/lib/utils";

export type WavePatternProps = {
  className?: string;
  orientation?: "left" | "right";
  variant?: "solid" | "soft";
};

export const WavePattern: React.FC<WavePatternProps> = ({
  className,
  orientation = "right",
  variant = "solid",
}) => {
  const gradientId = React.useId();
  const strokeId = React.useId();
  const transform =
    orientation === "left" ? "matrix(-1 0 0 1 320 0)" : undefined;

  return (
    <svg
      aria-hidden
      viewBox="0 0 320 200"
      className={cn("h-auto w-full max-w-[320px]", className)}
    >
      <defs>
        <linearGradient
          id={`${gradientId}-fill`}
          x1="0%"
          x2="100%"
          y1="0%"
          y2="100%"
        >
          <stop
            offset="0%"
            stopColor={variant === "solid" ? "#2563EB" : "#60A5FA"}
            stopOpacity={variant === "solid" ? 0.75 : 0.55}
          />
          <stop offset="100%" stopColor="#DBEAFE" stopOpacity={0.0} />
        </linearGradient>
        <linearGradient
          id={`${strokeId}-stroke`}
          x1="0%"
          x2="100%"
          y1="0%"
          y2="100%"
        >
          <stop offset="0%" stopColor="#2563EB" stopOpacity={0.6} />
          <stop offset="100%" stopColor="#93C5FD" stopOpacity={0.0} />
        </linearGradient>
      </defs>
      <g transform={transform}>
        <path
          d="M12 156C52 64 108 48 156 156C204 48 260 64 300 156V200H12V156Z"
          fill={`url(#${gradientId}-fill)`}
        />
        <path
          d="M16 154C56 70 108 60 154 154C204 60 256 70 296 154"
          stroke={`url(#${strokeId}-stroke)`}
          strokeWidth={10}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.9}
        />
        <path
          d="M32 168C68 104 108 96 144 168C196 70 240 104 284 168"
          stroke={`url(#${strokeId}-stroke)`}
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={0.55}
        />
      </g>
    </svg>
  );
};
