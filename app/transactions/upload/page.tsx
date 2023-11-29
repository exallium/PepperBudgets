'use client'

import {useFormState, useFormStatus} from 'react-dom';
import PrimaryButton from "@/components/atoms/PrimaryButton";
import H1 from "@/components/atoms/H1";
import {uploadTransactions, UploadTransactionsState} from "@/app/transactions/upload/actions";
import TransactionUploadForm from "@/components/molecules/TransactionUploadForm";

const initialState: UploadTransactionsState = { }

function Submit() {
  const  { pending } = useFormStatus()

  return <PrimaryButton type="submit" aria-disabled={pending}>Upload</PrimaryButton>
}

export default function UploadTransactions() {

  const [state, formAction] = useFormState(uploadTransactions, initialState)

  return (
    <form className="flex flex-col flex-wrap content-center" action={formAction}>
      <H1 className="text-center p-4 border-b-2 border-b-green-500 mb-4">Upload Transactions</H1>
      <TransactionUploadForm/>
      <Submit />
      <p aria-live="polite">
        {state?.message}
      </p>
    </form>
  )
}