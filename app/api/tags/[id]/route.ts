import {NextRequest} from "next/server";
import {DI} from "@/lib/DI";

export async function GET(
  _: NextRequest,
  { params } : { params : { id: string }}
): Promise<Response> {
  const account = await DI.dataStore.getTagById(Number(params.id))
  return Response.json(account)
}