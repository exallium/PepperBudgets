'use server'

import {redirect} from "next/navigation";
import {DI} from "@/lib/DI";

export interface UpdateTagState {
  message?: string
}

async function updateTag(_: UpdateTagState, formData: FormData): Promise<UpdateTagState> {
  const id = formData.get("id")
  const title = formData.get("title")
  const hideFromBudget = formData.get("hide-from-budget")

  if (!id || !title) {
    return {message: 'Invalid Form Data'}
  }

  try {
    await DI.dataStore.updateTag(Number(id), {
      title: title as string,
      hide_from_budget: hideFromBudget === "hide"
    })

  } catch (e) {
    console.error(e)
    return {message: "Failed to update tag."}
  }

  return redirect("/tags")
}

export default updateTag