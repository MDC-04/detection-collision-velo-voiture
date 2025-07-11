import dynamic from "next/dynamic";
import FilterSidebar from "@/components/FilterSidebar";
import { useState } from "react";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

export default function Home() {
  const [selectedAlert, setSelectedAlert] = useState<string | null>(null);

  return (
    <div style={{ display: "flex" }}>
      <FilterSidebar onSearch={(alert) => setSelectedAlert(alert)} />
      <MapView selectedAlert={selectedAlert} />
    </div>
  );
}