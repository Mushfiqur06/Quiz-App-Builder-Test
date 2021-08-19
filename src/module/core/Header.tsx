import React from "react";
import { FiUser } from "react-icons/fi";
import { MdKeyboardArrowDown } from "react-icons/md";
import { useHistory } from "react-router-dom";
import { logout, userInLoggedIn } from "../../utils/authentication";
import "styled-components/macro";
import { CustomPopover } from "../common/Popover";

export default function Header() {
  const history = useHistory();

  const _logout = () => {
    const res = logout();
    if (res) {
      history.push("/");
    }
  };

  return (
    <>
      <div className='container h-12 mx-auto flex justify-between items-center'>
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
              <CustomPopover
                placement='bottom-start'
                renderReference={(ref, toggle) => {
                  return (
                    <button
                      ref={ref}
                      onClick={() => {
                        toggle();
                      }}
                      className='flex items-center text-gray-800'
                    >
                      <span className='mr-2'>Niloy</span>{" "}
                      <MdKeyboardArrowDown size={20} />
                    </button>
                  );
                }}
                renderPopover={(toggle) => {
                  return (
                    <div
                      className='border rounded shadow-lg '
                      css={`
                        z-index: 100;
                        background: rgb(255, 255, 255) none repeat scroll 0% 0%;
                        box-sizing: border-box;
                        overflow: auto;
                        min-width: 184px;
                        top: 15px !important;
                      `}
                    >
                      <ul className='w-full'>
                        <li
                          onClick={() => history.push("/dashboard")}
                          className='w-full px-4 py-2 cursor-pointer hover:bg-gray-100'
                        >
                          {"Dashboard"}
                        </li>
                        <li
                          onClick={() => {
                            _logout();
                            toggle();
                          }}
                          className='w-full px-4 py-2 cursor-pointer hover:bg-gray-100'
                        >
                          {"Logout"}
                        </li>
                      </ul>
                    </div>
                  );
                }}
              />
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
