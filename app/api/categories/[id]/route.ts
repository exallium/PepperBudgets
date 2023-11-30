import {NextRequest} from "next/server";
import {DI} from "@/lib/DI";

export async function GET(
  _: NextRequest,
  { params } : { params : { id: string }}
): Promise<Response> {
  const category = await DI.dataStore.getCategoryById(Number(params.id))
  return Response.json(category)
}