import React from "react";
import { BiEdit, BiMessageDetail } from "react-icons/bi";
import { BsPlusSquare } from "react-icons/bs";
import { RiDeleteBinFill } from "react-icons/ri";
import Layout from "../../common/Layout";
import { isArrayAndNotEmpty } from "../../common/validation";
import { IQuizes } from "../constants/interface";
import { useHistory } from "react-router-dom";
import "styled-components/macro";
import { Modal } from "../../common/Modal";
import CreateQuizeCategory from "../components/CreateQuizeCategory";
import { useLocalStorage } from "react-use";
import "styled-components/macro";
import EditQuizCategory from "../components/EditQuizCategory";

export default function Dashboard() {
  const [categories, setCategories]: any = useLocalStorage("categories", []);
  const history = useHistory();
  const [createQuizeCategory, setCreateQuizeCategory] = React.useState<boolean>(
    false
  );
  const [updateQuizeCategory, setUpdateQuizeCategory] = React.useState<boolean>(
    false
  );
  const [quizCategories, setQuizCategories]: any = React.useState([]);
  const [isCategoryRemove, setIsCategoryRemove] = React.useState<boolean>(
    false
  );
  const [categoryID, setCategoryID] = React.useState<number | null>(null);

  React.useEffect(() => {
    setQuizCategories(categories);
  }, [categories]);

  const updateQuizCategory = (category: any, editCat = false) => {
    if (editCat) {
      const findIndex = quizCategories.findIndex(
        (cat: any) => cat.id === category.id
      );

      quizCategories[findIndex] = {
        ...category,
      };

      setQuizCategories([...quizCategories]);
    } else {
      const updateCats = [...quizCategories, category];
      setQuizCategories(updateCats);
    }
  };

  const handleCategoryRemoveOpen = (id: number, isRemove: boolean) => {
    setIsCategoryRemove(isRemove);
    setCategoryID(id);
  };
  const handleCategoryRemoveClose = () => {
    setIsCategoryRemove(false);
    setCategoryID(null);
  };

  const handleCategoryRemove = () => {
    const index = quizCategories.findIndex(
      (item: IQuizes) => item.id === categoryID
    );
    if (index > -1) {
      quizCategories.splice(index, 1);
    }
    setCategories(quizCategories);
    setIsCategoryRemove(false);
  };

  const handleUpdateCategoryOpen = (id: number, isRemove: boolean) => {
    setUpdateQuizeCategory(isRemove);
    setCategoryID(id);
  };
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

            <div>
              {isArrayAndNotEmpty(quizCategories) ? (
                <div className='grid grid-flow-row auto-rows-max grid-cols-3 gap-8'>
                  {quizCategories.map((value: IQuizes, index: number) => (
                    <div
                      key={index}
                      className='relative shadow px-6 py-6 rounded hover:bg-blue-600 hover:text-white transition duration-300 ease-in-out'
                    >
                      <div className='absolute right-5 top-3'>
                        <div
                          className='cursor-pointer mb-2'
                          onClick={() =>
                            handleCategoryRemoveOpen(value?.id, true)
                          }
                        >
                          <RiDeleteBinFill size={20} />
                        </div>
                        <div
                          className='cursor-pointer'
                          onClick={() =>
                            handleUpdateCategoryOpen(value?.id, true)
                          }
                        >
                          <BiEdit size={20} />
                        </div>
                      </div>

                      <h2
                        onClick={() => history.push(`/dashboard/${value?.id}`)}
                        className='font-medium text-2xl cursor-pointer'
                      >
                        {value?.name}
                      </h2>
                    </div>
                  ))}
                </div>
              ) : (
                <div className='flex items-center justify-center w-full h-full'>
                  <div
                    className='flex flex-col items-center justify-center bg-gray-100 rounded'
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
              updateQuizCategory={updateQuizCategory}
              close={() => {
                setCreateQuizeCategory(false);
              }}
            />
          );
        }}
      />
      <Modal
        modalContentWidth={"26%"}
        isActive={isCategoryRemove}
        close={() => {
          setIsCategoryRemove(false);
        }}
        header={false}
        renderBody={() => {
          return (
            <div>
              <h2 className='text-xl'>Are you sure you want to remove this?</h2>
              <div className='flex items-center justify-center mt-2'>
                <button
                  onClick={() => handleCategoryRemoveClose()}
                  className='bg-red-500 text-white py-2 px-4 rounded mr-2'
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleCategoryRemove()}
                  className='bg-green-500 text-white py-2 px-4 rounded'
                >
                  Delete
                </button>
              </div>
            </div>
          );
        }}
      />
      <Modal
        modalContentWidth={"30%"}
        isActive={updateQuizeCategory}
        close={() => {
          setUpdateQuizeCategory(false);
        }}
        header={() => "Update Quize Category"}
        renderBody={() => {
          return (
            <EditQuizCategory
              updateQuizCategory={updateQuizCategory}
              close={() => {
                setUpdateQuizeCategory(false);
              }}
              categoryID={categoryID}
            />
          );
        }}
      />
    </>
  );
}
