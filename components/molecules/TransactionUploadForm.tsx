'use client'

import React, {useEffect, useState} from "react";
import InlineFormItem from "@/components/atoms/InlineFormItem";
import InlineFormLabel from "@/components/atoms/InlineFormLabel";
import InlineFormInput from "@/components/atoms/InlineFormInput";
import InlineFormSelect from "@/components/atoms/InlineFormSelect";

const TransactionUploadForm: React.FC = () => {
  const [accounts, setAccounts] = useState<{
    id: number,
    title: string
  }[]>()

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/accounts')
      const accounts = await res.json()

      setAccounts(accounts)
    }

    fetchData()
      .catch(console.error)
  }, [])

  if (!accounts) {
    return <p>Loading...</p>
  }

  const options = accounts.map(account => ({
    value: account.id,
    label: account.title
  }))

 return (
   <div className="w-full max-w-sm">
    <InlineFormItem>
        <>
          <InlineFormLabel htmlFor="account">Account</InlineFormLabel>
          <InlineFormSelect id="account" name="accountId" options={options} />
        </>
      </InlineFormItem>
      <InlineFormItem>
        <>
          <InlineFormLabel htmlFor="csv">CSV</InlineFormLabel>
          <InlineFormInput id="csv" name="csv" defaultValue='' type='file' />
        </>
      </InlineFormItem>
   </div>
 )
}

export default TransactionUploadForm