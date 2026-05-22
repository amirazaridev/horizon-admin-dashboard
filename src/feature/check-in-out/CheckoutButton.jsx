import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ id, inDashboard = false }) {
  const { checkout, isCheckingOut } = useCheckout();
  return (
    <Button
      type="primary"
      isLink={true}
      disabled={isCheckingOut}
      onClick={() => checkout(id)}
    >
      Check out {!inDashboard && `booking #${id}`}
    </Button>
  );
}

export default CheckoutButton;
