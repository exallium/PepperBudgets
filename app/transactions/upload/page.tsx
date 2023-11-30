'use client'

import {useFormState} from 'react-dom';
import H1 from "@/components/atoms/H1";
import {uploadTransactions, UploadTransactionsState} from "@/app/transactions/upload/actions";
import TransactionUploadForm from "@/components/molecules/TransactionUploadForm";
import SubmitButton from "@/components/atoms/SubmitButton";

const initialState: UploadTransactionsState = { }

export default function UploadTransactions() {

  const [state, formAction] = useFormState(uploadTransactions, initialState)

  return (
    <form className="flex flex-col flex-wrap content-center" action={formAction}>
      <H1 className="text-center p-4 border-b-2 border-b-green-500 mb-4">Upload Transactions</H1>
      <TransactionUploadForm/>
      <SubmitButton>Upload</SubmitButton>
      <p aria-live="polite">
        {state?.message}
      </p>
    </form>
  )
}