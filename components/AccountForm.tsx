import InlineFormItem from "@/components/InlineFormItem";
import InlineFormInput from "@/components/InlineFormInput";
import InlineFormLabel from "@/components/InlineFormLabel";

const AccountForm = () => {
  return (
    <div className="w-full max-w-sm">
      <InlineFormItem>
        <>
          <InlineFormLabel htmlFor="account-name">Account Name</InlineFormLabel>
          <InlineFormInput id="account-name" name="title" defaultValue='' />
        </>
      </InlineFormItem>
      <InlineFormItem>
        <>
          <InlineFormLabel htmlFor="description-field">Description Field</InlineFormLabel>
          <InlineFormInput id="description-field" name="description-field" defaultValue='' />
        </>
      </InlineFormItem>
      <InlineFormItem>
        <>
          <InlineFormLabel htmlFor="date-field">Date Field</InlineFormLabel>
          <InlineFormInput id="date-field" name="date-field" defaultValue='' />
        </>
      </InlineFormItem>
      <InlineFormItem>
        <>
          <InlineFormLabel htmlFor="amount-field">Amount Field</InlineFormLabel>
          <InlineFormInput id="amount-field" name="amount-field" defaultValue='' />
        </>
      </InlineFormItem>
    </div>
  )
}

export default AccountForm