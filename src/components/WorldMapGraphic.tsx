export function WorldMapGraphic({ compact = false }: { compact?: boolean }) {
  return (
    <svg
      className={`world-map ${compact ? "world-map-compact" : ""}`}
      viewBox="0 0 1000 470"
      role="img"
      aria-label="全球南方重点地区抽象世界地图"
    >
      <defs>
        <linearGradient id="mapGlow" x1="0" x2="1">
          <stop offset="0" stopColor="#4fc6a5" stopOpacity=".3" />
          <stop offset="1" stopColor="#e5b65e" stopOpacity=".55" />
        </linearGradient>
      </defs>
      <g className="map-grid">
        {[90, 180, 270, 360].map((y) => <path d={`M30 ${y}H970`} key={y} />)}
        {[180, 340, 500, 660, 820].map((x) => <path d={`M${x} 30V440`} key={x} />)}
      </g>
      <g className="map-land">
        <path d="M71 106 128 61l88 8 52 34-24 38-52 15-28 51-34 16-29-44-48-21Z" />
        <path className="map-south" d="m217 215 52 20 36 61-20 95-30 50-24-55 10-55-37-62Z" />
        <path d="m414 91 65-35 97 17 49 41 87-25 106 31 92 67-42 38-78-8-53 32-68-24-47 22-58-25-43 19-44-48-54-25Z" />
        <path className="map-south" d="m475 210 74 8 48 69-17 84-49 59-38-44-8-69-39-55Z" />
        <path className="map-south" d="m616 220 47 15 31 52-26 44-48-12-28-47Z" />
        <path className="map-south" d="m710 257 38 8 23 37-26 38-40-16-12-39Z" />
        <path className="map-south" d="m822 333 73-18 51 31-27 43-71 4-39-30Z" />
      </g>
      <g className="map-routes">
        <path d="M276 289Q419 155 530 288T827 337" />
        <path d="M260 320Q455 420 650 283T892 356" />
        <path d="M531 287Q635 146 734 279" />
      </g>
      <g className="map-points">
        {[[276,289],[531,287],[650,283],[734,279],[827,337],[260,320]].map(([cx, cy]) => (
          <circle cx={cx} cy={cy} r="5" key={`${cx}-${cy}`} />
        ))}
      </g>
    </svg>
  );
}
