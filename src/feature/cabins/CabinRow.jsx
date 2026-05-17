import { formatCurrency } from "../../utils/helpers";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import Button from "../../ui/Button";
import { HiPencil, HiSquare2Stack, HiTrash } from "react-icons/hi2";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteCabin } from "./useDeleteCabin";
import CreateCabinForm from "./CreateCabinForm";
import { useCreateCabin } from "./useCreateCabin";

function CabinRow({ cabin }) {
  const { deleteCabin, isDeleting } = useDeleteCabin();
  const { createCabin } = useCreateCabin();
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;
  return (
    <Table.Row>
      <img className="rounded-lg p-1" src={image} alt="cabin-image" />
      <div>{name}</div>
      <div>Fits up to {maxCapacity} guests</div>
      <div className="text-[10px] sm:text-sm md:text-base">
        {formatCurrency(regularPrice)}
      </div>
      {discount ? (
        <div className="text-center text-[10px] sm:text-sm md:text-start md:text-base">
          {formatCurrency(discount)}
        </div>
      ) : (
        <span className="text-center md:text-start">&mdash;</span>
      )}
      <div className="text-end md:pe-7 lg:pe-10">
        <Modal>
          <Menus.Toggle id={cabinId} />
          <Menus.List id={cabinId}>
            <Menus.Button
              onClick={() =>
                createCabin({
                  name: `Copy of ${name}`,
                  maxCapacity,
                  regularPrice,
                  discount,
                  image,
                  description,
                })
              }
              icon={<HiSquare2Stack />}
            >
              Duplicate
            </Menus.Button>
            <Modal.Open opens="edit">
              <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
            </Modal.Open>
            <Modal.Open opens="delete">
              <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
            </Modal.Open>
          </Menus.List>
          <Modal.Window name="edit">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>
          <Modal.Window name="delete">
            <ConfirmDelete
              resName="cabins"
              onConfirm={() => deleteCabin(cabinId)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}

export default CabinRow;
