import type { DirectionsResponseData } from "@googlemaps/google-maps-services-js";
import { RouteGoogle } from "./routeGoogle";

export interface MapProtocol {
  addRoute(routeOptions: {
    routeId: string;
    startMarkerOptions: google.maps.MarkerOptions;
    endMarkerOptions: google.maps.MarkerOptions;
    carMarkerOptions: google.maps.MarkerOptions;
    directionsResponseData?: DirectionsResponseData & { request: any };
  }): Promise<any>;
  addRouteWithIcons(routeOptions: {
    routeId: string;
    startMarkerOptions: Omit<google.maps.MarkerOptions, "icon">;
    endMarkerOptions: Omit<google.maps.MarkerOptions, "icon">;
    carMarkerOptions: Omit<google.maps.MarkerOptions, "icon">;
    directionsResponseData?: DirectionsResponseData & { request: any };
  }): Promise<any>;
  moveCar(routeId: string, position: google.maps.LatLngLiteral): void;
  removeRoute(id: string): any;
  removeAllRoutes(): any;
  hasRoute(id: string): boolean;
  getRoute(id: string): RouteGoogle;
}
