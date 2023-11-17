interface NormalizedTransactionRecord {
  account_id: number,
  date: string,
  description: string,
  amount: number,
  category: string
}

/**
 * Normalized representation of account transaction data that can be
 * written to or read from the datastore.
 */
export class NormalizedTransaction {

  private readonly record: NormalizedTransactionRecord

  constructor(record: NormalizedTransactionRecord) {
    this.record = record
  }

}