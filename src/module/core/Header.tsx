import React from "react";
import { FiUser } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { userInLoggedIn } from "../../utils/authentication";
import "styled-components/macro";

export default function Header() {
  const history = useHistory();
  return (
    <>
      <div className='container h-12 mx-auto flex justify-between'>
        <div>
          <h2
            onClick={() => history.push("/")}
            className='text-red-600 text-2xl font-bold cursor-pointer'
          >
            Quize App
          </h2>
        </div>
        <div>
          {userInLoggedIn() ? (
            <div className='flex cursor-pointer'>
              <div className='bg-gray-200 px-2 py-2 rounded-full mr-2'>
                <FiUser />
              </div>
              <div>Niloy</div>
              <div className='ml-1'>
                <MdKeyboardArrowDown />
              </div>
            </div>
          ) : (
            <div
              className='cursor-pointer'
              onClick={() => history.push("/auth/login")}
            >
              Login
            </div>
          )}
        </div>
      </div>
    </>
  );
}
