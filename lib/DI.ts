import DataStore from "@/lib/store/DataStore";
import {TestDataStore} from "@/lib/store/TestDataStore";

export class DI {

  static dataStore: DataStore = new TestDataStore()

}