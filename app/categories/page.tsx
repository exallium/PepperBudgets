import {DI} from "@/lib/DI";
import Table from "@/components/atoms/Table";
import TableHead from "@/components/atoms/TableHead";
import TableBody from "@/components/atoms/TableBody";
import TableRow from "@/components/atoms/TableRow";
import TableHeading from "@/components/atoms/TableHeading";
import TableData from "@/components/atoms/TableData";
import TopLevelHeader from "@/components/molecules/TopLevelHeader";

export default async function CategoriesPage() {
  const categories = await DI.dataStore.getAllCategories()

  const rowData = categories.map(item => (
    {
      ...item,
      formattedAmount: DI.currencyFormatter.format(item.budget)
    }
  ))

  return (
    <div className="flex flex-col flex-wrap content-center">
      <TopLevelHeader title="Categories" actionHref="/categories/create" actionLabel="Create Category"/>
      <Table className="border-collapse w-full max-w-3xl text-sm m-4">
        <TableHead>
          <TableRow>
            <TableHeading>
              Title
            </TableHeading>
            <TableHeading>
              Budget
            </TableHeading>
            <TableHeading>
              Actions
            </TableHeading>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            rowData.map(item => (
              <TableRow key={item.id}>
                <TableData>{item.title}</TableData>
                <TableData>{item.formattedAmount}</TableData>
                <TableData>
                  <a href={`/categories/${item.id}`}>Edit</a>
                </TableData>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}