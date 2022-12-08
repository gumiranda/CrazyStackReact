export type CategoryProps = {
  _id: string;
  name: string;
  createdAt: string;
  value?: boolean;
};

class Category {
  protected props: CategoryProps;
  constructor(props: CategoryProps) {
    this.props = props;
  }
  public static build(props: CategoryProps) {
    return new Category(props);
  }
  get name(): string {
    return this.props.name;
  }
  get createdAt(): string {
    return this.props.createdAt;
  }
  format(): CategoryProps {
    return {
      _id: this.props._id,
      name: this.props.name,
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
