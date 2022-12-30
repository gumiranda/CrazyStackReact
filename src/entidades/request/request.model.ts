export type RequestProps = {
  _id: string;
  status: number;
  message: string;
  createdAt: string;
  value?: boolean;
  active?: boolean;
};

class Request {
  protected props: RequestProps;
  constructor(props: RequestProps) {
    this.props = props;
  }
  public static build(props: RequestProps) {
    return new Request(props);
  }
  get _id(): string {
    return this.props._id;
  }
  get message(): string {
    return this.props.message;
  }
  get createdAt(): string {
    return this.props.createdAt;
  }
  get active(): boolean | undefined {
    return this.props.active;
  }
  get status(): number {
    return this.props.status;
  }
  format(): RequestProps {
    return {
      ...this.props,
      _id: this.props._id,
      message: this.props.message,
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
export const requestModel = (props: RequestProps) => Request.build(props);
