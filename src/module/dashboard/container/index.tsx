import React from "react";
import { BiMessageDetail } from "react-icons/bi";
import { BsPlusSquare } from "react-icons/bs";
import { quizeData } from "../../../data";
import Layout from "../../common/Layout";
import { isArrayAndNotEmpty } from "../../common/validation";
import { IQuizes } from "../constants/interface";
import { useHistory } from "react-router-dom";
import "styled-components/macro";
import { Modal } from "../../common/Modal";
import CreateQuizeCategory from "../components/CreateQuizeCategory";

export default function Dashboard() {
  const history = useHistory();
  const [createQuizeCategory, setCreateQuizeCategory] = React.useState<boolean>(
    false
  );
  return (
    <>
      <Layout>
        <div
          className='h-screen'
          css={`
            padding: 70px 0;
          `}
        >
          <div className='container mx-auto'>
            <div className='flex items-center justify-between mb-8'>
              <div>
                <h2 className='text-blue-600 font-bold text-4xl'>
                  Quize Category
                </h2>
              </div>
              <div>
                <button
                  className='bg-blue-500 text-white px-4 py-2 rounded flex items-center'
                  onClick={() => setCreateQuizeCategory(true)}
                >
                  <BsPlusSquare className='mr-1' />
                  Add Quize Category
                </button>
              </div>
            </div>

            <div className='grid grid-flow-row auto-rows-max grid-cols-3 gap-8'>
              {isArrayAndNotEmpty(quizeData) ? (
                quizeData.map((value: IQuizes, index: number) => (
                  <div
                    key={index}
                    onClick={() => history.push(`/dashboard/${value?.id}`)}
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
      </Layout>
      <Modal
        modalContentWidth={"30%"}
        isActive={createQuizeCategory}
        close={() => {
          setCreateQuizeCategory(false);
        }}
        header={() => "Create Quize Category"}
        renderBody={() => {
          return (
            <CreateQuizeCategory
              close={() => {
                setCreateQuizeCategory(false);
              }}
            />
          );
        }}
      />
    </>
  );
}
