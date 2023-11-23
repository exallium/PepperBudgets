import {Transaction} from "@prisma/client";

/**
 * A single transaction for a specific account.
 */
export interface CsvRowData {
  /**
   * Translates the data in this account transaction to fit into
   * a normalized account transaction.
   */
  toTransaction(): Transaction
}