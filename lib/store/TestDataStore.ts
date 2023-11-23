import DataStore from "@/lib/store/DataStore";
import {Transaction} from "@prisma/client";

export class TestDataStore implements DataStore {
  writeTransactions(transactions: Transaction[]): void {
    transactions.forEach(item => {
      console.log(item)
    })
  }
}