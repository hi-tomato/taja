import { Map, useMap } from "@vis.gl/react-google-maps";
import { useCallback, useEffect, useMemo } from "react";
import Marker from "./Marker";

interface InnerMapProps {
  currentLocation: { lat: number; lng: number };
  onActionsReady: (actions: {
    CURRENT_LOCATION: () => void;
    LIKED_PLACES: () => void;
    REFRESH_LOCATION: () => void;
  }) => void;
}

const SEOUL = { lat: 37.5665, lng: 126.978 };

export default function InnerMap({
  currentLocation,
  onActionsReady,
}: InnerMapProps) {
  const map = useMap("main-map");
  const ZOOM = currentLocation ? 15 : 12;
  const CENTER = useMemo(() => currentLocation ?? SEOUL, [currentLocation]);

  const handleCurrentLocation = useCallback(() => {
    if (!map || !currentLocation) return;
    map.panTo(currentLocation);
    map.setZoom(ZOOM);
  }, [map, currentLocation, ZOOM]);

  const handleRefreshLocation = useCallback(() => {
    window.location.reload();
  }, []);

  useEffect(() => {
    onActionsReady({
      CURRENT_LOCATION: handleCurrentLocation,
      LIKED_PLACES: () => {
        // TODO: 즐겨 찾기한 장소 보여주기
      },
      REFRESH_LOCATION: handleRefreshLocation,
    });
  }, [handleCurrentLocation, handleRefreshLocation, onActionsReady]);

  return (
    <>
      <Map
        id="main-map"
        mapId="4e35dba70dde8754cb33532c"
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={CENTER}
        defaultZoom={ZOOM}
        gestureHandling="greedy"
        disableDefaultUI
      >
        <Marker
          position={{ lat: 37.5665, lng: 126.978 }}
          label="시청"
          selected={true}
          onClick={() => console.log("clicked!")}
        />
      </Map>
    </>
  );
}
