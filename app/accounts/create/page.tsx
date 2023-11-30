'use client'

import {useFormState} from 'react-dom';
import AccountForm from "@/components/molecules/AccountForm";
import H1 from "@/components/atoms/H1";
import createAccount, {CreateAccountState} from "@/app/accounts/create/actions";
import SubmitButton from "@/components/atoms/SubmitButton";

const initialState: CreateAccountState = { }

export default function CreateAccount() {

  const [state, formAction] = useFormState(createAccount, initialState)

  return (
    <form className="flex flex-col flex-wrap content-center" action={formAction}>
      <H1 className="text-center p-4 border-b-2 border-b-green-500 mb-4">Create Account</H1>
      <AccountForm/>
      <SubmitButton>Create</SubmitButton>
      <p aria-live="polite">
        {state?.message}
      </p>
    </form>
  )
}