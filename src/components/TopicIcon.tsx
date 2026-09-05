type IconName = "chart" | "finance" | "people" | "compass" | "leaf" | "cloud" | "energy" | "globe" | "grain" | "circuit" | "connections";

export function TopicIcon({ name, size = 26 }: { name: string; size?: number }) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.5,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  const icon = name as IconName;
  return (
    <svg {...common}>
      {icon === "chart" && <><path d="M5 25V8M5 25h23"/><path d="m9 20 5-6 5 3 7-9"/></>}
      {icon === "finance" && <><circle cx="16" cy="16" r="11"/><path d="M20 11.5c-1-1-2.2-1.5-4-1.5-2.2 0-4 1.2-4 3s1.6 2.6 4 3c2.4.4 4 1.2 4 3s-1.8 3-4 3c-1.8 0-3.3-.5-4.5-1.7M16 7.5v17"/></>}
      {icon === "people" && <><circle cx="12" cy="11" r="4"/><circle cx="23" cy="13" r="3"/><path d="M4 26c.7-5 3.3-8 8-8s7.3 3 8 8M20 20c4.1 0 6.3 2 7 6"/></>}
      {icon === "compass" && <><circle cx="16" cy="16" r="11"/><path d="m20.5 11.5-2.7 6.3-6.3 2.7 2.7-6.3 6.3-2.7Z"/></>}
      {icon === "leaf" && <><path d="M26 6C14 6 7 11 7 19c0 4 3 7 7 7 8 0 12-8 12-20Z"/><path d="M6 27c4-7 8-11 16-16"/></>}
      {icon === "cloud" && <><path d="M8 24h16a4 4 0 0 0 .5-8A8 8 0 0 0 9 14a5 5 0 0 0-1 10Z"/><path d="M16 4v5M7 7l3 3M25 7l-3 3"/></>}
      {icon === "energy" && <><path d="m18 3-9 15h7l-2 11 9-16h-7l2-10Z"/><path d="M4 24h5M23 24h5"/></>}
      {icon === "globe" && <><circle cx="16" cy="16" r="11"/><path d="M5 16h22M16 5c4 4 4 18 0 22M16 5c-4 4-4 18 0 22"/></>}
      {icon === "grain" && <><path d="M16 27V7M16 12c-5 0-7-3-7-6 5 0 7 3 7 6ZM16 18c-5 0-8-3-8-6 5 0 8 3 8 6ZM16 14c5 0 7-3 7-6-5 0-7 3-7 6ZM16 21c5 0 8-3 8-6-5 0-8 3-8 6Z"/></>}
      {icon === "circuit" && <><rect x="9" y="9" width="14" height="14" rx="2"/><path d="M13 13h6v6h-6zM13 4v5M19 4v5M13 23v5M19 23v5M4 13h5M4 19h5M23 13h5M23 19h5"/></>}
      {icon === "connections" && <><circle cx="9" cy="16" r="4"/><circle cx="23" cy="9" r="3"/><circle cx="24" cy="24" r="3"/><path d="m12.5 14 7.5-3.7M12.5 18l8.5 4.5M23 12v9"/></>}
    </svg>
  );
}
