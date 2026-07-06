import { useTranslation } from "react-i18next";
import { FaChartLine } from "react-icons/fa";
import { LuDollarSign } from "react-icons/lu";
import { IoShieldOutline } from "react-icons/io5";

import LabeledIcon from "./LabeledIcon";
import Logo from "./Logo";

function BrandPanel() {
  const { t } = useTranslation();

  return (
    <div className="brand-panel bg-gradient-brand hidden w-full flex-col justify-around px-12 py-4 md:flex">
      <Logo brandPanel={true} />
      <Main t={t} />
      <Footer>{t("login.brandFooter")}</Footer>
    </div>
  );
}

const FEATURES = [
  { key: "One", icon: <FaChartLine /> },
  { key: "Two", icon: <LuDollarSign /> },
  { key: "Three", icon: <IoShieldOutline /> },
];
function Main({ t }) {
  return (
    <div className="flex flex-col gap-y-3 text-white">
      <h4 className="mb-2 text-3xl font-bold">{t("login.brandText")}</h4>
      <p>{t("login.brandParag")}</p>
      <div className="flex flex-col gap-y-2">
        {FEATURES.map((feat) => (
          <LabeledIcon
            icon={feat.icon}
            text={t(`login.feature${feat.key}`)}
            color="white"
            variant="glass"
            labelClass="text-white"
            key={feat.key}
          />
        ))}
      </div>
    </div>
  );
}
function Footer({ children }) {
  return (
    <div className="flex items-center gap-x-2.5">
      <div className="flex gap-1.25 [&>i]:size-1.5 [&>i]:rounded-[50%] [&>i]:bg-white/45">
        <i className="bg-white!"></i>
        <i></i>
        <i></i>
      </div>
      <span className="text-white">{children}</span>
    </div>
  );
}
export default BrandPanel;
