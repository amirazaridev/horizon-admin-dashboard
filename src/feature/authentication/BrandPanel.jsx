import { useTranslation } from "react-i18next";
import Logo from "../../ui/Logo";
import LabeledIcon from "../../ui/LabeledIcon";
import { FaChartLine } from "react-icons/fa";
import { LuDollarSign } from "react-icons/lu";
import { IoShieldOutline } from "react-icons/io5";

function BrandPanel() {
  const { t } = useTranslation();

  return (
    <div className="brand-panel bg-gradient-brand hidden w-full flex-col justify-around py-4 px-12 md:flex">
      <Logo brandPanel={true} />
      <Main t={t} />
      <Footer>{t("login.brandFooter")}</Footer>
    </div>
  );
}

function Main({ t }) {
  const features = [
    { num: "One", icon: <FaChartLine /> },
    { num: "Two", icon: <LuDollarSign /> },
    { num: "Three", icon: <IoShieldOutline /> },
  ];
  return (
    <div className="text-white flex flex-col gap-y-3">
      <h4 className="text-3xl font-bold mb-2">{t("login.brandText")}</h4>
      <p>{t("login.brandParag")}</p>
      <div className="flex flex-col gap-y-2">
        {features.map((feat) => (
          <LabeledIcon
            icon={feat.icon}
            text={t(`login.feature${feat.num}`)}
            color="white"
            variant="glass"
            labelClass="text-white"
            key={feat.num}
          />
        ))}
      </div>
    </div>
  );
}
function Footer({children}) {
  return <div className="flex items-center gap-x-2.5">
    <div className="flex gap-1.25 [&>i]:size-1.5 [&>i]:rounded-[50%] [&>i]:bg-white/45">
        <i className="bg-white!"></i>
        <i></i>
        <i></i>
    </div>
    <span className="text-white">{children}</span>
  </div>;
}
export default BrandPanel;
