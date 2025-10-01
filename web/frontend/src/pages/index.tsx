// src/pages/index.tsx
import { useState } from "react";
import FilterSidebar from "@/components/FilterSidebar";
import Legend from "@/components/Legend";
import dynamic from "next/dynamic";
const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });


export default function HomePage() {
  const [filters, setFilters] = useState<{
    alertType?: string;
    stationId?: string;
  }>({});

  return (
    <div style={{ display: "flex" }}>
      <FilterSidebar onSearch={setFilters} />
      <MapView
        selectedAlert={filters.alertType || null}
        stationId={filters.stationId || ""}
      />
      {<Legend />}
    </div>
  );
}
