import { getUser, logout } from "@/auth/utils";
import { Button } from "@/components/Button";
import { Card } from "@/components/Card";
import Link from "next/link";
import { Card as ICard } from "../api/cards/route";

async function getCards() {
  const res = await fetch("http://localhost:3001/api/cards", {
    next: {
      revalidate: 60, // every minute
    },
  });

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error("Failed to fetch data");
  }

  const { data } = await res.json();
  return data as ICard[];
}

export default async function HomePage() {
  const user = await getUser();
  const cards = await getCards();

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
        {cards.map((card, index) => (
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
