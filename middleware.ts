import { NextRequest, NextResponse } from "next/server";
import { decrypt, encrypt } from "./auth/utils";
import { SESSION_TIMEOUT } from "./auth/utils";

async function updateSession(request: NextRequest) {
  console.log("updating session");
  const currentUser = request.cookies.get("currentUser")?.value;
  if (!currentUser) {
    return;
  }
  const parsed = await decrypt(currentUser);
  const res = NextResponse.next();
  res.cookies.set({
    name: "currentUser",
    value: await encrypt(parsed?.payload),
    httpOnly: true,
    expires: new Date(Date.now() + SESSION_TIMEOUT * 1000),
  });
  return res;
}

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}
