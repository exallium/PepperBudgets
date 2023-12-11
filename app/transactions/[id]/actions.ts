'use server'

import {redirect} from "next/navigation";
import {DI} from "@/lib/DI";
import {Prisma} from "@prisma/client";

export interface UpdateTransactionState {
  message?: string
}

export async function updateTransaction(_: UpdateTransactionState, formData: FormData) {
  const id = formData.get("id")
  const description = formData.get("description")
  const date = formData.get("date")
  const amount = formData.get("amount")
  const categoryId = formData.get("categoryId")
  const accountId = formData.get("accountId")

  if (!id || !description || !date || !amount || !accountId) {
    return {
      message: "Missing or invalid inputs"
    }
  }

  const hasCategoryId = categoryId !== null && Number(categoryId) > 0
  const categoryBody: Prisma.CategoryUpdateOneWithoutTransactionNestedInput = hasCategoryId
    ? {connect: {id: Number(categoryId)}}
    : {disconnect: true}

  try {
    await DI.dataStore.updateTransaction(
      Number.parseInt(id as string),
      {
        description: description as string,
        date: date as string,
        amount: Number.parseFloat(amount as string),
        category: categoryBody,
        account: {
          connect: { id: Number(accountId) }
        }
      }
    )
  } catch (e) {
    console.error(e)
    return {
      message: 'Failed to update transaction'
    }
  }

  console.log("success")
  return redirect("/transactions")
}