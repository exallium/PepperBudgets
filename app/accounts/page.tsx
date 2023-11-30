import {DI} from "@/lib/DI";
import H1 from "@/components/atoms/H1";
import Table from "@/components/atoms/Table";
import TableHead from "@/components/atoms/TableHead";
import TableRow from "@/components/atoms/TableRow";
import TableHeading from "@/components/atoms/TableHeading";
import TableBody from "@/components/atoms/TableBody";
import TableData from "@/components/atoms/TableData";

export default async function AccountsPage() {
  const accounts = await DI.dataStore.getAllAccounts()

  if (accounts.length == 0) {
    return <p>No Accounts!</p>
  }

  return (
    <div className="flex flex-col flex-wrap content-center">
      <H1 className="p-4">Accounts</H1>
      <Table className="border-collapse w-full max-w-3xl text-sm m-4">
        <TableHead>
          <TableRow>
            <TableHeading>Name</TableHeading>
            <TableHeading>Description Field</TableHeading>
            <TableHeading>Amount Field</TableHeading>
            <TableHeading>Date Field</TableHeading>
            <TableHeading>Actions</TableHeading>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            accounts.map(item => (
              <TableRow key={item.id}>
                <TableData>{item.title}</TableData>
                <TableData>{item.description_field}</TableData>
                <TableData>{item.amount_field}</TableData>
                <TableData>{item.date_field}</TableData>
                <TableData>
                  <a href={`/accounts/${item.id}`}>Edit</a>
                </TableData>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}