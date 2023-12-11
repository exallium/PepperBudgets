import {DI} from "@/lib/DI";
import H1 from "@/components/atoms/H1";
import Table from "@/components/atoms/Table";
import TableHead from "@/components/atoms/TableHead";
import TableRow from "@/components/atoms/TableRow";
import TableHeading from "@/components/atoms/TableHeading";
import TableBody from "@/components/atoms/TableBody";
import TableData from "@/components/atoms/TableData";

export default async function TagsPage() {
  const tags = await DI.dataStore.getAllTags()

  if (tags.length == 0) {
    return <p>No Tags!</p>
  }

  return (
    <div className="flex flex-col flex-wrap content-center">
      <H1 className="p-4">Tags</H1>
      <Table className="border-collapse w-full max-w-3xl text-sm m-4">
        <TableHead>
          <TableRow>
            <TableHeading>Name</TableHeading>
            <TableHeading>Hide from Budget</TableHeading>
            <TableHeading>Actions</TableHeading>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            tags.map(item => (
              <TableRow key={item.id}>
                <TableData>{item.title}</TableData>
                <TableData>{item.hide_from_budget ? "Y" : "N"}</TableData>
                <TableData>
                  <a href={`/tags/${item.id}`}>Edit</a>
                </TableData>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
    </div>
  )
}