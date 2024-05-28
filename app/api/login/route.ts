import { SESSION_TIMEOUT, encrypt } from "@/auth/utils";
import { supabase } from "@/db/client";
import { cookies } from "next/headers";

export type UserCredentials = {
  email: string;
  password: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
};

export async function fetchUser(
  credentials: UserCredentials
): Promise<User | null> {
  const { data: user } = await supabase
    .from("User")
    .select("*")
    .eq("email", credentials.email)
    .single();
  if (!user) {
    return null;
  }
  if (user.password !== credentials.password) {
    return null;
  }
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  } as User;
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const user = await fetchUser({
      email: String(formData.get("email")),
      password: String(formData.get("password")),
    });
    if (!user) {
      throw Response.json({ error: "Credentials invalid" }, { status: 400 });
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
