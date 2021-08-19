import React from "react";
import "styled-components/macro";
import { quizeData } from "../../../data";
import { isArrayAndNotEmpty } from "../../common/validation";
import { BiMessageDetail } from "react-icons/bi";
import { useHistory } from "react-router-dom";
import { IQuizes } from "../constants/interface";
export default function QuizeCategory() {
  const history = useHistory();
  return (
    <>
      <div
        className=''
        css={`
          padding: 70px 0;
        `}
      >
        <div className='container mx-auto'>
          <h2 className='text-blue-600 font-bold text-4xl text-center mb-8'>
            Quize Category
          </h2>
          <div className='grid grid-flow-row auto-rows-max grid-cols-3 gap-8'>
            {isArrayAndNotEmpty(quizeData) ? (
              quizeData.map((value: IQuizes, index: number) => (
                <div
                  key={index}
                  onClick={() => history.push(`/quizes/${value?.id}`)}
                  className='shadow px-6 py-6 rounded cursor-pointer hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out'
                >
                  <h2 className='font-medium text-2xl'>{value?.name}</h2>
                </div>
              ))
            ) : (
              <div className='flex flex-col items-center justify-center p-4 pt-8 md:py-16 h-full'>
                <span className='p-4 bg-gray-200 inline-block rounded-full mb-4'>
                  <BiMessageDetail size='30' color='#c2c2c2' />
                </span>
                <p className='font-semibold leading-relaxed text-gray-700'>
                  No Category Found
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
