import type { DirectionsResponseData } from "@googlemaps/google-maps-services-js";
import { MapProtocol } from "./map.protocol";
import { RouteGoogle } from "./routeGoogle";
import { sample, shuffle } from "lodash";
import { colors, makeMarkerIcon, makeCarIcon } from "./mapUtils";

export class MapGoogle implements MapProtocol {
  public map: google.maps.Map;
  private routes: { [routeId: string]: RouteGoogle } = {};
  constructor(element: HTMLElement, options: google.maps.MapOptions) {
    this.map = new google.maps.Map(element, { ...options, styles: customStyles });
  }
  async addRoute(routeOptions: {
    routeId: string;
    startMarkerOptions: google.maps.MarkerOptions;
    endMarkerOptions: google.maps.MarkerOptions;
    carMarkerOptions: google.maps.MarkerOptions;
    directionsResponseData?: DirectionsResponseData & { request: any };
  }): Promise<any> {
    if (routeOptions.routeId in this.routes) {
      throw new RouteExistsError();
    }
    const { startMarkerOptions, endMarkerOptions, carMarkerOptions } = routeOptions;
    const route = new RouteGoogle({
      startMarkerOptions: { ...startMarkerOptions, map: this.map },
      endMarkerOptions: { ...endMarkerOptions, map: this.map },
      carMarkerOptions: { ...carMarkerOptions, map: this.map },
    });
    this.routes[routeOptions.routeId] = route;
    await route.calculateRoute(routeOptions.directionsResponseData);
    this.fitBounds();
  }
  private fitBounds() {
    const bounds = new google.maps.LatLngBounds();
    Object.keys(this.routes).forEach((id: string) => {
      const route = this.routes[id];
      bounds.extend(route.startMarker.getPosition()!);
      bounds.extend(route.endMarker.getPosition()!);
    });
    this.map.fitBounds(bounds);
  }
  async addRouteWithIcons(routeOptions: {
    routeId: string;
    startMarkerOptions: Omit<google.maps.MarkerOptions, "icon">;
    endMarkerOptions: Omit<google.maps.MarkerOptions, "icon">;
    carMarkerOptions: Omit<google.maps.MarkerOptions, "icon">;
    directionsResponseData?: DirectionsResponseData & { request: any };
  }): Promise<any> {
    const color = sample(shuffle(colors)) as string;
    return this.addRoute({
      ...routeOptions,
      startMarkerOptions: {
        ...routeOptions.startMarkerOptions,
        icon: makeMarkerIcon(color),
      },
      endMarkerOptions: {
        ...routeOptions.endMarkerOptions,
        icon: makeMarkerIcon(color),
      },
      carMarkerOptions: {
        ...routeOptions.carMarkerOptions,
        icon: makeCarIcon(color),
      },
      directionsResponseData: routeOptions.directionsResponseData,
    });
  }
  moveCar(routeId: string, position: google.maps.LatLngLiteral): void {
    this.routes[routeId].carMarker.setPosition(position);
  }
  removeRoute(id: string) {
    if (!this.hasRoute(id)) {
      return;
    }
    const route = this.routes[id];
    route.delete();
    delete this.routes[id];
  }
  removeAllRoutes() {
    Object.keys(this.routes).forEach((id) => this.removeRoute(id));
  }
  hasRoute(id: string): boolean {
    return id in this.routes;
  }
  getRoute(id: string): RouteGoogle {
    return this.routes[id];
  }
}
const customStyles = [
  { elementType: "geometry", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.stroke", stylers: [{ color: "#242f3e" }] },
  { elementType: "labels.text.fill", stylers: [{ color: "#746855" }] },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [{ color: "#263c3f" }],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [{ color: "#6b9a76" }],
  },
  {
    featureType: "road",
    elementType: "geometry",
    stylers: [{ color: "#38414e" }],
  },
  {
    featureType: "road",
    elementType: "geometry.stroke",
    stylers: [{ color: "#212a37" }],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [{ color: "#9ca5b3" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [{ color: "#746855" }],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [{ color: "#1f2835" }],
  },
  {
    featureType: "road.highway",
    elementType: "labels.text.fill",
    stylers: [{ color: "#f3d19c" }],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [{ color: "#2f3948" }],
  },
  {
    featureType: "transit.station",
    elementType: "labels.text.fill",
    stylers: [{ color: "#d59563" }],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [{ color: "#17263c" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [{ color: "#515c6d" }],
  },
  {
    featureType: "water",
    elementType: "labels.text.stroke",
    stylers: [{ color: "#17263c" }],
  },
];
export class RouteExistsError extends Error {}
