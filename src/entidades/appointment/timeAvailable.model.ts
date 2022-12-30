export type TimeAvailableProps = {
  ownerId: string;
  serviceId: string;
  timeAvailable: any[];
  timeAvailableProfessional: any[];
  value?: boolean;
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
  format(): TimeAvailableProps {
    return {
      ownerId: this.props.ownerId,
      serviceId: this.props.serviceId,
      value: false,
      timeAvailable: this.props.timeAvailable.map(({ time }: any) => ({
        label: new Date(time)
          .toLocaleDateString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })
          ?.split?.(" ")?.[1],
      })),
      timeAvailableProfessional: this.props.timeAvailableProfessional.map(
        ({ initDate, endDate }: any) => ({
          initDate: new Date(initDate)
            .toLocaleDateString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })
            ?.split?.(" ")?.[1],
          endDate: new Date(endDate)
            .toLocaleDateString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })
            ?.split?.(" ")?.[1],
        })
      ),
    };
  }
}
export const timeAvailableModel = (props: TimeAvailableProps) =>
  TimeAvailable.build(props);
