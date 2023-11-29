import InlineFormItem from "@/components/InlineFormItem";
import InlineFormInput from "@/components/InlineFormInput";
import InlineFormLabel from "@/components/InlineFormLabel";

const CategoryForm = () => {
  return (
    <div className="w-full max-w-sm">
      <InlineFormItem>
        <>
          <InlineFormLabel htmlFor="category-name">Category Name</InlineFormLabel>
          <InlineFormInput id="category-name" name="title" defaultValue='' />
        </>
      </InlineFormItem>
      <InlineFormItem>
        <>
          <InlineFormLabel htmlFor="budget">Budget</InlineFormLabel>
          <InlineFormInput id="budget" name="budget" defaultValue='' />
        </>
      </InlineFormItem>
    </div>
  )
}

export default CategoryForm