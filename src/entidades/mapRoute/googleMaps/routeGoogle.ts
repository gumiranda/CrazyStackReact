import type { DirectionsResponseData } from "@googlemaps/google-maps-services-js";
import { RouteProtocol } from "./route.protocol";
import { convertDirectionsResponseToDirectionsResult } from "./mapUtils";

export class RouteGoogle implements RouteProtocol {
  public startMarker: google.maps.Marker;
  public endMarker: google.maps.Marker;
  public carMarker: google.maps.Marker;
  public directionsRenderer: google.maps.DirectionsRenderer;
  constructor(options: {
    startMarkerOptions: google.maps.MarkerOptions;
    endMarkerOptions: google.maps.MarkerOptions;
    carMarkerOptions: google.maps.MarkerOptions;
  }) {
    const { startMarkerOptions, endMarkerOptions, carMarkerOptions } = options;
    this.startMarker = new google.maps.Marker(startMarkerOptions);
    this.endMarker = new google.maps.Marker(endMarkerOptions);
    this.carMarker = new google.maps.Marker(carMarkerOptions);
    const { strokeColor = "#fff" } =
      (this.startMarker.getIcon() as google.maps.Symbol) || {};
    this.directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: { strokeColor, strokeOpacity: 0.5, strokeWeight: 5 },
    });
    this.directionsRenderer.setMap(this.startMarker.getMap() as google.maps.Map);
  }
  delete(): void {
    this.startMarker.setMap(null);
    this.endMarker.setMap(null);
    this.carMarker.setMap(null);
    this.directionsRenderer.setMap(null);
  }
  async calculateRoute(
    directionsResponseData?: DirectionsResponseData & { request: any }
  ): Promise<void> {
    if (directionsResponseData) {
      const directionsResult =
        convertDirectionsResponseToDirectionsResult(directionsResponseData);
      this.directionsRenderer.setDirections(directionsResult);
      return;
    }
    const startPosition = this.startMarker.getPosition() as google.maps.LatLng;
    const endPosition = this.endMarker.getPosition() as google.maps.LatLng;
    const result = await new google.maps.DirectionsService().route({
      origin: startPosition,
      destination: endPosition,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    this.directionsRenderer.setDirections(result);
  }
}
