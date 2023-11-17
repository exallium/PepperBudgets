import DataStore from "@/lib/DataStore";
import {NormalizedTransaction} from "@/lib/NormalizedTransaction";

export class TestDataStore implements DataStore {
  writeTransactions(normalizedTransactions: NormalizedTransaction[]): void {
    normalizedTransactions.forEach(item => {
      console.log(item)
    })
  }
}