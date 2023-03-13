export type AppointmentProps = {
  _id: string;
  message: string;
  createdAt: string;
  value?: boolean;
  active?: boolean;
};

class Appointment {
  protected props: AppointmentProps;
  constructor(props: AppointmentProps) {
    this.props = props;
  }
  public static build(props: AppointmentProps) {
    return new Appointment(props);
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
  format(): AppointmentProps {
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
export const appointmentModel = (props: AppointmentProps) => Appointment.build(props);
