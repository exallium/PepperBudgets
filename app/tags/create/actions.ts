'use server'

import {redirect} from "next/navigation";
import {DI} from "@/lib/DI";

export interface CreateTagState {
  message?: string
}

async function createTag(_: CreateTagState, formData: FormData): Promise<CreateTagState> {
  const title = formData.get("title")
  const hideFromBudget = formData.get("hide-from-budget")

  if (!title) {
    return {message: 'Invalid Form Data'}
  }

  try {
    await DI.dataStore.createTag({
      title: title as string,
      hide_from_budget: hideFromBudget == "hide"
    })

  } catch (e) {
    console.error(e)
    return {message: "Failed to create tag."}
  }

  return redirect("/tags")
}

export default createTag