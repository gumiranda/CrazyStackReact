import { startOfDay, subHours } from "date-fns";

export type RequestProps = {
  _id: string;
  status: number;
  statusLabel: string;
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
  initDateFormatted: string;
  endDateFormatted: string;
  initHour: string;
  endHour: string;
  datePickerSelected?: string;
  date: string;
  haveRecurrence: boolean;
  haveRide: boolean;
  haveFidelity: boolean;
  haveDelivery: boolean;
  duration?: number;
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
  get initDateFormatted(): string {
    return this.props.initDateFormatted;
  }
  get endDateFormatted(): string {
    return this.props.endDateFormatted;
  }
  get initHour(): string {
    return this.props.initHour;
  }
  get endHour(): string {
    return this.props.endHour;
  }
  get datePickerSelected(): string | undefined {
    return this.props.datePickerSelected;
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
  get statusLabel(): string {
    return this.props.statusLabel;
  }
  get duration(): number | undefined {
    return this.props.duration;
  }
  format(): RequestProps {
    return {
      ...this.props,
      _id: this.props._id,
      message: this.props.message,
      active: this.props.active,
      value: false,
      initDateFormatted: subHours(new Date(this.props.initDate), 3).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      ),
      endDateFormatted: subHours(new Date(this.props.endDate), 3).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }
      ),
      date: startOfDay(subHours(new Date(this.props.initDate), 3)).toISOString(),
      datePickerSelected: subHours(new Date(this.props.initDate), 3).toLocaleDateString(
        "pt-BR",
        {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
        }
      ),
      initHour: subHours(new Date(this.props.initDate), 3).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      endHour: subHours(new Date(this.props.endDate), 3).toLocaleTimeString("pt-BR", {
        hour: "2-digit",
        minute: "2-digit",
      }),
      createdAt: new Date(this.props.createdAt).toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }),
      statusLabel: statusMap[this.props.status],
    };
  }
}
export const requestModel = (props: RequestProps) => Request.build(props);
export const statusMap: any = {
  0: "Solicitado",
  1: "Confirmado",
  2: "Cancelado pelo prestador",
  3: "Cancelado pelo cliente",
  4: "Pendente por conflito de agenda",
  5: "Reagendamento solicitado pelo prestador",
  6: "Reagendamento solicitado pelo cliente",
  7: "Reagendamento confirmado",
  8: "Reagendamento negado",
  9: "Agendamento avaliado pelo cliente",
  10: "Pedido efetivado",
  11: "Pedido efetivado e avaliado pelo cliente",
};
export const statusArray = Object.entries(statusMap).map(([key, value]) => ({
  key,
  value,
}));
