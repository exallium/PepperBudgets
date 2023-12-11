import {DI} from "@/lib/DI";
import Table from "@/components/atoms/Table";
import TableHead from "@/components/atoms/TableHead";
import TableBody from "@/components/atoms/TableBody";
import TableHeading from "@/components/atoms/TableHeading";
import TableRow from "@/components/atoms/TableRow";
import TableData from "@/components/atoms/TableData";
import TopLevelHeader from "@/components/molecules/TopLevelHeader";

export default async function CategoriesPage() {
  // TODO -- paging
  const transactions = await DI.dataStore.getTransactions({
    limit: 10,
    offset: 0
  })

  const rowData = transactions.map(transaction => ({
    ...transaction,
    formattedAmount: DI.currencyFormatter.format(transaction.amount)
  }))

  return (
    <div className="flex flex-col flex-wrap content-center">
      <TopLevelHeader title="Transactions" actionHref="/transactions/upload" actionLabel="Upload"/>
      <Table className="border-collapse w-full max-w-3xl text-sm m-4">
        <TableHead>
          <TableRow>
            <TableHeading>
              Date
            </TableHeading>
            <TableHeading>
              Description
            </TableHeading>
            <TableHeading>
              Amount
            </TableHeading>
            <TableHeading>
              Category
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
                <TableData>
                  {item.date.toDateString()}
                </TableData>
                <TableData>
                  {item.description}
                </TableData>
                <TableData>
                  {item.formattedAmount}
                </TableData>
                <TableData>
                  {item.category?.title ?? "----"}
                </TableData>
                <TableData>
                  <a href={`/transactions/${item.id}`}>Edit</a>
                </TableData>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}