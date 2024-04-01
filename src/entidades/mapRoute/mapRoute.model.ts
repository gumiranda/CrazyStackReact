import { RouteDriverProps } from "@/entidades/routeDriver";
import { parseJSON } from "@/shared/libs";

export type MapRouteProps = {
  _id: string;
  name: string;
  createdAt: string;
  source: Place;
  destination: Place;
  distance: number;
  duration: number;
  directions: string;
  directionsJson?: any;
  routeDriver: RouteDriverProps[];
  value?: boolean;
  active?: boolean;
};

class MapRoute {
  protected props: MapRouteProps;
  constructor(props: MapRouteProps) {
    this.props = props;
  }
  public static build(props: MapRouteProps) {
    return new MapRoute(props);
  }
  get _id(): string {
    return this.props._id;
  }
  get name(): string {
    return this.props.name;
  }
  get source(): Place {
    return this.props.source;
  }
  get destination(): Place {
    return this.props.destination;
  }
  get distance(): number {
    return this.props.distance;
  }
  get duration(): number {
    return this.props.duration;
  }
  get directions(): string {
    return this.props.directions;
  }
  get routeDriver(): any {
    return this.props.routeDriver;
  }
  get createdAt(): string {
    return this.props.createdAt;
  }
  get active(): boolean | undefined {
    return this.props.active;
  }
  format(): MapRouteProps {
    return {
      ...this.props,
      _id: this.props._id,
      name: this.props.name,
      active: this.props.active,
      value: false,
      directions: this.props.directions,
      directionsJson: parseJSON(this.props.directions),
      createdAt: new Date(this.props.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    };
  }
}
export const mapRouteModel = (props: MapRouteProps) => MapRoute.build(props);
export type Place = {
  name: string;
  location: Coord;
};
export type Point = {
  location: Coord;
  createdAt: Date;
};
export type Coord = {
  lat: number;
  lng: number;
};
