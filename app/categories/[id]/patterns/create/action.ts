'use server'

import {DI} from "@/lib/DI";
import {redirect} from "next/navigation";

export interface CreatePatternState {
  message?: string
}

export async function createPattern(_: CreatePatternState, formData: FormData): Promise<CreatePatternState> {
  const categoryId = formData.get("categoryId")
  const pattern = formData.get("pattern")

  if (!categoryId || !pattern) {
    return {message: "Missing Inputs"}
  }

  try {
    await DI.dataStore.createPattern({
      pattern: pattern as string,
      category: {
        connect: {
          id: Number(categoryId as string)
        }
      }
    })
  } catch (e) {
    console.error(e)
    return {message: "Failed to create pattern"}
  }

  return redirect(`/categories/${categoryId}`)
}