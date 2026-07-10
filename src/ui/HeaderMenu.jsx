import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import {
  HiChevronDown,
  HiCog6Tooth,
  HiArrowRightOnRectangle,
} from "react-icons/hi2";
import useUser from "../feature/authentication/useUser";
import useLogout from "../feature/authentication/useLogout";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";
import Menus from "./Menus";

function HeaderMenu() {
  const { t } = useTranslation();
  const { logout, isPending } = useLogout();
  const navigate = useNavigate();

  const avatarIcon = (
    <div className="flex cursor-pointer items-center gap-2 rounded-xl px-1 py-1 transition-colors duration-150 hover:bg-primary/[0.06]">
      <img
        className="size-8 rounded-full object-cover object-center ring-2 ring-border-strong"
        src="default-user.jpg"
        alt="avatar"
      />
      <HiChevronDown className="size-4 text-text-muted" />
    </div>
  );

  return (
    <div className="ms-auto flex items-center gap-2">
      <LanguageSwitcher />
      <ThemeToggle />
      <Menus>
        <Menus.Toggle id="header-menu" icon={avatarIcon} />
        <Menus.List id="header-menu">
          <Menus.Button
            icon={<HiCog6Tooth className="size-4" />}
            onClick={() => navigate("/account")}
          >
            {t("header.accountSettings")}
          </Menus.Button>
          <Menus.Divider />
          <Menus.Button
            danger
            icon={<HiArrowRightOnRectangle className="size-4" />}
            onClick={logout}
            disabled={isPending}
          >
            {t("header.logout")}
          </Menus.Button>
        </Menus.List>
      </Menus>
    </div>
  );
}

export default HeaderMenu;
