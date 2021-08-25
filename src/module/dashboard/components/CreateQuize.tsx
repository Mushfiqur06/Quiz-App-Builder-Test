import "styled-components/macro";
import React from "react";
import { useParams } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "../../common/Button";
import { rendomID } from "../../common/validation";
import { quizeData } from "../../../data";
import { IQuizes } from "../constants/interface";
import { useLocalStorage } from "react-use";

export default function CreateQuize({
  close,
  updateQuiz,
}: {
  close: () => void;
  updateQuiz: any;
}) {
  const { id }: any = useParams();
  const [categories, setCategories]: any = useLocalStorage("categories");

  const initialValues = {
    question: "",
    answerOne: "",
    answerTwo: "",
    answerThree: "",
    answerFour: "",
    rightAnswer: "",
  };

  return (
    <>
      <div>
        <Formik
          initialValues={initialValues}
          onSubmit={(values) => {
            const reqBody: any = {
              id: rendomID(),
              question: values.question,
              answer: [
                values.answerOne,
                values.answerTwo,
                values.answerThree,
                values.answerFour,
              ],
              rightAnswer: "",
            };

            const foundIndex = categories.findIndex(
              (category: any) => category.id === Number(id)
            );

            // Update Quiz
            categories[foundIndex].quizes.push(reqBody);
            setCategories(categories);

            // Update quiz state
            updateQuiz(reqBody);

            close();
          }}
          validate={(values) => {
            const errors: any = {};
            if (!values.question) {
              errors.question = "Question is Required";
            }
            if (!values.answerOne) {
              errors.answerOne = "Answer is Required";
            }
            if (!values.answerTwo) {
              errors.answerTwo = "Answer is Required";
            }
            if (!values.answerThree) {
              errors.answerThree = "Answer is Required";
            }
            if (!values.answerFour) {
              errors.answerFour = "Answer is Required";
            }
            if (!values.rightAnswer) {
              errors.rightAnswer = "Right Answer is Required";
            }
            return errors;
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <div>
                <div className='mb-2'>
                  <label>
                    <span>Question</span>
                    <Field
                      name='question'
                      className='form-input p-2 rounded bg-gray-200 w-full outline-none '
                      placeholder='Question'
                    />
                  </label>
                  <ErrorMessage
                    name='question'
                    component='p'
                    className='text-xs text-red-500'
                  />
                </div>
                <div className='mb-2'>
                  <label>
                    <span>Answer 1</span>
                    <Field
                      name='answerOne'
                      className='form-input p-2 rounded bg-gray-200 w-full outline-none '
                      placeholder='Answer 1'
                    />
                  </label>
                  <ErrorMessage
                    name='answerOne'
                    component='p'
                    className='text-xs text-red-500'
                  />
                </div>
                <div className='mb-2'>
                  <label>
                    <span>Answer 2</span>
                    <Field
                      name='answerTwo'
                      className='form-input p-2 rounded bg-gray-200 w-full outline-none '
                      placeholder='Answer 2'
                    />
                  </label>
                  <ErrorMessage
                    name='answerTwo'
                    component='p'
                    className='text-xs text-red-500'
                  />
                </div>
                <div className='mb-2'>
                  <label>
                    <span>Answer 3</span>
                    <Field
                      name='answerThree'
                      className='form-input p-2 rounded bg-gray-200 w-full outline-none '
                      placeholder='Answer 3'
                    />
                  </label>
                  <ErrorMessage
                    name='answerThree'
                    component='p'
                    className='text-xs text-red-500'
                  />
                </div>
                <div className='mb-2'>
                  <label>
                    <span>Answer 4</span>
                    <Field
                      name='answerFour'
                      className='form-input p-2 rounded bg-gray-200 w-full outline-none '
                      placeholder='Answer 4'
                    />
                  </label>
                  <ErrorMessage
                    name='answerFour'
                    component='p'
                    className='text-xs text-red-500'
                  />
                </div>
                <div className='mb-2'>
                  <label>
                    <span>Right Answer</span>
                    <Field
                      name='rightAnswer'
                      className='form-input p-2 rounded bg-gray-200 w-full outline-none '
                      placeholder='Right Answer'
                    />
                  </label>
                  <ErrorMessage
                    name='rightAnswer'
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
