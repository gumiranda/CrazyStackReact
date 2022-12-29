export type TimeAvailableProps = {
  ownerId: string;
  serviceId: string;
  timeAvailable: any[];
  timeAvailableProfessional: any[];
  value?: boolean;
  active?: boolean;
};

class TimeAvailable {
  protected props: TimeAvailableProps;
  constructor(props: TimeAvailableProps) {
    this.props = props;
  }
  public static build(props: TimeAvailableProps) {
    return new TimeAvailable(props);
  }
  get ownerId(): string {
    return this.props.ownerId;
  }
  get serviceId(): string {
    return this.props.serviceId;
  }
  get timeAvailable(): any[] {
    return this.props.timeAvailable;
  }
  get timeAvailableProfessional(): any[] {
    return this.props.timeAvailable;
  }
  get active(): boolean | undefined {
    return this.props.active;
  }
  format(): TimeAvailableProps {
    return {
      ownerId: this.props.ownerId,
      serviceId: this.props.serviceId,
      active: this.props.active,
      value: false,
      timeAvailable: this.props.timeAvailable.map(
        ({ time }: any) =>
          new Date(time)
            .toLocaleDateString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })
            ?.split?.(" ")?.[1]
      ),
      timeAvailableProfessional: this.props.timeAvailableProfessional.map(
        ({ initDate, endDate }: any) => ({
          initDate: new Date(initDate).toLocaleDateString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
          endDate: new Date(endDate).toLocaleDateString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        })
      ),
    };
  }
}
export const timeAvailableModel = (props: TimeAvailableProps) =>
  TimeAvailable.build(props);
