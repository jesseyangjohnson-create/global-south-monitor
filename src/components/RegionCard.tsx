import Link from "next/link";
import { RegionSilhouette } from "@/components/RegionSilhouette";

export function RegionCard({
  region,
  count,
}: {
  region: {
    name: string;
    slug: string;
    description: string;
    countries: readonly string[];
    shape: string;
  };
  count: number;
}) {
  return (
    <Link className="region-card" href={`/regions/${region.slug}`}>
      <RegionSilhouette shape={region.shape} />
      <div className="region-card-content">
        <div className="region-card-top"><span>REGION</span><b>{count} 条资讯</b></div>
        <h3>{region.name}</h3>
        <p>{region.description}</p>
        <div className="region-countries">{region.countries.slice(0, 4).join(" · ")}</div>
        <div className="region-action">查看地区资讯 <span>→</span></div>
      </div>
    </Link>
  );
}
