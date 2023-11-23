import {Transaction} from "@prisma/client";

export default interface DataStore {
  writeTransactions(transactions: Transaction[]): void
}