import {DI} from "@/lib/DI";

export default async function AccountsPage() {
  const accounts = await DI.dataStore.getAllAccounts()

  if (accounts.length == 0) {
    return <p>No Accounts!</p>
  }

  return (
    <div>
      {
        accounts.map(a => (<p key={a.id}>{a.title}</p>))
      }
    </div>
  )
}