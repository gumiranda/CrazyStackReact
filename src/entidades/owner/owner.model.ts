export type OwnerProps = {
  _id: string;
  name: string;
  createdAt: string;
  value?: boolean;
  active?: boolean;
};

class Owner {
  protected props: OwnerProps;
  constructor(props: OwnerProps) {
    this.props = props;
  }
  public static build(props: OwnerProps) {
    return new Owner(props);
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
  format(): OwnerProps {
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
export const ownerModel = (props: OwnerProps) => Owner.build(props);
