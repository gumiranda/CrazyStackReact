export type ServiceProps = {
  _id: string;
  name: string;
  createdAt: string;
  categoryId?: string;
  description?: string;
  price: number;
  appointmentsTotal?: number;
  duration: number;
  productsQuantityNeeded: number;
  finalPrice: number;
  comission: number;
  havePromotionalPrice?: boolean;
  hasFidelityGenerator?: boolean;
  canPayWithFidelityPoints?: boolean;
  value?: boolean;
  active?: boolean;
};

class Service {
  protected props: ServiceProps;
  constructor(props: ServiceProps) {
    this.props = props;
  }
  public static build(props: ServiceProps) {
    return new Service(props);
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
  get categoryId(): string | undefined {
    return this.props.categoryId;
  }
  get description(): string | undefined {
    return this.props.description;
  }
  get price(): number {
    return this.props.price;
  }
  get appointmentsTotal(): number | undefined {
    return this.props.appointmentsTotal;
  }
  get duration(): number {
    return this.props.duration;
  }
  get productsQuantityNeeded(): number {
    return this.props.productsQuantityNeeded;
  }
  get finalPrice(): number {
    return this.props.finalPrice;
  }
  get comission(): number {
    return this.props.comission;
  }
  get havePromotionalPrice(): boolean | undefined {
    return this.props.havePromotionalPrice;
  }
  get hasFidelityGenerator(): boolean | undefined {
    return this.props.hasFidelityGenerator;
  }
  get canPayWithFidelityPoints(): boolean | undefined {
    return this.props.canPayWithFidelityPoints;
  }

  format(): ServiceProps {
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
export const serviceModel = (props: ServiceProps) => Service.build(props);
