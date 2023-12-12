import {TransactionBatch} from "@/lib/csv/TransactionBatch";
import {Account} from "@prisma/client";

type CsvRowData = string[] | { [key: string]: string }

/**
 * Represent a batch of transactions. Batches can be one of several
 * types, and they should be able to take input CSV data and normalize
 * it into output data that can be written to a datastore.
 */
export class CsvRowDataBatch {

  private readonly account: Account
  private readonly rowData: CsvRowData[]

  constructor(account: Account, rowData: CsvRowData[]) {
    this.account = account
    this.rowData = rowData
  }

  normalize(): TransactionBatch {
    return new TransactionBatch(
      this.rowData.map(item => (
        {
          accountId: this.account.id,
          date: new Date(this.readField(item, this.account.date_field)),
          description: this.readField(item, this.account.description_field),
          amount: this.readAmount(item)
        }
      ))
    )
  }

  private readAmount(item: CsvRowData): number {
    const amount = Number.parseFloat(this.readField(item, this.account.amount_field))
    const hasSeparateIncomeField = !!this.account.income_field && this.account.income_field.length > 0 && this.account.income_field !== this.account.amount_field
    const income = hasSeparateIncomeField ? Number.parseFloat(this.readField(item, this.account.income_field!!)) : 0.0

    // Incomes are considered negative, so we should do amount MINUS income for total.
    const total = this.coerce(amount) - this.coerce(income)

    if (this.account.invert_values) {
      return -total
    } else {
      return total
    }
  }

  private coerce(n: number): number {
    return isNaN(n) ? 0 : n
  }

  private readField(item: CsvRowData, field: string): string {
    if (this.account.headers) {
      const obj = item as { [key: string]: string }
      return obj[field]
    } else {
      const array = item as string[]
      const index = Number(field)

      if (isNaN(index)) {
        throw 'Expected field to be a number, got ' + field + ' instead'
      }

      return array[index]
    }
  }
}