import { getUser } from "@/auth/utils";
import { Button } from "@/components/Button";
import { redirect } from "next/navigation";

export default async function LoginPage() {
  const user = await getUser();
  if (user) {
    redirect("/home");
  }
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-4xl text-center mb-8">Sign in</h1>
      <form className="grid text-lg" action="/api/login" method="POST">
        <div>
          <label className="block my-2" htmlFor="username">
            Username
          </label>
          <input
            className="border-b-2 border-gray-200 focus-visible:border-blue-400 focus-visible:outline-none"
            id="username"
            name="username"
            autoComplete="username"
            defaultValue="foo"
            type="text"
          />
        </div>
        <div>
          <label className="block my-2" htmlFor="password">
            Password
          </label>
          <input
            className="border-b-2 border-gray-200 focus-visible:border-blue-400 focus-visible:outline-none"
            id="password"
            name="password"
            type="password"
            defaultValue="1234"
            autoComplete="current-password"
          />
        </div>
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
