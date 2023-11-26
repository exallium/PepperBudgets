import Papa from 'papaparse';
import {Readable} from "stream";
import {DI} from "@/lib/DI";
import {CsvRowDataBatch} from "@/lib/csv/CsvRowDataBatch";

/**
 * Handles CSV File upload
 *
 * params:
 *
 * csv     - A CSV File Reference
 * account - The account the transactions in the CSV should be added to
 *
 * Expects MultiPart FormData with a csv file and valid type
 */
export async function POST(request: Request): Promise<Response> {
  const formData = await request.formData()

  // Requires a 'csv' file and a valid 'type'
  const csvFile = formData.get('csv')

  const accountId = formData.get('accountId')

  if (!csvFile || !accountId) {
    return Response.json({
      'message': 'Invalid or missing input data.'
    }, {status: 400})
  }

  if (!isCSVFile(csvFile)) {
    return Response.json({
      'message': 'Invalid csv file.'
    }, {status: 400})
  }

  const buffer = await csvFile.arrayBuffer()
  const data: {} = await new Promise(function (complete) {
    const papaStream = Papa.parse(Papa.NODE_STREAM_INPUT, {
      header: true
    })

    const dataStream = Readable.from(Buffer.from(buffer))

    dataStream.pipe(papaStream)

    let data: string[] = []
    papaStream.on("data", chunk => {
      data.push(chunk)
    })

    papaStream.on("finish", () => {
      complete(data)
    })
  })

  DI.dataStore.getAccountById(Number.parseInt(accountId as string))

  // Create transaction batch
  const csvRowDataBatch = new CsvRowDataBatch(
    {
      id: 0,
      title: "My Account",
      description_field: 'Description',
      date_field: 'Transaction Date',
      amount_field: 'Amount'
    },
    data
  )

  // Write transactions to datastore
  csvRowDataBatch.normalize().write(DI.dataStore)

  return Response.json({
    type: type,
    data: data
  })
}

function isCSVFile(input: string | File): input is File {
  return (input as File).type === 'text/csv'
}