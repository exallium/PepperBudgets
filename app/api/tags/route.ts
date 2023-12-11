import {DI} from "@/lib/DI";

export async function GET(request: Request): Promise<Response> {
  const accounts = await DI.dataStore.getAllTags()
  return Response.json(accounts)
}