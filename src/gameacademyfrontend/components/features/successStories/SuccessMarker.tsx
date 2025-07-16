// src/components/features/successStories/SuccessMarker.tsx
import dynamic from "next/dynamic";
import Image from "next/image";

import L from "leaflet";

import { SuccessStory } from "@/types/successStories";

// Динамический импорт компонентов Leaflet
const Marker = dynamic(
  () => import("react-leaflet").then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import("react-leaflet").then((mod) => mod.Popup),
  { ssr: false }
);

// Иконка маркера
const customIcon = new L.Icon({
  iconUrl: "/icons/marker-blue.png",
  iconSize: [32, 40],
  iconAnchor: [16, 40],
  popupAnchor: [0, -40],
});

type SuccessMarkerProps = {
  story: SuccessStory;
};

const SuccessMarker = ({ story }: SuccessMarkerProps) => (
  <Marker position={[story.lat, story.lng]} icon={customIcon}>
    <Popup>
      <div className="space-y-2 text-sm min-w-[250px]">
        <div className="relative w-full h-28">
          <Image
            src={story.image}
            alt={story.project}
            fill
            className="object-cover rounded"
            sizes="250px"
          />
        </div>
        <div>
          <strong className="text-md">{story.project}</strong>
          <p>{story.description}</p>
          <p className="text-gray-500">{story.city}, {story.year}</p>
          <a
            href={story.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            Подробнее
          </a>
        </div>
      </div>
    </Popup>
  </Marker>
);

export default SuccessMarker;