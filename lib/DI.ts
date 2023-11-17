import DataStore from "@/lib/DataStore";
import {TestDataStore} from "@/lib/TestDataStore";

export class DI {

  static dataStore: DataStore = new TestDataStore()

}