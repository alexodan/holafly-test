import { Button } from "./Button";
import { parse } from "date-fns";

type CardProps = {
  status: "Active" | "Pending" | "Expired";
  dateStart: string;
  dateEnd: string | null;
  comsuption: {
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
  comsuption,
  flag,
  country,
  plan,
}: CardProps) {
  const start = parse(dateStart, "dd/MM/yyyy", new Date());
  const end = dateEnd ? parse(dateEnd, "dd/MM/yyyy", new Date()) : null;
  const daysElapsed =
    ((end ? end.getTime() : start.getTime()) - start.getTime()) /
    (60 * 60 * 24 * 1000);
  return (
    <div className="flex flex-col items-start p-4 border rounded-lg">
      <div className="flex items-center space-x-2">
        <Badge variant="secondary">{status}</Badge>
        <ClockIcon className="text-muted-foreground" />
      </div>
      <div className="mt-2">
        {status !== "Expired" ? (
          <span className="text-sm font-medium">{daysElapsed} days</span>
        ) : (
          <span className="text-sm">
            {dateStart} - {dateEnd}
          </span>
        )}
      </div>
      <div className="mt-2">
        <h3 className="text-lg font-semibold">{country}</h3>
        <p className="text-sm text-muted-foreground">{plan}</p>
      </div>
      {status !== "Expired" ? (
        <Button className={`${StatusOptions[status].color} text-nowrap`}>
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

function ClockIcon(props: any) {
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
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function CloudLightningIcon(props: any) {
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
      <path d="M6 16.326A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 .5 8.973" />
      <path d="m13 12-3 5h4l-3 5" />
    </svg>
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
