'use server'

import {DI} from "@/lib/DI";
import {redirect} from "next/navigation";

export interface UpdateCategoryState {
  message?: string
}

export async function updateCategory(_: UpdateCategoryState, formData: FormData): Promise<UpdateCategoryState> {
  const id = formData.get("id")
  const title = formData.get("title")
  const budget = formData.get("budget")

  if (!id || !title || !budget) {
    return {message: "Missing Inputs"}
  }

  try {
    await DI.dataStore.updateCategory(Number.parseInt(id as string), {
      title: title as string,
      budget: Number.parseFloat(budget as string)
    })
  } catch (e) {
    console.error(e)
    return {message: "Failed to update category"}
  }

  return redirect("/categories")
}