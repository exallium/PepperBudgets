'use server'

import Papa from 'papaparse';
import {Readable} from "stream";
import {DI} from "@/lib/DI";
import {CsvRowDataBatch} from "@/lib/csv/CsvRowDataBatch";
import {Account} from "@prisma/client";
import {redirect} from "next/navigation";

export interface UploadTransactionsState {
  message?: string
}

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
export async function uploadTransactions(_: UploadTransactionsState, formData: FormData): Promise<UploadTransactionsState> {
  const csvFile = formData.get('csv')
  const accountId = formData.get('accountId')

  if (!csvFile) {
    return {
      message: 'Missing CSV File.'
    }
  }

  if (!accountId) {
    return {
      message: 'Missing account id.'
    }
  }

  if (!isCSVFile(csvFile)) {
    return {
      message: 'Invalid csv file.'
    }
  }

  const account: Account | null = await DI.dataStore.getAccountById(Number.parseInt(accountId as string))
  if (!account) {
    return {
      message: 'Invalid account.'
    }
  }

  const buffer = await csvFile.arrayBuffer()
  const data: {}[] = await new Promise(function (complete) {
    const papaStream = Papa.parse(Papa.NODE_STREAM_INPUT, {
      header: account.headers
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

  // Create transaction batch
  const csvRowDataBatch = new CsvRowDataBatch(
    account,
    data
  )

  try {
    // Write transactions to datastore
    await csvRowDataBatch.normalize().write(DI.dataStore)
  } catch (e) {
    console.log(e)
    return {
      message: 'Failed to write transactions'
    }
  }

  return redirect('/transactions')
}

function isCSVFile(input: string | File): input is File {
  return (input as File).type === 'text/csv'
}