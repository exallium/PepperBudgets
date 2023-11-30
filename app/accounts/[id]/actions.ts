'use server'

import {redirect} from "next/navigation";
import {DI} from "@/lib/DI";

export interface UpdateAccountState {
  message?: string
}

async function updateAccount(_: UpdateAccountState, formData: FormData): Promise<UpdateAccountState> {
  const id = formData.get("id")
  const title = formData.get("title")
  const descriptionField = formData.get("description-field")
  const dateField = formData.get("date-field")
  const amountField = formData.get("amount-field")

  if (!id || !title || !descriptionField || !dateField || !amountField) {
    return {message: 'Invalid Form Data'}
  }

  try {
    await DI.dataStore.updateAccount(Number(id), {
      title: title as string,
      description_field: descriptionField as string,
      date_field: dateField as string,
      amount_field: amountField as string
    })

  } catch (e) {
    console.error(e)
    return {message: "Failed to update account."}
  }

  return redirect("/accounts")
}

export default updateAccount