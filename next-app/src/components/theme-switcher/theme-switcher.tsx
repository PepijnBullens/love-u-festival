import Interface from "@/components/theme-switcher/interface";
import { cookies } from "next/headers";

export default async function ThemeSwitcher() {
  const cookieStore = await cookies();
  const themeCookie = cookieStore.get("theme");
  const theme = themeCookie?.value || "light";

  return <Interface initialTheme={theme} />;
}
