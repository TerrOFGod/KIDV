// src/components/features/successStories/SuccessMapView.tsx
import dynamic from "next/dynamic";

import { SuccessStory } from "@/types/successStories";

import SuccessMarker from "@/components/features/successStories/SuccessMarker";

// Динамический импорт компонентов Leaflet
const MapContainer = dynamic(
  () => import("react-leaflet").then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import("react-leaflet").then((mod) => mod.TileLayer),
  { ssr: false }
);

type SuccessMapViewProps = {
  stories: SuccessStory[];
  center?: [number, number];
  zoom?: number;
};

const SuccessMapView = ({ 
  stories, 
  center = [51.505, 20], 
  zoom = 3 
}: SuccessMapViewProps) => (
  <div className="h-[600px] w-full rounded shadow overflow-hidden z-0">
    <MapContainer
      center={center}
      zoom={zoom}
      scrollWheelZoom={true}
      className="h-full w-full z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {stories.map((story) => (
        <SuccessMarker key={story.id} story={story} />
      ))}
    </MapContainer>
  </div>
);

export default SuccessMapView;