import { AdvancedMarker, Pin } from "@vis.gl/react-google-maps";
import Image from "next/image";

type LatLng = {
  lat: number;
  lng: number;
};

interface MarkerProps {
  position: LatLng;
  label?: string;
  selected?: boolean;
  iconUrl?: string;
  id?: string;
  bikeCount?: number;
  onClick?: () => void;
}

export default function Marker({
  position,
  label,
  selected = false,
  iconUrl,
  id,
  bikeCount,
  onClick,
}: MarkerProps) {
  return (
    <AdvancedMarker
      position={position}
      clickable={!!onClick}
      onClick={onClick}
      title={label}
      aria-label={label}
      data-testid={id}
    >
      {iconUrl ? (
        <Image
          src={iconUrl}
          alt={label ?? "marker"}
          width={selected ? 36 : 28}
          height={selected ? 36 : 28}
          style={{
            transform: "translate(-50%, -50%)",
            filter: selected
              ? "drop-shadow(0 4px 12px rgba(0,0,0,0.35))"
              : "none",
          }}
        />
      ) : (
        <Pin
          background={selected ? "#2563eb" : "#1f2937"}
          borderColor="#FFF"
          glyph={bikeCount ? bikeCount.toString().charAt(0).toUpperCase() : "B"}
          scale={selected ? 1.2 : 1}
        />
      )}
    </AdvancedMarker>
  );
}
