import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";
import { User } from "@/app/api/login/route";

// (in seconds)
export const SESSION_TIMEOUT = 60;

// TODO: put in .env
const secretKey = "secret";
const key = new TextEncoder().encode(secretKey);

export async function encrypt(payload: any) {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TIMEOUT} sec from now`)
    .sign(key);
}

export async function decrypt(token: string) {
  try {
    const result = await jwtVerify(token, key, { algorithms: ["HS256"] });
    return result;
  } catch (e) {
    console.error(e);
    return null;
  }
}

export async function getUser() {
  const currentUser = cookies().get("currentUser");
  if (currentUser?.value) {
    const user = await decrypt(currentUser.value);
    return user?.payload?.user as User;
  }
  return null;
}

export function logout() {
  cookies().delete("currentUser");
}
