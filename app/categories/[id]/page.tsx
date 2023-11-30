'use client'

import {useFormState} from 'react-dom';
import H1 from "@/components/atoms/H1";
import {CreateCategoryState} from "@/app/categories/create/actions";
import CategoryForm from "@/components/molecules/CategoryForm";
import SubmitButton from "@/components/atoms/SubmitButton";
import {useApiData} from "@/components/hooks";
import {Category} from "@prisma/client";
import {updateCategory} from "@/app/categories/[id]/actions";

const initialState: CreateCategoryState = {}

export default function EditCategory({ params }: { params: { id: string }}) {

  const category = useApiData<Category>(`/api/categories/${params.id}`)
  const [state, formAction] = useFormState(updateCategory, initialState)

  if (!category) {
    return <p>Loading...</p>
  }

  return (
    <form className="flex flex-col flex-wrap content-center" action={formAction}>
      <H1 className="text-center p-4 border-b-2 border-b-green-500 mb-4">Create Category</H1>
      <CategoryForm category={category} />
      <input type="hidden" name="id" value={params.id} />
      <SubmitButton>Update</SubmitButton>
      <p aria-live="polite">
        {state?.message}
      </p>
    </form>
  )
}