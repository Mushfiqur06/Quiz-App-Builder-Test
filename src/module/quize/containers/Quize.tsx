import { Form, Formik } from "formik";
import React from "react";
import { BiMessageDetail } from "react-icons/bi";
import { BsPlusSquare } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useLocalStorage } from "react-use";
import { Button } from "../../common/Button";
import Layout from "../../common/Layout";
import { Modal } from "../../common/Modal";
import { isArrayAndNotEmpty } from "../../common/validation";
import { IQuizes } from "../../dashboard/constants/interface";
import "styled-components/macro";

interface Quize {
  id: number;
  question: string;
  answer: any[];
  rightAnswer: string;
}

export default function QuizeDetails() {
  let [categories]: any = useLocalStorage("categories");
  const { id }: any = useParams();
  const [quize, setQuize]: any = React.useState<IQuizes | any>({});
  const [quizAns, setQuizAns]: any = React.useState([]);
  const [correctAns, setCorrectAns]: any = React.useState(0);
  const [wrongAns, setWrongAns]: any = React.useState(0);
  const [isOpenAnsModal, setIsOpenAnsModal] = React.useState<boolean>(false);

  React.useEffect(() => {
    const index = categories.findIndex(
      (item: IQuizes) => item.id === Number(id)
    );
    setQuize(categories[index]);
  }, [id]);

  return (
    <Layout>
      <div
        css={`
          height: calc(100vh - 115px);
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
                        result: "Correct Ans",
                      });
                      countOfCorrectAns++;
                    } else {
                      correctAnswer.push({
                        question: quize.quizes[Number(quizeNumber[1])].question,
                        result: "Wrong Ans",
                      });
                      countOfWrongAns++;
                    }
                  }
                });

                setCorrectAns(countOfCorrectAns);
                setWrongAns(countOfWrongAns);
                setQuizAns(correctAnswer);
                setIsOpenAnsModal(true);
              }}
            >
              {(formikBag) => (
                <Form>
                  <div>
                    {isArrayAndNotEmpty(quize?.quizes) ? (
                      quize?.quizes.map(
                        (value: Quize, indexQuestion: number) => (
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
                        )
                      )
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
                    {quizAns.length > 0 && isOpenAnsModal ? (
                      <Modal
                        modalContentWidth={"30%"}
                        isActive={isOpenAnsModal}
                        close={() => {
                          setIsOpenAnsModal(false);
                        }}
                        header={() => "Your Quiz Ans & Score"}
                        renderBody={() => {
                          return (
                            <div>
                              {quizAns.map((ans: any, index: number) => (
                                <div
                                  className='flex shadow rounded px-2 py-3 mb-2'
                                  key={index}
                                >
                                  {ans?.question}:{" "}
                                  <p
                                    className={`ml-2 ${
                                      ans?.result === "Correct Ans"
                                        ? "text-green-500"
                                        : "text-red-500"
                                    } font-semibold`}
                                  >
                                    {ans.result}
                                  </p>
                                </div>
                              ))}
                              <h5>Correct Ans: {correctAns}</h5>
                              <h5>Wrong Ans: {wrongAns}</h5>
                            </div>
                          );
                        }}
                      />
                    ) : null}
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </Layout>
  );
}
