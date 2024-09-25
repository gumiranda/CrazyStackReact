export type CategoryProps = {
  _id: string;
  name: string;
  createdAt: string;
  createdById: string;
  value?: boolean;
  active?: boolean;
};

class Category {
  protected props: CategoryProps;
  constructor(props: CategoryProps) {
    this.props = props;
  }
  public static build(props: CategoryProps) {
    return new Category(props);
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
  format(): CategoryProps {
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
export const categoryModel = (props: CategoryProps) => Category.build(props);
