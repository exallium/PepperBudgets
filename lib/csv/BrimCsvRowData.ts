import {CsvRowData} from "@/lib/csv/CsvRowData";
import {Transaction} from "@prisma/client";

interface BrimTransactionRecord {
  no: string,
  transaction_date: string,
  posted_date: string,
  description: string,
  cardholder: string,
  amount: string,
  points: string,
  category: string,
  last_4_digits: string
}

export class BrimCsvRowData implements CsvRowData {

  private readonly account_id: number
  private readonly record: BrimTransactionRecord

  constructor(account_id: number, record: BrimTransactionRecord) {
    this.account_id = account_id
    this.record = record
  }

  toTransaction(): Transaction {
    return {
      id: -1,
      accountId: this.account_id,
      amount: BigInt(this.record.amount),
      date: new Date(this.record.posted_date),
      categoryId: -1,
      description: this.record.description
    };
  }
}