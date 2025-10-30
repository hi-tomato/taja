"use client";

import InnerMap from "@/components/map/InnerMap";
import MapCTAButton from "@/components/map/MapCTAButton";
import SearchBar from "@/components/map/SearchBar";
import { API_KEY } from "@/constants/apikey";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";

type Actions = {
  CURRENT_LOCATION: () => void;
  LIKED_PLACES: () => void;
  REFRESH_LOCATION: () => void;
};

export default function MapComponent() {
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [actions, setActions] = useState<Actions | null>(null);

  useEffect(function getCurrentLocationEffect() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(({ coords }) =>
        setCurrentLocation({ lat: coords.latitude, lng: coords.longitude })
      );
    } else {
      console.log("위치 정보를 가져오는 중 오류가 발생하였습니다.");
    }
  }, []);

  return (
    <APIProvider apiKey={API_KEY.GOOGLE_MAPS}>
      <SearchBar />
      <InnerMap
        currentLocation={currentLocation ?? { lat: 0, lng: 0 }}
        onActionsReady={setActions}
      />
      {actions && <MapCTAButton actions={actions} />}
      <p>
        {currentLocation?.lat}, {currentLocation?.lng}
      </p>
    </APIProvider>
  );
}
