import { useTranslation } from "react-i18next";
import Button from "../../ui/Button";
import { useCheckout } from "./useCheckout";

function CheckoutButton({ id, inDashboard = false }) {
  const {t} = useTranslation();
  const { checkout, isCheckingOut } = useCheckout();
  return (
    <Button
      type="checkedOut"
      size="sm"
      isLink={true}
      disabled={isCheckingOut}
      onClick={() => checkout(id)}
    >
      
      {t("bookings.checkedOut")} {!inDashboard && `booking #${id}`}
    </Button>
  );
}

export default CheckoutButton;
