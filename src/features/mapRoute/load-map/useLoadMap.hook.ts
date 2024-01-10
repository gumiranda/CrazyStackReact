import { Loader } from "@googlemaps/js-api-loader";
import { MapGoogle } from "entidades/mapRoute/googleMaps/mapGoogle";
import { useState, useEffect } from "react";
import { getCurrentPosition } from "shared/libs/utils";

export function useLoadMap(containerRef: React.RefObject<HTMLDivElement>) {
  const [map, setMap] = useState<MapGoogle>();
  useEffect(() => {
    (async () => {
      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY as string,
        libraries: ["routes", "geometry"],
      });
      const [, , position] = await Promise.all([
        loader.importLibrary("routes"),
        loader.importLibrary("geometry"),
        getCurrentPosition({ enableHighAccuracy: true }),
      ]);
      const newMap = new MapGoogle(containerRef.current!, { zoom: 15, center: position });
      setMap(newMap);
    })();
  }, [containerRef]);
  return map;
}
