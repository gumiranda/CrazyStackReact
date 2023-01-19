describe("HourWorkForm", () => {
  let props;

  beforeEach(() => {
    props = {
      labelDayWork: "Dias de funcionamento 1",
      labelHourStart: "Horário de abertura 1",
      labelHourEnd: "Horário de fechamento 1",
      labelHourLunchStart: "Horário de almoço de abertura 1",
      labelHourLunchEnd: "Horário de almoço de fechamento 1",
      control: "",
      daysOptions: [],
      listHours: [],
      daysOptionsName: "days1Options",
      flagDependent: false,
      valueHourStart: "",
      onChangeHourStart: jest.fn(),
      valueHourEnd: "",
      onChangeHourEnd: jest.fn(),
      valueHourLunchStart: "",
      onChangeHourLunchStart: jest.fn(),
      valueHourLunchEnd: "",
      onChangeHourLunchEnd: jest.fn(),
    };
  });

  it("should render correctly", () => {
    const wrapper = shallow(<HourWorkForm {...props} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render a select with the correct label", () => {
    const wrapper = shallow(<HourWorkForm {...props} />);
    expect(wrapper.find("Select").prop("label")).toEqual("Horário de abertura 1");
  });

  it("should call the onChangeHourStart callback when the select changes", () => {
    const wrapper = shallow(<HourWorkForm {...props} />);
    wrapper.find("Select").simulate("change");
    expect(props.onChangeHourStart).toHaveBeenCalled();
  });

  it("should not render the lunch hour select when the flagDependent is false", () => {
    const wrapper = shallow(<HourWorkForm {...props} />);
    expect(wrapper.find("Select").length).toEqual(2);
  });

  it("should render the lunch hour select when the flagDependent is true", () => {
    props.flagDependent = true;
    const wrapper = shallow(<HourWorkForm {...props} />);
    expect(wrapper.find("Select").length).toEqual(4);
  });
});
