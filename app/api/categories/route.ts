import {DI} from "@/lib/DI";

export async function GET(request: Request): Promise<Response> {
  const categories = await DI.dataStore.getAllCategories()
  return Response.json(categories)
}