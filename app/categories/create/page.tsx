'use client'

import {useFormState} from 'react-dom';
import H1 from "@/components/atoms/H1";
import {createCategory, CreateCategoryState} from "@/app/categories/create/actions";
import CategoryForm from "@/components/molecules/CategoryForm";
import SubmitButton from "@/components/atoms/SubmitButton";

const initialState: CreateCategoryState = {}

export default function CreateCategory() {

  const [state, formAction] = useFormState(createCategory, initialState)

  return (
    <form className="flex flex-col flex-wrap content-center" action={formAction}>
      <H1 className="text-center p-4 border-b-2 border-b-green-500 mb-4">Create Category</H1>
      <CategoryForm/>
      <SubmitButton>Create</SubmitButton>
      <p aria-live="polite">
        {state?.message}
      </p>
    </form>
  )
}