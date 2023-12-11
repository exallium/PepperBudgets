import {DI} from "@/lib/DI";
import Table from "@/components/atoms/Table";
import TableHead from "@/components/atoms/TableHead";
import TableRow from "@/components/atoms/TableRow";
import TableHeading from "@/components/atoms/TableHeading";
import TableBody from "@/components/atoms/TableBody";
import TableData from "@/components/atoms/TableData";
import TopLevelHeader from "@/components/molecules/TopLevelHeader";

export default async function TagsPage() {
  const tags = await DI.dataStore.getAllTags()

  return (
    <div className="flex flex-col flex-wrap content-center">
      <TopLevelHeader title="Tags" actionHref="/tags/create" actionLabel="Create Tag"/>
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