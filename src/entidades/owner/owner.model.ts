export type OwnerProps = {
  _id: string;
  name: string;
  createdAt: string;
  value?: boolean;
  active?: boolean;
  appointmentsTotal?: number;
  ratingsTotal?: number;
  haveDelivery?: boolean;
  typeTax?: string;
  costByTimeDriving?: number;
  fidelityTaxPoints?: number;
  fixedTax?: number;
  minimumTimeForReSchedule?: number;
  description?: string;
  days1?: any;
  days2?: any;
  days3?: any;
  days4?: any;
  hourStart1?: string;
  hourEnd1?: string;
  hourStart2?: string;
  hourEnd2?: string;
  hourStart3?: string;
  hourEnd3?: string;
  hourStart4?: string;
  hourEnd4?: string;
  hourLunchStart1?: string;
  hourLunchEnd1?: string;
  hourLunchStart2?: string;
  hourLunchEnd2?: string;
  hourLunchStart3?: string;
  hourLunchEnd3?: string;
  hourLunchStart4?: string;
  hourLunchEnd4?: string;
  createdById?: string;
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
  get appointmentsTotal(): number | undefined {
    return this.props.appointmentsTotal;
  }
  get ratingsTotal(): number | undefined {
    return this.props.ratingsTotal;
  }
  get haveDelivery(): boolean | undefined {
    return this.props.haveDelivery;
  }
  get typeTax(): string | undefined {
    return this.props.typeTax;
  }
  get costByTimeDriving(): number | undefined {
    return this.props.costByTimeDriving;
  }
  get fidelityTaxPoints(): number | undefined {
    return this.props.fidelityTaxPoints;
  }
  get fixedTax(): number | undefined {
    return this.props.fixedTax;
  }
  get minimumTimeForReSchedule(): number | undefined {
    return this.props.minimumTimeForReSchedule;
  }
  get description(): string | undefined {
    return this.props.description;
  }
  get days1(): any | undefined {
    return this.props.days1;
  }
  get days2(): any | undefined {
    return this.props.days2;
  }
  get days3(): any | undefined {
    return this.props.days3;
  }
  get days4(): any | undefined {
    return this.props.days4;
  }
  get hourStart1(): string | undefined {
    return this.props.hourStart1;
  }
  get hourEnd1(): string | undefined {
    return this.props.hourEnd1;
  }
  get hourStart2(): string | undefined {
    return this.props.hourStart2;
  }
  get hourEnd2(): string | undefined {
    return this.props.hourEnd2;
  }
  get hourStart3(): string | undefined {
    return this.props.hourStart3;
  }
  get hourEnd3(): string | undefined {
    return this.props.hourEnd3;
  }
  get hourStart4(): string | undefined {
    return this.props.hourStart4;
  }
  get hourEnd4(): string | undefined {
    return this.props.hourEnd4;
  }
  get hourLunchStart1(): string | undefined {
    return this.props.hourLunchStart1;
  }
  get hourLunchEnd1(): string | undefined {
    return this.props.hourLunchEnd1;
  }
  get hourLunchStart2(): string | undefined {
    return this.props.hourLunchStart2;
  }
  get hourLunchEnd2(): string | undefined {
    return this.props.hourLunchEnd2;
  }
  get hourLunchStart3(): string | undefined {
    return this.props.hourLunchStart3;
  }
  get hourLunchEnd3(): string | undefined {
    return this.props.hourLunchEnd3;
  }
  get hourLunchStart4(): string | undefined {
    return this.props.hourLunchStart4;
  }
  get hourLunchEnd4(): string | undefined {
    return this.props.hourLunchEnd4;
  }
  get createdById(): string | undefined {
    return this.props.createdById;
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
