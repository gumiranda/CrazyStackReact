export type RouteDriverProps = {
  _id: string;
  name: string;
  createdAt: string;
  value?: boolean;
  active?: boolean;
};

class RouteDriver {
  protected props: RouteDriverProps;
  constructor(props: RouteDriverProps) {
    this.props = props;
  }
  public static build(props: RouteDriverProps) {
    return new RouteDriver(props);
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
  format(): RouteDriverProps {
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
export const routeDriverModel = (props: RouteDriverProps) => RouteDriver.build(props);
