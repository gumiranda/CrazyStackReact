export type UserProps = {
  _id: string;
  name: string;
  email: string;
  ownerId: string;
  role: string;
  myOwnerId: string;
  createdById: string;
  createdAt: string;
  value?: boolean;
  active?: boolean;
  serviceIds?: string[];
  daysSinceRegister?: number;
  phone?: string;
};

class User {
  protected props: UserProps;
  constructor(props: UserProps) {
    this.props = props;
  }
  public static build(props: UserProps) {
    return new User(props);
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
  get serviceIds(): string[] | undefined {
    return this.props.serviceIds;
  }
  get email(): string {
    return this.props.email;
  }
  get role(): string {
    return this.props.role;
  }
  get ownerId(): string {
    return this.props.ownerId;
  }
  get myOwnerId(): string {
    return this.props.myOwnerId;
  }
  get createdById(): string {
    return this.props.createdById;
  }
  get value(): boolean | undefined {
    return this.props.value;
  }
  get daysSinceRegister(): number | undefined {
    return this.props.daysSinceRegister;
  }
  get phone(): string | undefined {
    return this.props.phone;
  }
  format(): UserProps {
    return {
      ...this.props,
      _id: this.props._id,
      name: this.props.name,
      active: this.props.active,
      value: false,
      createdAt: this.props.createdAt,
      daysSinceRegister: this.props.createdAt
        ? Math.floor(
            (new Date().getTime() - new Date(this.props.createdAt).getTime()) /
              (1000 * 60 * 60 * 24)
          )
        : 0,
    };
  }
}
export const calculateDaysSinceRegister = (createdAt: string) => {
  if (!createdAt) return 9999;
  return Math.floor(
    (new Date().getTime() - new Date(createdAt).getTime()) / (1000 * 60 * 60 * 24)
  );
};
export const userModel = (props: UserProps) => User.build(props);
