import { Button } from "./Button";
import { format, parse, parseISO } from "date-fns";

type CardProps = {
  status: "Active" | "Pending" | "Expired";
  dateStart: string;
  dateEnd: string | null;
  comsumption: {
    totalComsumption: number;
  } | null;
  flag: string;
  country: string;
  plan: string;
};

const StatusOptions = {
  Active: {
    message: "Add more data",
    color: "bg-[#5fd178]",
  },
  Pending: {
    message: "View details and install",
    color: "bg-[#ff485a]",
  },
} as const;

export function Card({
  status,
  dateStart,
  dateEnd,
  comsumption,
  flag,
  country,
  plan,
}: CardProps) {
  const start = parseISO(dateStart);
  const end = dateEnd ? parseISO(dateEnd) : null;
  const daysElapsed =
    ((end ? end.getTime() : start.getTime()) - start.getTime()) /
    (60 * 60 * 24 * 1000);
  return (
    <div className="flex flex-col items-start p-4 border rounded-lg max-w-80">
      <div className="flex items-center space-x-2">
        <Badge variant="secondary">
          <GlobeIcon /> <span className="ml-1">{status}</span>
        </Badge>
      </div>
      <div className="mt-2">
        <h3 className="text-lg font-semibold">{country}</h3>
        {status !== "Expired" ? (
          <span className="text-sm font-medium">{daysElapsed} days</span>
        ) : null}
        {status === "Expired" ? (
          <span className="text-sm">
            {format(dateStart, "dd/MM/yyyy")} -{" "}
            {dateEnd ? format(dateEnd, "dd/MM/yyyy") : "Today"}
          </span>
        ) : null}
      </div>
      <div className="mt-2">
        <p className="text-sm text-muted-foreground">{plan}</p>
      </div>
      {status === "Active" ? (
        <Button
          className={`bg-transparent border-black border w-full text-nowrap`}
        >
          View details
        </Button>
      ) : null}
      {status !== "Expired" ? (
        <Button className={`${StatusOptions[status].color} text-nowrap w-full`}>
          {StatusOptions[status].message}
        </Button>
      ) : null}
    </div>
  );
}

function Badge(props: any) {
  return (
    <span
      className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
      {...props}
    >
      {props.children}
    </span>
  );
}

function GlobeIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}
