const paths: Record<string, React.ReactNode> = {
  africa: <><path d="M58 11 87 20l18 28-12 24-13 8-7 36-21 31-17-42-16-21 8-22-9-19 21-26Z"/><path className="muted-shape" d="m25 43 14-26 19-6 29 9 15 20-35 4-25-8Z"/></>,
  mena: <><path d="m10 61 25-30 44-4 20 15 44 2 29 24-18 21-48-10-31 13-37-18Z"/><path d="m112 79 23 9 15 31-16 19-18-29Z"/></>,
  latin: <><path d="M57 8 84 21 72 39 85 63 73 91l-15 12-6 39-18 35-8-43 11-34-12-31 8-29-13-19Z"/><circle cx="102" cy="52" r="5"/><circle cx="116" cy="64" r="3"/></>,
  "south-asia": <path d="m24 25 46-14 36 18 18 35-25 16-13 57-25 32-14-56-31-33 18-23Z"/>,
  "southeast-asia": <><path d="m16 28 34-12 38 25-18 20 18 25-20 16-18-30-26 5-14-25Z"/><path d="m83 99 19 12 8 35-13 24-12-41Z"/><circle cx="127" cy="114" r="7"/><circle cx="144" cy="137" r="5"/></>,
  "central-asia": <path d="m16 67 29-39 44 8 28-17 47 37-21 38-49-9-37 20-40-13Z"/>,
  pacific: <><circle cx="34" cy="53" r="9"/><circle cx="73" cy="87" r="6"/><circle cx="110" cy="48" r="5"/><circle cx="142" cy="113" r="8"/><path d="m21 136 29-12 23 20-17 25-31-7Z"/></>,
};

export function RegionSilhouette({ shape }: { shape: string }) {
  return (
    <svg className="region-silhouette" viewBox="0 0 180 180" aria-hidden="true">
      {paths[shape]}
    </svg>
  );
}
