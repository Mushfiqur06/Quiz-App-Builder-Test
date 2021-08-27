import { ErrorMessage, Field, Form, Formik } from "formik";
import React from "react";
import { useLocalStorage } from "react-use";
import { Button } from "../../common/Button";
import { IQuizes } from "../constants/interface";

export default function EditQuizCategory({
  close,
  updateQuizCategory,
  categoryID,
}: {
  close: () => void;
  updateQuizCategory: any;
  categoryID: number | null;
}) {
  const [categories, setCategories]: any = useLocalStorage("categories", []);
  const [category, setCategory] = React.useState<IQuizes | null>(null);

  React.useEffect(() => {
    const index = categories.findIndex(
      (item: IQuizes) => item.id === categoryID
    );
    setCategory(categories[index]);
  }, [categoryID]);

  return (
    <>
      <div>
        <Formik
          enableReinitialize
          initialValues={{
            name: category?.name ? category?.name : "",
            category: category?.category ? category?.category : "",
            author: category?.author ? category?.author : "",
            quizes: [],
          }}
          onSubmit={(values: any) => {
            // Finding Category Index
            const index = categories.findIndex(
              (item: IQuizes) => item.id === categoryID
            );
            // Existing categories
            let existingCategories = categories ? categories : [];
            existingCategories[index] = {
              id: category?.id,
              name: values.name,
              category: values.category,
              author: values.author,
              quizes: [...existingCategories[index].quizes],
            };

            // Update or new local storage
            setCategories(existingCategories);

            // Update state
            updateQuizCategory(
              {
                id: category?.id,
                name: values.name,
                category: values.category,
                author: values.author,
                quizes: [...existingCategories[index].quizes],
              },
              true
            );

            // Add quiz to local storage
            close();
          }}
          validate={(values: any) => {
            const errors: any = {};
            if (!values.name) {
              errors.name = "Category Name is Required";
            }
            if (!values.category) {
              errors.category = "Category is Required";
            }
            if (!values.author) {
              errors.author = "Author is Required";
            }

            return errors;
          }}
        >
          {(formikBag) => (
            <Form>
              <div className=''>
                <div className='mb-2'>
                  <label>
                    <span>Category name</span>
                    <Field
                      name='name'
                      className='form-input p-2 rounded bg-gray-200 w-full outline-none '
                      placeholder='Category name'
                    />
                  </label>
                  <ErrorMessage
                    name='name'
                    component='p'
                    className='text-xs text-red-500'
                  />
                </div>

                <div className='mb-2'>
                  <label>
                    <span>Category</span>
                    <Field
                      name='category'
                      className='form-input p-2 rounded bg-gray-200 w-full outline-none '
                      placeholder='Category'
                    />
                  </label>
                  <ErrorMessage
                    name='category'
                    component='p'
                    className='text-xs text-red-500'
                  />
                </div>
                <div className='mb-2'>
                  <label>
                    <span>Author</span>
                    <Field
                      name='author'
                      className='form-input p-2 rounded bg-gray-200 w-full outline-none '
                      placeholder='Author'
                    />
                  </label>
                  <ErrorMessage
                    name='author'
                    component='p'
                    className='text-xs text-red-500'
                  />
                </div>
              </div>

              <div className='mt-4 flex justify-end'>
                <Button primary block isLoading={formikBag.isSubmitting}>
                  Update
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
