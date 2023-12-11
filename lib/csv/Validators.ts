export class Validators {
  static validateAccountFields(
    headers: FormDataEntryValue | null,
    descriptionField: FormDataEntryValue | null,
    dateField: FormDataEntryValue | null,
    amountField: FormDataEntryValue | null,
    incomeField: FormDataEntryValue | null
  ): string | null {
    const hasHeaders = headers !== null
    if (!hasHeaders) {
      if (isNaN(Number(descriptionField))) {
        return 'Expected index for description field'
      }

      if (isNaN(Number(dateField))) {
        return 'Expected index for date field'
      }

      if (isNaN(Number(amountField))) {
        return 'Expected index for date field'
      }

      if (incomeField && isNaN(Number(incomeField))) {
        return 'Expected index for income field'
      }
    }

    return null
  }
}