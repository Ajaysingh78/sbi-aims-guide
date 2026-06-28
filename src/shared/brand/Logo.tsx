import { cn } from "@/shared/lib/utils";

export function Logo({
  className,
  showWordmark = true,
}: {
  className?: string;
  showWordmark?: boolean;
}) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary to-accent shadow-[0_8px_24px_-8px] shadow-primary/60">
        <svg viewBox="0 0 24 24" className="h-5 w-5 text-primary-foreground" fill="none">
          <path
            d="M4 14c0-5 4-9 9-9 3 0 6 2 7 5-2-1-4-1-6 0-3 1-5 4-5 7 0 2 1 4 3 5-4 0-8-3-8-8z"
            fill="currentColor"
          />
          <circle cx="17" cy="17" r="2.5" fill="currentColor" opacity=".85" />
        </svg>
      </div>
      {showWordmark && (
        <div className="flex flex-col leading-none">
          <span className="text-[15px] font-semibold tracking-tight text-foreground">
            SBI <span className="text-accent">OneAI</span>
          </span>
          <span className="mt-0.5 text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
            OneAI Banking
          </span>
        </div>
      )}
    </div>
  );
}
