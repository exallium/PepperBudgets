import {DI} from "@/lib/DI";
import Table from "@/components/atoms/Table";
import TableHead from "@/components/atoms/TableHead";
import TableBody from "@/components/atoms/TableBody";
import TableHeading from "@/components/atoms/TableHeading";
import TableRow from "@/components/atoms/TableRow";
import TableData from "@/components/atoms/TableData";
import H1 from "@/components/atoms/H1";

export default async function CategoriesPage() {
  const transactionCount = await DI.dataStore.getTransactionCount()
  if (transactionCount == 0) {
    return <p>No transactions!</p>
  }

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
      <H1 className="p-4">Transactions</H1>
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