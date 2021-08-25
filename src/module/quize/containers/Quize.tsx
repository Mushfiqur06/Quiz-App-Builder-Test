import React from "react";
import { useParams } from "react-router-dom";
import { IQuizes } from "../../dashboard/constants/interface";
import "styled-components/macro";
import { isArrayAndNotEmpty } from "../../common/validation";
import { BiMessageDetail } from "react-icons/bi";
import Layout from "../../common/Layout";
import { useLocalStorage } from "react-use";
import "styled-components/macro";

export default function QuizeDetails() {
  const [categories]: any = useLocalStorage("categories");
  const { id }: any = useParams();
  const [quize, setQuize] = React.useState<IQuizes | any>({});

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
          <h2
            className='font-bold'
            css={`
              font-size: 40px;
            `}
          >
            Quize Category: {quize?.name}
          </h2>
          <div
            css={`
              margin-top: 40px;
            `}
          >
            {isArrayAndNotEmpty(quize?.quizes) ? (
              quize?.quizes.map((value: any, index: number) => (
                <div className='p-8 shadow rounded mb-6' key={index}>
                  <h3 className='text-xl font-medium mb-2'>
                    Q: {value?.question}
                  </h3>
                  <div className='pl-6'>
                    {value?.answer.map((val: any, index: number) => (
                      <div key={index} className='mt-1 text-base'>
                        <div className='flex'>
                          <div className='font-medium mr-2'>{index + 1}:</div>
                          <div>{val}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className='flex items-center justify-center w-full h-full'>
                <div
                  className='flex flex-col items-center justify-center bg-gray-100'
                  css={`
                    width: 300px;
                    height: 300px;
                  `}
                >
                  <span className='p-4 bg-gray-200 inline-block rounded-full mb-4'>
                    <BiMessageDetail size='30' color='#c2c2c2' />
                  </span>
                  <p className='font-semibold leading-relaxed text-gray-700'>
                    No Category Found
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
