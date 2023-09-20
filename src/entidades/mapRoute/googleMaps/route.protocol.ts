import type { DirectionsResponseData } from "@googlemaps/google-maps-services-js";

export interface RouteProtocol {
  startMarker: google.maps.Marker;
  endMarker: google.maps.Marker;
  carMarker: google.maps.Marker;
  directionsRenderer: google.maps.DirectionsRenderer;
  delete(): void;
  calculateRoute(directionsResponseData?: DirectionsResponseData & { request: any }): void;
}
