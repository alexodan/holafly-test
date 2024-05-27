import { NextResponse } from "next/server";

export type Card = {
  status: "Pending" | "Expired" | "Active";
  dateStart: string;
  dateEnd: string | null;
  comsuption: { totalComsumption: number } | null;
  flag: string;
  country: string;
  plan: string;
};

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));

  return NextResponse.json({
    data: [
      {
        status: "Expired",
        dateStart: "01/01/2023",
        dateEnd: "04/01/2023",
        comsuption: null,
        flag: "", // URL de la imagen del country
        country: "Colombia",
        plan: "4 dias, 3GB",
      },
      {
        status: "Expired",
        dateStart: "02/01/2023",
        dateEnd: "02/01/2023",
        comsuption: null,
        flag: "",
        country: "Colombia",
        plan: "30 dias, 25GB",
      },
      {
        status: "Pending",
        dateStart: "01/01/2024",
        dateEnd: null,
        comsuption: {
          totalComsumption: 1468006.4,
        },
        flag: "", // URL de la imagen del country
        country: "Peru",
        plan: "1 dia, 1.4GB",
      },
      {
        status: "Active",
        dateStart: "06/10/2023",
        dateEnd: "16/10/2023",
        comsuption: {
          totalComsumption: 12582912,
        },
        flag: "", // URL de la imagen del country
        country: "España",
        plan: "10 dias, 12GB",
      },
    ] as Card[],
  });
}
