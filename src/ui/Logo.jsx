import { useTranslation } from "react-i18next";
import LogoIcon from "./LogoIcon";
import LabeledIcon from "./LabeledIcon";

function Logo({ collapsed = false, className = "", brandPanel = false }) {
  const { t } = useTranslation();

  if (brandPanel)
    return (
        <LabeledIcon icon={<LogoIcon />} text={t("brand.name")} color="white" variant="glass" size="lg" labelClass="font-bold text-white"/>
      // <div className="flex items-center gap-x-4 p-12">
      //   <div className="grid size-12.5 place-items-center justify-center rounded-xl border border-white/25 bg-white/18 text-white backdrop-blur-sm">
      //     <LogoIcon className="size-7" />
      //   </div>
      //   <h2 className="text-xl font-bold text-white">{t("brand.name")}</h2>
      // </div>
    );

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div
        className="grid size-11 shrink-0 place-items-center rounded-xl text-white"
        style={{
          background:
            "linear-gradient(135deg, var(--color-primary), var(--color-soft) 70%, var(--color-indigo))",
          boxShadow: "0 8px 22px -8px rgba(63,39,199,.7)",
        }}
      >
        <LogoIcon />
      </div>
      {!collapsed && (
        <div className="leading-tight">
          <div className="text-xl font-extrabold tracking-tight">
            {t("brand.name")}
          </div>
          <div className="text-text-muted text-xs font-semibold tracking-[0.04em] uppercase">
            {t("brand.tagline")}
          </div>
        </div>
      )}
    </div>
  );
}

export default Logo;
