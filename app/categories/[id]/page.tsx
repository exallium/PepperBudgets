'use client'

import {useFormState} from 'react-dom';
import H1 from "@/components/atoms/H1";
import {CreateCategoryState} from "@/app/categories/create/actions";
import CategoryForm from "@/components/molecules/CategoryForm";
import SubmitButton from "@/components/atoms/SubmitButton";
import {useApiData} from "@/components/hooks";
import {Category, Pattern} from "@prisma/client";
import {updateCategory} from "@/app/categories/[id]/actions";
import Table from "@/components/atoms/Table";
import TableHead from "@/components/atoms/TableHead";
import TableRow from "@/components/atoms/TableRow";
import TableHeading from "@/components/atoms/TableHeading";
import TableData from "@/components/atoms/TableData";
import TableBody from "@/components/atoms/TableBody";

const initialState: CreateCategoryState = {}

export default function EditCategory({params}: { params: { id: string } }) {

  const category = useApiData<Category & { pattern: Array<Pattern> }>(`/api/categories/${params.id}`)
  const [state, formAction] = useFormState(updateCategory, initialState)

  if (!category) {
    return <p>Loading...</p>
  }

  return (
    <>
      <form className="flex flex-col flex-wrap content-center" action={formAction}>
        <H1 className="text-center p-4 border-b-2 border-b-green-500 mb-4">Update Category</H1>
        <CategoryForm category={category}/>
        <input type="hidden" name="id" value={params.id}/>
        <SubmitButton>Update</SubmitButton>
        <p aria-live="polite">
          {state?.message}
        </p>
      </form>
      <div className="flex flex-col flex-wrap content-center">
        <Table className={"border-collapse w-full max-w-3xl text-sm m-4"}>
          <TableHead>
            <TableRow>
              <TableHeading>Patterns</TableHeading>
            </TableRow>
          </TableHead>
          <TableBody>
            {category.pattern.map(p => (
              <TableRow key={p.id}>
                <TableData>{p.pattern}</TableData>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}