import { getUser } from "@/auth/utils";
import { redirect } from "next/navigation";

export default async function RootPage() {
  const user = await getUser();
  if (!user) {
    redirect("/login");
  } else {
    redirect("/home");
  }
}
