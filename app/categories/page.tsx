import {DI} from "@/lib/DI";

export default async function CategoriesPage() {
  const categories = await DI.dataStore.getAllCategories()

  if (categories.length == 0) {
    return <p>No categories!</p>
  }

  return <div>
    {
      categories.map(a => (<p key={a.id}>{a.title}</p>))
    }
  </div>
}