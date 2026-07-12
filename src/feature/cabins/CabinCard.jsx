import { formatCurrency, formatFaNum } from "../../utils/helpers";
import Modal from "../../ui/Modal";
import Menus from "../../ui/Menus";
import { HiPencil, HiSquare2Stack, HiTrash, HiUsers } from "react-icons/hi2";
import { useDeleteCabin } from "./useDeleteCabin";
import { useCreateCabin } from "./useCreateCabin";
import CreateCabinForm from "./CreateCabinForm";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useTranslation } from "react-i18next";

// Different gradient backgrounds for visual variety, cycled by index

function CabinCard({ cabin, index = 0 }) {
  const { t } = useTranslation();
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

  const discountPercent =
    discount > 0 && regularPrice > 0
      ? Math.round((discount / regularPrice) * 100)
      : 0;

  const finalPrice = Math.max(regularPrice - discount, 0);

  return (
    <div
      dir="rtl"
      className="group bg-card-2 relative flex flex-col overflow-hidden rounded-2xl shadow-xl ring-1 ring-white/10 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:ring-white/30"
    >
      {/* ============ Top gradient / image section ============ */}
      <div className={`relative h-44 overflow-hidden`}>
        {/* Cabin image with blend overlay (falls back to gradient if missing/broken) */}
        {image && (
          <img
            src={image}
            alt={name}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            onError={(e) => {
              e.target.style.display = "none";
            }}
          />
        )}

        {/* Soft dark overlay at the bottom for depth */}
        <div className="absolute inset-0 bg-linear-to-t from-black/40 via-transparent to-transparent" />

        {/* Discount badge (top-right in RTL) */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 rounded-full bg-black/50 px-3 py-1 text-xs font-bold text-white ring-1 ring-white/20 backdrop-blur-md">
            {t("cabins.discount")} {formatFaNum(discountPercent)}%
          </div>
        )}

        {/* Action menu (top-left in RTL) */}
        <div className="absolute top-3 left-3">
          <Modal>
            <Menus.Toggle id={cabinId} justBottom={true} />
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
                {t("cabins.duplicate")}
              </Menus.Button>
              <Modal.Open opens="edit">
                <Menus.Button icon={<HiPencil />}>
                  {t("cabins.editCabin")}
                </Menus.Button>
              </Modal.Open>
              <Modal.Open opens="delete">
                <Menus.Button icon={<HiTrash />}>
                  {t("common.delete")}
                </Menus.Button>
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
      </div>

      {/* ============ Bottom info section ============ */}
      <div className="text-text flex flex-1 flex-col gap-3 p-5">
        {/* Cabin name */}
        <h3 className="text-lg leading-tight font-bold">{formatFaNum(name)}</h3>

        {/* Capacity */}
        <div className="text-text-muted flex items-center gap-2 text-sm">
          <HiUsers className="h-4 w-4" />
          <span>
            {t("cabins.fitsUpTo", { count: formatFaNum(maxCapacity) })}
          </span>
        </div>

        {/* Price */}
        <div className="mt-auto flex items-end justify-between border-t border-white/10 pt-3">
          <div className="flex flex-col">
            {discount > 0 ? (
              <>
                <span className="text-text-faint text-xs line-through">
                  {formatCurrency(regularPrice)}
                </span>
                <span className="text-text text-lg font-bold">
                  {formatCurrency(finalPrice)}
                </span>
              </>
            ) : (
              <span className="text-text text-lg font-bold">
                {formatCurrency(regularPrice)}
              </span>
            )}
          </div>
          <span className="text-text-muted pb-1 text-xs">
            {t("cabins.perNight")}
          </span>
        </div>
      </div>
    </div>
  );
}

export default CabinCard;
