import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

import { useTranslation } from "react-i18next";
import { HiOutlineMail } from "react-icons/hi";
import { TbLockPassword } from "react-icons/tb";
import { FaArrowRight } from "react-icons/fa";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import useLogin from "./useLogin";
import useUser from "./useUser";
import Logo from "../../ui/Logo";
import ThemeToggle from "../../ui/ThemeToggle";
import LanguageSwitcher from "../../ui/LanguageSwitcher";
import BrandPanel from "./BrandPanel";

function LoginForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { user } = useUser();

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  return (
    <ContainerGradient>
      <div className="bg-card shadow-card text-text placeholder:text-text relative z-1 flex w-full max-w-135 flex-1 overflow-hidden rounded-4xl md:max-w-265">
        <BrandPanel />
        <LForm t={t} />
      </div>
    </ContainerGradient>
  );
}

function ContainerGradient({ children }) {
  return (
    <div
      className="relative z-0 grid min-h-screen place-items-center overflow-hidden p-6"
      style={{
        background:
          "radial-gradient(900px 500px at 100% -10%, var(--color-bg-grad-1), transparent 60%), radial-gradient(800px 480px at -10% 110%, var(--color-bg-grad-2), transparent 55%), var(--color-bg)",
      }}
    >
      <div
        className="pointer-events-none absolute -end-15 -top-20 h-80 w-80 rounded-[50%] opacity-50 blur-2xl"
        style={{
          background:
            "radial-gradient(circle,var(--color-indigo),transparent 70%)",
        }}
      ></div>
      <div
        className="pointer-events-none absolute -start-12.5 -bottom-17.5 h-70 w-70 rounded-[50%] opacity-50 blur-2xl"
        style={{
          background:
            "radial-gradient(circle,var(--color-green),transparent 70%)",
        }}
      ></div>

      {children}
    </div>
  );
}
function LForm({ t }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: { email: "", password: "" } });
  const { login, isPending } = useLogin();

  const onSubmit = (data) => {
    login(data);
  };
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-11/12 flex-col gap-y-5 p-8 pe-11"
    >
      {/* Form Header */}
      <div className="flex justify-end gap-x-2">
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
      <div className="mb-5 flex items-center justify-center md:hidden">
        <Logo />
      </div>
      <div className="mb-7 flex flex-col gap-y-2">
        <h2 className="text-text text-2xl font-bold">{t("login.welcome")}</h2>
        <p className="text-text-muted text-sm">{t("login.parag")}</p>
      </div>
      {/* Inputs */}
      <Form.Row
        label={t("auth.emailLabel")}
        error={errors.email?.message}
        htmlFor="email"
      >
        <Form.InputTextWithIcon
          register={register("email", {
            required: t("login.reqErrEmail"),
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: t("login.valErrEmail"),
            },
          })}
          id="email"
          icon={<HiOutlineMail />}
          type="email"
          placeholder={t("auth.emailPlaceholder")}
          disabled={isPending}
          hasError={Boolean(errors.email)}
          autoComplete="email"
        />
      </Form.Row>
      <Form.Row
        label={t("auth.password")}
        error={errors.password?.message}
        htmlFor="password"
      >
        <Form.InputPassWithIcon
          register={register("password", {
            required: t("login.reqErrPass"),
            minLength: {
              value: 6,
              message: t("login.valErrPass"),
            },
          })}
          id="password"
          icon={<TbLockPassword />}
          placeholder={t("auth.passwordPlaceholder")}
          type="password"
          disabled={isPending}
          hasError={Boolean(errors.password)}
          autoComplete="current-password"
        />
      </Form.Row>

      <div className="flex justify-between">
        <div className="text-text-muted flex cursor-pointer items-center gap-x-2 text-sm">
          <Form.CheckboxInp id="remember" disabled={isPending} />
          <label htmlFor="remember">{t("login.remember")}</label>
        </div>
        <Link className="text-btn text-sm font-semibold">
          {t("login.forgot")}
        </Link>
      </div>
      <Button typeBtn="submit" type="primaryF">
        {isPending ? t("login.loadingSubm") : t("login.submit")}
        <FaArrowRight className="size-5" />
      </Button>
    </form>
  );
}
export default LoginForm;
