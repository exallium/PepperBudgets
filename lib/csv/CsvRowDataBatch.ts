import {TransactionBatch} from "@/lib/csv/TransactionBatch";
import {Account} from "@prisma/client";

/**
 * Represent a batch of transactions. Batches can be one of several
 * types, and they should be able to take input CSV data and normalize
 * it into output data that can be written to a datastore.
 */
export class CsvRowDataBatch {

  private readonly account: Account
  private readonly rowData: {
    [key: string]: string
  }[]

  constructor(account: Account, rowData: {
    [key: string]: string
  }[]) {
    this.account = account
    this.rowData = rowData
  }

  normalize(): TransactionBatch {
    return new TransactionBatch(
      this.rowData.map(item => (
        {
          accountId: this.account.id,
          date: new Date(item[this.account.date_field]),
          description: item[this.account.description_field],
          amount: Number.parseFloat(item[this.account.amount_field])
        }
      ))
    )
  }
}