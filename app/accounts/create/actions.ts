'use server'

import {redirect} from "next/navigation";
import {DI} from "@/lib/DI";

export interface CreateAccountState {
  message?: string
}

async function createAccount(_: CreateAccountState, formData: FormData): Promise<CreateAccountState> {
  const title = formData.get("title")
  const descriptionField = formData.get("description-field")
  const dateField = formData.get("date-field")
  const amountField = formData.get("amount-field")

  if (!title || !descriptionField || !dateField || !amountField) {
    return {message: 'Invalid Form Data'}
  }

  try {
    await DI.dataStore.createAccount(
      title as string,
      descriptionField as string,
      dateField as string,
      amountField as string
    )
  } catch (e) {
    console.error(e)
    return {message: "Failed to create account."}
  }

  // Create new db entry
  return redirect("/accounts")
}

export default createAccount