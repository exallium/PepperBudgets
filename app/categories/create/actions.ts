'use server'

import {DI} from "@/lib/DI";
import {redirect} from "next/navigation";

export interface CreateCategoryState {
  message?: string
}

export async function createCategory(_: CreateCategoryState, formData: FormData): Promise<CreateCategoryState> {
  const title = formData.get("title")
  const budget = formData.get("budget")

  if (!title || !budget) {
    return {message: "Missing Inputs"}
  }

  try {
    await DI.dataStore.createCategory(title as string, Number.parseFloat(budget as string))
  } catch (e) {
    console.log(e)
    return {message: "Failed to create category"}
  }

  return redirect("/categories")
}