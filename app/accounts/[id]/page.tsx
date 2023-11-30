'use client'

import {useFormState} from 'react-dom';
import AccountForm from "@/components/molecules/AccountForm";
import H1 from "@/components/atoms/H1";
import SubmitButton from "@/components/atoms/SubmitButton";
import {useApiData} from "@/components/hooks";
import {Account} from "@prisma/client";
import updateAccount, {UpdateAccountState} from "@/app/accounts/[id]/actions";

const initialState: UpdateAccountState = {}

export default function UpdateAccount({params}: { params: { id: string } }) {

  const account = useApiData<Account>(`/api/accounts/${params.id}`)
  const [state, formAction] = useFormState(updateAccount, initialState)

  if (!account) {
    return <p>Loading...</p>
  }

  return (
    <form className="flex flex-col flex-wrap content-center" action={formAction}>
      <H1 className="text-center p-4 border-b-2 border-b-green-500 mb-4">Create Account</H1>
      <input type="hidden" name="id" value={params.id}/>
      <AccountForm account={account}/>
      <SubmitButton>Update</SubmitButton>
      <p aria-live="polite">
        {state?.message}
      </p>
    </form>
  )
}