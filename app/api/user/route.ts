export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = Number(searchParams.get("id"));
  try {
    // TODO: query db by id
    const user = {
      id,
      name: "Rachel",
      userName: "rachel_hudson",
    };
    if (!user) {
      return Response.redirect(new URL("/login", request.url));
    }
    return Response.json({ user });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 400 });
  }
}
