import { HiOutlineSun, HiOutlineUser } from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";
import { HiArrowRightOnRectangle } from "react-icons/hi2";
import ThemeToggle from "./ThemeToggle";
import Logout from "../feature/authentication/Logout";

function HeaderMenu() {
  return (
    <ul className="flex gap-x-3 pt-1">
      <li>
        <ButtonIcon>
          <HiOutlineUser className="" />
        </ButtonIcon>
      </li>
      <li>
        <ThemeToggle />
      </li>
      <li>
        <Logout />
      </li>
    </ul>
  );
}

export default HeaderMenu;
