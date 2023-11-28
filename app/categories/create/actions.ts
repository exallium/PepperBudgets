'use server'

import {DI} from "@/lib/DI";

export interface CreateCategoryState {
  message?: string
}

async function createCategory(_: CreateCategoryState, formData: FormData) {
  const title = formData.get("title")
  const budget = formData.get("budget")

  if (!title || !budget) {
    return { message: "Missing Inputs" }
  }

  try {
    await DI.dataStore.createCategory(title as string, Number.parseFloat(budget as string))
  } catch (e) {
    console.log(e)
    return { message: "Failed to create category" }
  }
}