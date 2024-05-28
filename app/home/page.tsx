import { getUser, logout } from "@/auth/utils";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import Link from "next/link";
import { Card as ICard } from "../api/cards/route";
import { supabase } from "@/db/client";

async function getCardsByUserId(userId?: number): Promise<ICard[] | undefined> {
  if (!userId) {
    return [];
  }
  const response = await supabase
    .from("Card")
    .select("*")
    .eq("user_id", userId);
  return response?.data?.map((card) => ({
    plan: card.plan ?? "",
    country: card.country ?? "",
    flag: card.flag ?? "",
    status: card.status as "Pending" | "Expired" | "Active",
    comsumption: {
      totalComsumption: card.comsumption ?? 0,
    },
    dateEnd: card.date_end ?? "",
    dateStart: card.date_start ?? "",
  }));
}

export default async function HomePage() {
  const user = await getUser();
  const cards = await getCardsByUserId(user?.id);

  if (!user) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-between p-24">
        <p className="text-4xl">
          Please login{" "}
          <Link className="underline text-blue-400" href="/login">
            here
          </Link>
        </p>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-6xl font-bold">Welcome {user.name}!</h1>
      <div className="grid md:grid-cols-2 lg:grid-flow-col auto-cols-max gap-4 mt-16">
        {cards?.map((card, index) => (
          <Card key={index} {...card} />
        ))}
      </div>
      <form
        action={async () => {
          "use server";
          logout();
        }}
      >
        <Button type="submit">Log out</Button>
      </form>
    </main>
  );
}
