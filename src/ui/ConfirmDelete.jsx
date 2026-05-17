import Button from "./Button";

function ConfirmDelete({ resName, onCloseModal, onConfirm, disabled }) {
  return (
    <article className="text-pri-text flex h-full flex-col justify-center gap-y-1 px-5 py-5 md:gap-y-3 md:pb-5">
      <h3 className="text-2xl">Delete {resName}</h3>
      <p className="mt-1 text-sm md:text-base">
        Are you sure you want to delete this {resName} permanently? This action
        cannot be undone.
      </p>
      <div className="flex justify-end gap-x-2">
        <Button type="cancel" disabled={disabled} onClick={onCloseModal}>
          Cancel
        </Button>
        <Button type="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </article>
  );
}

export default ConfirmDelete;
