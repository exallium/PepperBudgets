import {NormalizedTransaction} from "@/lib/NormalizedTransaction";

export default interface DataStore {
  writeTransactions(normalizedTransactions: NormalizedTransaction[]): void
}