import React from "react";
import { useParams } from "react-router-dom";
import { IQuizes } from "../../dashboard/constants/interface";
import "styled-components/macro";
import { isArrayAndNotEmpty } from "../../common/validation";
import { BiMessageDetail } from "react-icons/bi";
import Layout from "../../common/Layout";
import { BsPlusSquare } from "react-icons/bs";
import { Modal } from "../../common/Modal";
import CreateQuize from "./CreateQuize";
import { useLocalStorage } from "react-use";
import { Form, Formik } from "formik";
import { Button } from "../../common/Button";

export default function DashboardQuizeDetails() {
  let [categories]: any = useLocalStorage("categories");
  const { id }: any = useParams();
  const [quize, setQuize]: any = React.useState<IQuizes | any>({});
  const [createQuize, setCreateQuize] = React.useState<boolean>(false);
  const [quizAns, setQuizAns]: any = React.useState([]);
  const [correctAns, setCorrectAns]: any = React.useState(0);
  const [wrongAns, setWrongAns]: any = React.useState(0);

  React.useEffect(() => {
    const index = categories.findIndex(
      (item: IQuizes) => item.id === Number(id)
    );
    setQuize(categories[index]);
  }, [id]);

  /**
   * Method for update quiz
   *
   * @param newQuiz
   */
  function updateQuiz(newQuiz: any) {
    setQuize({
      ...quize,
      quizes: [...quize.quizes, newQuiz],
    });
  }

  return (
    <Layout>
      <div
        css={`
          padding: 70px 0;
        `}
      >
        <div
          className=''
          css={`
            width: 1000px;
            margin: 0 auto;
          `}
        >
          <div className='flex justify-between'>
            <div>
              <h2
                className='font-bold'
                css={`
                  font-size: 40px;
                `}
              >
                Quize Category: {quize?.name}
              </h2>
            </div>
            <div>
              <button
                className='bg-blue-500 text-white px-4 py-2 rounded flex items-center'
                onClick={() => setCreateQuize(true)}
              >
                <BsPlusSquare className='mr-1' />
                Add Quize
              </button>
            </div>
          </div>

          <div
            css={`
              margin-top: 40px;
            `}
          >
            <Formik
              initialValues={{
                answer: "",
              }}
              onSubmit={(values: any) => {
                const keys = Object.keys(values);

                const correctAnswer: any = [];
                let countOfCorrectAns = 0;
                let countOfWrongAns = 0;

                keys.map((key) => {
                  let quizeNumber = key.split("-");
                  if (quizeNumber.length === 2) {
                    const actualAns =
                      quize.quizes[Number(quizeNumber[1])].rightAnswer;
                    if (actualAns === values[`quiz-${quizeNumber[1]}`]) {
                      correctAnswer.push({
                        question: quize.quizes[Number(quizeNumber[1])].question,
                        result: "Correct",
                      });
                      countOfCorrectAns++;
                    } else {
                      correctAnswer.push({
                        question: quize.quizes[Number(quizeNumber[1])].question,
                        result: "Wrong",
                      });
                      countOfWrongAns++;
                    }
                  }
                });

                setCorrectAns(countOfCorrectAns);
                setWrongAns(countOfWrongAns);
                setQuizAns(correctAnswer);
              }}
            >
              {(formikBag) => (
                <Form>
                  <div>
                    {isArrayAndNotEmpty(quize?.quizes) ? (
                      quize?.quizes.map((value: any, indexQuestion: number) => (
                        <div
                          className='p-8 shadow rounded mb-6'
                          key={indexQuestion}
                        >
                          <h3 className='text-xl font-medium mb-2'>
                            Q: {value?.question}
                          </h3>
                          <div className='pl-6'>
                            {value?.answer.map((val: any, index: number) => (
                              <div className='form-check' key={index}>
                                <input
                                  type='radio'
                                  id={val}
                                  className='form-check-input mr-1'
                                  name={`quiz-${indexQuestion}`}
                                  value={val}
                                  onChange={formikBag.handleChange}
                                  onBlur={formikBag.handleBlur}
                                />
                                <label
                                  className='form-check-label clickable'
                                  htmlFor={val}
                                >
                                  <span className='mr-2'>{val}</span>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className='flex flex-col items-center justify-center p-4 pt-8 md:py-16 h-full'>
                        <span className='p-4 bg-gray-200 inline-block rounded-full mb-4'>
                          <BiMessageDetail size='30' color='#c2c2c2' />
                        </span>
                        <p className='font-semibold leading-relaxed text-gray-700'>
                          No Quize Found
                        </p>
                      </div>
                    )}

                    <div className='mt-4 flex justify-end'>
                      <Button primary small>
                        Submit
                      </Button>
                    </div>

                    {quizAns.length > 0 && (
                      <div>
                        {quizAns.map((ans: any) => (
                          <p key={ans.question}>
                            {ans.question}: {ans.result}
                          </p>
                        ))}
                        <h5>Correct Ans: {correctAns}</h5>
                        <h5>Wrong Ans: {wrongAns}</h5>
                      </div>
                    )}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
      <Modal
        modalContentWidth={"30%"}
        isActive={createQuize}
        close={() => {
          setCreateQuize(false);
        }}
        header={() => "Create Quize"}
        renderBody={() => {
          return (
            <CreateQuize
              updateQuiz={updateQuiz}
              close={() => {
                setCreateQuize(false);
              }}
            />
          );
        }}
      />
    </Layout>
  );
}