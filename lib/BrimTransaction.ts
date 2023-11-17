import {NormalizedTransaction} from "@/lib/NormalizedTransaction";

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

export class BrimTransaction implements Transaction {

  private readonly account_id: number
  private readonly record: BrimTransactionRecord

  constructor(account_id: number, record: BrimTransactionRecord) {
    this.account_id = account_id
    this.record = record
  }

  toNormalizedTransaction(): NormalizedTransaction {
    return new NormalizedTransaction({
      account_id: this.account_id,
      amount: Number.parseFloat(this.record.amount),
      date: this.record.posted_date,
      category: this.record.category,
      description: this.record.description
    });
  }
}