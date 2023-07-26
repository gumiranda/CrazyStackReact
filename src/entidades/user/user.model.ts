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

  format(): UserProps {
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
export const userModel = (props: UserProps) => User.build(props);
