export type PlaceProps = {
  _id: string;
  name: string;
  createdAt: string;
  createdById: string;
  value?: boolean;
  active?: boolean;
  updatedAt?: Date;
  categoryPlaceId: string;
  ownerId?: string;
  description?: string;
  coord?: any;
  address?: string;
  phone?: string;
  cover?: string;
  profilephoto?: string;
};

class Place {
  protected props: PlaceProps;
  constructor(props: PlaceProps) {
    this.props = props;
  }
  public static build(props: PlaceProps) {
    return new Place(props);
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
  get createdById(): string {
    return this.props.createdById;
  }
  get value(): boolean | undefined {
    return this.props.value;
  }
  get updatedAt(): Date | undefined {
    return this.props.updatedAt;
  }
  get categoryPlaceId(): string {
    return this.props.categoryPlaceId;
  }
  get ownerId(): string | undefined {
    return this.props.ownerId;
  }
  get description(): string | undefined {
    return this.props.description;
  }
  get coord(): any | undefined {
    return this.props.coord;
  }
  get address(): string | undefined {
    return this.props.address;
  }
  get phone(): string | undefined {
    return this.props.phone;
  }
  get cover(): string | undefined {
    return this.props.cover;
  }
  get profilephoto(): string | undefined {
    return this.props.profilephoto;
  }

  format(): PlaceProps {
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
export const placeModel = (props: PlaceProps) => Place.build(props);
