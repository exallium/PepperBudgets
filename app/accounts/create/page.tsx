'use client'

import {useFormState, useFormStatus} from 'react-dom';
import AccountForm from "@/components/molecules/AccountForm";
import PrimaryButton from "@/components/atoms/PrimaryButton";
import H1 from "@/components/atoms/H1";
import createAccount, {CreateAccountState} from "@/app/accounts/create/actions";

const initialState: CreateAccountState = { }

function Submit() {
  const  { pending } = useFormStatus()

  return <PrimaryButton type="submit" aria-disabled={pending}>Create</PrimaryButton>
}

export default function CreateAccount() {

  const [state, formAction] = useFormState(createAccount, initialState)

  return (
    <form className="flex flex-col flex-wrap content-center" action={formAction}>
      <H1 className="text-center p-4 border-b-2 border-b-green-500 mb-4">Create Account</H1>
      <AccountForm/>
      <Submit />
      <p aria-live="polite">
        {state?.message}
      </p>
    </form>
  )
}