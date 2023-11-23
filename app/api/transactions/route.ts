import {AccountType} from "@/lib/AccountType";
import Papa from 'papaparse';
import {Readable} from "stream";
import {TransactionBatchFactory} from "@/lib/TransactionFactory";
import {DI} from "@/lib/DI";

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

  // Need to get type based off the account.
  const type = parseAccountType(formData.get('type'))

  if (!csvFile || !type) {
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
  const data: string[] = await new Promise(function (complete) {
    const papaStream = Papa.parse(Papa.NODE_STREAM_INPUT, {})
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

  // Create transaction batch
  const transactionBatch = TransactionBatchFactory.createTransactionBatch(
    { id: 0, type: type },
    data
  )

  // Write transactions to datastore
  transactionBatch.normalize().write(DI.dataStore)

  return Response.json({
    type: type,
    data: data
  })
}

function parseAccountType(type: FormDataEntryValue | null): AccountType | null {
  if (type == null || typeof type !== 'string') {
    return null
  }

  switch (type) {
    case AccountType.AMERICAN_EXPRESS_CANADA:
    case AccountType.BRIM_FINANCIAL:
    case AccountType.TD_CANADA_TRUST:
      return type
    default:
      return null
  }
}

function isCSVFile(input: string | File): input is File {
  return (input as File).type === 'text/csv'
}