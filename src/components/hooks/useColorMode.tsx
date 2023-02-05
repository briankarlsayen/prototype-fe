import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useColorMode = () => {
  const [colorMode, setColorMode] = useLocalStorage("color-mode", "");
  useEffect(() => {
    const className = "dark";
    const systemTheme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const bodyClasses = window.document.body.classList;
    const tempTheme = !colorMode && systemTheme;

    colorMode === "dark" || tempTheme
      ? bodyClasses.add(className)
      : bodyClasses.remove(className);
  }, [colorMode]);
  return [colorMode, setColorMode];
};

export default useColorMode;
