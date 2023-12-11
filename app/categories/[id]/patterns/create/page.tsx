'use client'

import {useFormState} from 'react-dom';
import H1 from "@/components/atoms/H1";
import SubmitButton from "@/components/atoms/SubmitButton";
import {createPattern, CreatePatternState} from "@/app/categories/[id]/patterns/create/action";
import PatternForm from "@/components/molecules/PatternForm";

const initialState: CreatePatternState = {}

export default function CreatePattern({params}: { params: { id: string } }) {

  const [state, formAction] = useFormState(createPattern, initialState)

  return (
    <form className="flex flex-col flex-wrap content-center" action={formAction}>
      <H1 className="text-center p-4 border-b-2 border-b-green-500 mb-4">Create Pattern</H1>
      <PatternForm categoryId={params.id}/>
      <SubmitButton>Create</SubmitButton>
      <p aria-live="polite">
        {state?.message}
      </p>
    </form>
  )
}