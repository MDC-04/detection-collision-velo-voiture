import dynamic from "next/dynamic";
import FilterSidebar from "@/components/FilterSidebar";

const MapView = dynamic(() => import('../components/MapView'), {
  ssr: false,
});

export default function HomePage() {
  return (
    <div style={{ display: 'flex' }}>
      <FilterSidebar />
      <div style={{ flex: 1 }}>
        <MapView />
      </div>
    </div>
  );
}
