import DataStore from "@/lib/store/DataStore";
import {Transaction} from "@prisma/client";

class PrismaDataStore implements DataStore {
  writeTransactions(transactions: Transaction[]): void {
    // Write each to the database
  }
}