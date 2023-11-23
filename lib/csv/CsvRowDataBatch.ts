import {TransactionBatch} from "@/lib/csv/TransactionBatch";
import {CsvRowData} from "@/lib/csv/CsvRowData";

/**
 * Represent a batch of transactions. Batches can be one of several
 * types, and they should be able to take input CSV data and normalize
 * it into output data that can be written to a datastore.
 */
export class CsvRowDataBatch {

  private readonly rowData: CsvRowData[]

  constructor(rowData: CsvRowData[]) {
    this.rowData = rowData
  }

  normalize(): TransactionBatch {
    return new TransactionBatch(
      this.rowData.map(item => item.toTransaction())
    )
  }
}