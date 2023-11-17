import {NormalizedTransaction} from "@/lib/NormalizedTransaction";

/**
 * A single transaction for a specific account.
 */
export interface Transaction {
  /**
   * Translates the data in this account transaction to fit into
   * a normalized account transaction.
   */
  toNormalizedTransaction(): NormalizedTransaction
}