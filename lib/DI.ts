import {PrismaDataStore} from "@/lib/store/PrismaDataStore";

export class DI {

  static dataStore: PrismaDataStore = new PrismaDataStore()
  static currencyFormatter: Intl.NumberFormat = Intl.NumberFormat('en-CA', {
    style: 'currency',
    currency: 'CAD'
  })

}