'use server'

import {redirect} from "next/navigation";
import {DI} from "@/lib/DI";
import {isNumber} from "util";
import {Validators} from "@/lib/csv/Validators";

export interface UpdateAccountState {
  message?: string
}

async function updateAccount(_: UpdateAccountState, formData: FormData): Promise<UpdateAccountState> {
  const id = formData.get("id")
  const title = formData.get("title")
  const descriptionField = formData.get("description-field")
  const dateField = formData.get("date-field")
  const amountField = formData.get("amount-field")
  const incomeField = formData.get("income-field")
  const invertAmounts = formData.get("invert-amounts")
  const headers = formData.get("headers")

  if (!id || !title || !descriptionField || !dateField || !amountField) {
    return {message: 'Invalid Form Data'}
  }

  const result = Validators.validateAccountFields(
    headers,
    descriptionField,
    dateField,
    amountField,
    incomeField
  )

  if (result) {
    return {message: result}
  }

  try {
    await DI.dataStore.updateAccount(Number(id), {
      title: title as string,
      description_field: descriptionField as string,
      date_field: dateField as string,
      amount_field: amountField as string,
      headers: headers !== null,
      invert_values: invertAmounts !== null,
      income_field: incomeField ? incomeField as string : null
    })

  } catch (e) {
    console.error(e)
    return {message: "Failed to update account."}
  }

  return redirect("/accounts")
}

export default updateAccount