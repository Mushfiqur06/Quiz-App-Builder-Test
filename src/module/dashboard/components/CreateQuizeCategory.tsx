import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { quizeData } from "../../../data";
import { rendomID } from "../../common/validation";
import { Button } from "../../common/Button";

export default function CreateQuizeCategory({ close }: { close: () => void }) {
  const initialValues = {
    name: "",
    category: "",
    author: "",
  };
  return (
    <>
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={(values: any) => {
            const reqBody: any = {
              id: rendomID(),
              name: values.name,
              category: values.category,
              author: values.author,
              quizes: [],
            };
            quizeData.push(reqBody);
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
          {({ isSubmitting }) => (
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
                <Button primary block isLoading={isSubmitting}>
                  Submit
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
}
