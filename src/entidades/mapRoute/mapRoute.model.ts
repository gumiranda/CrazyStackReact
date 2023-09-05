export type MapRouteProps = {
  _id: string;
  name: string;
  createdAt: string;
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
      createdAt: new Date(this.props.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    };
  }
}
export const mapRouteModel = (props: MapRouteProps) => MapRoute.build(props);
