export type ClientProps = {
  _id: string;
  name: string;
  createdById: string;
  userId: string;
  createdAt: string;
  value?: boolean;
  active?: boolean;
};

class Client {
  protected props: ClientProps;
  constructor(props: ClientProps) {
    this.props = props;
  }
  public static build(props: ClientProps) {
    return new Client(props);
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
  get userId(): string {
    return this.props.userId;
  }
  get createdById(): string {
    return this.props.createdById;
  }
  format(): ClientProps {
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
export const clientModel = (props: ClientProps) => Client.build(props);
