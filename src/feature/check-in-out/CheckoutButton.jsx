import Button from "../../ui/Button"
import { useCheckout } from "./useCheckout"

function CheckoutButton({id}) {
    const {checkout,isCheckingOut} = useCheckout()
    return (
        <Button type="primary" disabled={isCheckingOut} onClick={() => checkout(id)}>
            Check out booking #{id}
        </Button>
    )
}

export default CheckoutButton
