import { useTranslation } from "react-i18next";
import Button from "../../ui/Button";
import Modal from "../../ui/Modal";
import CreateCabinForm from "./CreateCabinForm";

function AddCabin() {
  const {t} = useTranslation()
  return (
    <Modal>
      <Modal.Open>
        <Button size="sm">{t("cabins.createCabin")}</Button>
      </Modal.Open>
      <Modal.Window>
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
}

export default AddCabin;
