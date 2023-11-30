'use client'

import H1 from "@/components/atoms/H1";
import SubmitButton from "@/components/atoms/SubmitButton";
import {useFormState} from "react-dom";
import {updateTransaction, UpdateTransactionState} from "@/app/transactions/[id]/actions";
import TransactionUpdateForm from "@/components/molecules/TransactionUpdateForm";
import {useApiData} from "@/components/hooks";
import {Category, Transaction} from "@prisma/client";
import {useMemo} from "react";

const initialState: UpdateTransactionState = {}


export default function EditTransaction({ params }: { params: { id: string }}) {
  const transaction = useApiData<Transaction & { date: string }>(`/api/transactions/${params.id}`)
  const categories = useApiData<Category[]>('/api/categories')
  const options = useMemo(() => (
    categories?.map(item => ({
      value: item.id,
      label: item.title
    }))
  ), [categories])

  const [state, formAction] = useFormState(updateTransaction, initialState)

  if (!transaction || !options) {
    return <p>Loading...</p>
  }

  return (
    <form className="flex flex-col flex-wrap content-center" action={formAction}>
      <H1 className="text-center p-4 border-b-2 border-b-green-500 mb-4">Create Account</H1>
      <TransactionUpdateForm transaction={transaction} categories={options} />
      <SubmitButton>Update</SubmitButton>
      <p aria-live="polite">
        {state?.message}
      </p>
    </form>
  )
}