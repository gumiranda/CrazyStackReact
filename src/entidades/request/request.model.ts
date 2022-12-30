import { startOfDay } from "date-fns";

export type RequestProps = {
  _id: string;
  status: number;
  message: string;
  createdAt: string;
  value?: boolean;
  active?: boolean;
  clientId: string;
  professionalId: string;
  serviceId: string;
  ownerId: string;
  createdForId: string;
  initDate: string;
  endDate: string;
  date: string;
  haveRecurrence: boolean;
  haveRide: boolean;
  haveFidelity: boolean;
  haveDelivery: boolean;
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
  get ownerId(): string {
    return this.props.ownerId;
  }
  get clientId(): string {
    return this.props.clientId;
  }
  get professionalId(): string {
    return this.props.professionalId;
  }
  get serviceId(): string {
    return this.props.serviceId;
  }
  get createdForId(): string {
    return this.props.createdForId;
  }
  get initDate(): string {
    return this.props.initDate;
  }
  get endDate(): string {
    return this.props.endDate;
  }
  get date(): string {
    return this.props.date;
  }
  get haveRecurrence(): boolean {
    return this.props.haveRecurrence;
  }
  get haveRide(): boolean {
    return this.props.haveRide;
  }
  get haveFidelity(): boolean {
    return this.props.haveFidelity;
  }
  get haveDelivery(): boolean {
    return this.props.haveDelivery;
  }

  format(): RequestProps {
    return {
      ...this.props,
      _id: this.props._id,
      message: this.props.message,
      active: this.props.active,
      value: false,
      date: startOfDay(new Date(this.props.initDate)).toISOString(),
      createdAt: new Date(this.props.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
    };
  }
}
export const requestModel = (props: RequestProps) => Request.build(props);
