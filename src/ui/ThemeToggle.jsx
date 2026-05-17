import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi";
import ButtonIcon from "./ButtonIcon";
import { useThemeToggle } from "../context/ThemeContext";

function ThemeToggle() {
  const { handleDarkMode, isDarkMode } = useThemeToggle();
  return (
    <ButtonIcon onClick={() => handleDarkMode()}>
      {isDarkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}

export default ThemeToggle;
