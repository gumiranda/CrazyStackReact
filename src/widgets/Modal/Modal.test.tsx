import { renderWithTheme } from "test/testUtils";
import { screen } from "@testing-library/react";
import { Modal } from "./Modal";
import { useDisclosure } from "@chakra-ui/react";
function ModalTest() {
  const disclosure = useDisclosure();
  const { onClose } = disclosure;
  return (
    <Modal
      isOpen={true}
      onClose={onClose}
      modalHeaderText={"Header Text"}
      modalFooter={<></>}
    >
      Teste
    </Modal>
  );
}
describe("<Modal/>", () => {
  it("should render the Modal component", () => {
    renderWithTheme(<ModalTest />);
    expect(screen.getByText("Header Text")).toBeInTheDocument();
    expect(screen.getByText("Teste")).toBeInTheDocument();
  });
});
