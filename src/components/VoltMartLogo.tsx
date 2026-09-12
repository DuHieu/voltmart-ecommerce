interface VoltMartLogoProps {
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  variant?: "default" | "white" | "monochrome";
}

export function VoltMartLogo({
  className = "",
  size = "md",
  showText = true,
}: VoltMartLogoProps) {
  const iconSizes = {
    sm: "h-7 w-7",
    md: "h-9 w-9",
    lg: "h-11 w-11",
    xl: "h-14 w-14",
  };

  const textSizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-3xl",
  };

  const subtextSizes = {
    sm: "text-[9px]",
    md: "text-[10px]",
    lg: "text-xs",
    xl: "text-xs",
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Precision Tech Lightning Bolt Icon */}
      <div
        className={`${iconSizes[size]} relative flex items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 via-orange-500 to-indigo-600 shadow-md shadow-orange-500/20 ring-1 ring-white/20 shrink-0 transition-transform duration-200 hover:scale-105`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="h-5/6 w-5/6 text-white drop-shadow-sm"
        >
          {/* Stylized V + Lightning Bolt */}
          <path
            d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span
            className={`${textSizes[size]} font-extrabold tracking-tight text-foreground leading-none`}
          >
            VOLT<span className="text-primary font-normal">MART</span>
          </span>
          <span
            className={`${subtextSizes[size]} font-semibold tracking-widest text-muted-foreground uppercase pt-0.5`}
          >
            Official Flagship
          </span>
        </div>
      )}
    </div>
  );
}
