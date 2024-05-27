import { SESSION_TIMEOUT, encrypt } from "@/auth/utils";
import { cookies } from "next/headers";

export type UserCredentials = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  name: string;
  userName: string;
};

export async function fetchUser(
  credentials: UserCredentials
): Promise<User | null> {
  // TODO: Connect to a DB
  const user = {
    id: 1,
    name: "Rachel",
    userName: "rachel_hudson",
  };
  if (!user) {
    return null;
  }
  return user as User;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const user = await fetchUser({
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    });
    if (!user) {
      throw new Error("Invalid credentials");
    }
    // Expires in 10 seconds
    const expires = new Date(Date.now() + SESSION_TIMEOUT * 1000);
    const session = await encrypt({ user, expires });
    cookies().set("currentUser", session, { expires, httpOnly: true });
    return Response.redirect(new URL("/home", request.url));
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 400 });
  }
}
