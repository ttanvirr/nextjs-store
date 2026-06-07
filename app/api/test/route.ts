export const GET = async () => {
  try {
    return Response.json({ msg: "A simple message" })
  } catch (error) {
    return Response.json({ status: 404, msg: "Not found" })
  }
}
