/**
 * The supported types of account. Each should have a concrete
 * subclass of account tied to it.
 */
export enum AccountType {
  TD_CANADA_TRUST = 'td_canada_trust',
  BRIM_FINANCIAL = 'brim_financial',
  AMERICAN_EXPRESS_CANADA = 'american_express_canada'
}