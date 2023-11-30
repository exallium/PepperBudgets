import {NextRequest} from "next/server";
import {DI} from "@/lib/DI";

export async function GET(
  _: NextRequest,
  { params } : { params : { id: string }}
): Promise<Response> {
  const account = await DI.dataStore.getAccountById(Number(params.id))
  return Response.json(account)
}