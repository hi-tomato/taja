"use client";
import { API_KEY } from "@/constants/apikey";
import { APIProvider, Map } from "@vis.gl/react-google-maps";

export default function MapScreenPage() {
  return (
    <APIProvider apiKey={API_KEY.GOOGLE_MAPS}>
      <Map
        style={{ width: "100vw", height: "100vh" }}
        defaultCenter={{ lat: 22.54992, lng: 0 }}
        defaultZoom={3}
        gestureHandling="greedy"
        disableDefaultUI
      />
    </APIProvider>
  );
}
