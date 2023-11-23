import {AccountType} from "@/lib/csv/AccountType";
import {BrimCsvRowData} from "@/lib/csv/BrimCsvRowData";
import {CsvRowDataBatch} from "@/lib/csv/CsvRowDataBatch";
import {Account} from "@prisma/client";

export class TransactionBatchFactory {

  private static createBrimFinancialCsvRowDataBatch(account_id: number, data: string[]): CsvRowDataBatch {
    const transactions = data.map(row => {
      return new BrimCsvRowData(
        account_id,
        {
          no: row[0],
          transaction_date: row[1],
          posted_date: row[2],
          description: row[3],
          cardholder: row[4],
          amount: row[5],
          points: row[6],
          category: row[7],
          last_4_digits: row[8]
        }
      )
    })

    return new CsvRowDataBatch(transactions)
  }

  static createCsvRowDataBatch(account: Account, data: string[]): CsvRowDataBatch {
    switch (account.type) {
      case AccountType.TD_CANADA_TRUST:
        throw "not implemented"
      case AccountType.BRIM_FINANCIAL:
        return this.createBrimFinancialCsvRowDataBatch(account.id, data)
      case AccountType.AMERICAN_EXPRESS_CANADA:
        throw "not implemented"
      default:
        throw "not implemented"
    }
  }
}