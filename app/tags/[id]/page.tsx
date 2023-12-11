'use client'

import {useFormState} from 'react-dom';
import H1 from "@/components/atoms/H1";
import SubmitButton from "@/components/atoms/SubmitButton";
import {useApiData} from "@/components/hooks";
import {Tag} from "@prisma/client";
import TagForm from "@/components/molecules/TagForm";
import updateTag, {UpdateTagState} from "@/app/tags/[id]/actions";

const initialState: UpdateTagState = {}

export default function UpdateTag({params}: { params: { id: string } }) {

  const tag = useApiData<Tag>(`/api/tags/${params.id}`)
  const [state, formAction] = useFormState(updateTag, initialState)

  if (!tag) {
    return <p>Loading...</p>
  }

  return (
    <form className="flex flex-col flex-wrap content-center" action={formAction}>
      <H1 className="text-center p-4 border-b-2 border-b-green-500 mb-4">Update Tag</H1>
      <input type="hidden" name="id" value={params.id}/>
      <TagForm tag={tag}/>
      <SubmitButton>Update</SubmitButton>
      <p aria-live="polite">
        {state?.message}
      </p>
    </form>
  )
}