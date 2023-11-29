'use client'

import {useFormState, useFormStatus} from 'react-dom';
import PrimaryButton from "@/components/atoms/PrimaryButton";
import H1 from "@/components/atoms/H1";
import {createCategory, CreateCategoryState} from "@/app/categories/create/actions";
import CategoryForm from "@/components/molecules/CategoryForm";

const initialState: CreateCategoryState = {}

function Submit() {
  const {pending} = useFormStatus()

  return <PrimaryButton type="submit" aria-disabled={pending}>Create</PrimaryButton>
}

export default function CreateCategory() {

  const [state, formAction] = useFormState(createCategory, initialState)

  return (
    <form className="flex flex-col flex-wrap content-center" action={formAction}>
      <H1 className="text-center p-4 border-b-2 border-b-green-500 mb-4">Create Category</H1>
      <CategoryForm/>
      <Submit/>
      <p aria-live="polite">
        {state?.message}
      </p>
    </form>
  )
}