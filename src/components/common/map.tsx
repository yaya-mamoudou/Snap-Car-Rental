"use client";
import {
  DirectionsRenderer,
  GoogleMap,
  useJsApiLoader
} from "@react-google-maps/api";
import React, { useEffect } from "react";

type Coordinates = {
  lat: number;
  lng: number;
};

type Props = {
  pickup: Coordinates;
  dropOff: Coordinates;
};

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "10px",
};

const Map = ({ pickup, dropOff }: Props) => {
  const [directionsResponse, setDirectionsResponse] =
    React.useState<google.maps.DirectionsResult | null>(null);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCFKaSexrDwhs71JfmiUX2gogSI8_FQ3mc",
  });

  const center = {
    lat: (pickup.lat + dropOff.lat) / 2,
    lng: (pickup.lng + dropOff.lng) / 2,
  };

  useEffect(() => {
    if (isLoaded) {
      /* eslint-disable  @typescript-eslint/no-floating-promises */
      /* eslint-disable  @typescript-eslint/restrict-template-expressions */
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: pickup,
          destination: dropOff,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK && result) {
            // setDirectionsResponse(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        },
      )
    }
  }, [isLoaded, dropOff, pickup]);

  const [map, setMap] = React.useState(null);
  const onLoad = React.useCallback(function callback(map: any) {
    // This is just an example of getting and using the map instance!!! don't just blindly copy!
    /* eslint-disable  @typescript-eslint/no-unsafe-argument */
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map);
  }, [center]);

  const onUnmount = React.useCallback(function callback() {
    setMap(null);
  }, []);

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={5}
      onLoad={onLoad}
      onUnmount={onUnmount}
    >
      <DirectionsRenderer directions={directionsResponse!} />
      {/* <Marker position={pickup} label={"Pickup"} /> */}
      {/* <Marker position={dropOff}  /> */}
    </GoogleMap>
  ) : (
    <></>
  );
};

export default Map;
