import {PrismaDataStore} from "@/lib/store/PrismaDataStore";

export class DI {

  static dataStore: PrismaDataStore = new PrismaDataStore()

}