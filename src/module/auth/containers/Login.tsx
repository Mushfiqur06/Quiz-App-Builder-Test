import React from "react";
import { useHistory } from "react-router-dom";
import { loginAction } from "../../../request/auth";
import "styled-components/macro";
import { AiOutlineUser } from "react-icons/ai";
import { MdLockOutline } from "react-icons/md";
import { Button } from "../../common/Button";

export default function Login() {
  const history = useHistory();
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [isPhoneNumberRequired, setPhoneNumberValidation] = React.useState(
    false
  );
  const [isPasswordRequired, setPasswordValidation] = React.useState(false);
  const [isSubmiting, setSubmit] = React.useState(false);

  const login = (e: any) => {
    e.preventDefault();
    if (_loginFormIsValidate(name, password)) {
      setSubmit(true);
      loginAction(name, password)
        .then(() => {
          setSubmit(false);
          history.push("/dashboard");
        })
        .catch((err) => {
          setSubmit(false);
          console.log(err);
        });
    }
  };
  const _loginFormIsValidate = (name: any, password: any) => {
    let isValid = true;
    if (name.length < 1) {
      setPhoneNumberValidation(true);
      isValid = isValid === true ? false : isValid;
    }
    if (password.length < 1) {
      setPasswordValidation(true);
      isValid = isValid === true ? false : isValid;
    }
    return isValid;
  };

  return (
    <>
      <div className='w-full'>
        <div
          className='flex items-center justify-center w-full h-screen'
          css={`
            background-color: #f2f5fa;
          `}
        >
          <form
            className='px-12 py-6 bg-white es-6 rounded shadow-md flex items-center'
            css={`
              width: 460px;
              height: 650px;
            `}
          >
            <div className='w-full'>
              <div className='text-center mb-6'>
                <h2
                  className='text-center'
                  css={`
                    font-size: 24px;
                  `}
                >
                  Login to <br /> <b className='font-bold'>Quize App Builder</b>
                </h2>
              </div>
              <label className='w-full'>
                <span className='text-black'>Username</span>
                <div className='relative'>
                  <input
                    className='w-full px-4 py-3 mt-1 mb-2 text-black border border-transparent rounded focus:text-red-600 focus:border-red-500 focus:bg-transparent'
                    css={`
                      background: #f2f5fa;
                      padding-left: 45px;
                      font-size: 16px;
                      &:focus {
                        + div {
                          color: red;
                        }
                      }
                    `}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder='Username'
                  />
                  {isPhoneNumberRequired ? (
                    <small className='text-red-600'>User name required</small>
                  ) : null}
                  <div
                    className='absolute'
                    css={`
                      padding-left: 15px;
                      top: 18px;
                    `}
                  >
                    <AiOutlineUser size={20} />
                  </div>
                </div>
              </label>
              <label className='block w-full mt-2 mb-6'>
                <span className='text-black'>Password</span>
                <div className='relative'>
                  <input
                    type='password'
                    className='w-full px-4 py-3 mt-1 mb-2 text-black border border-transparent rounded focus:text-red-600 focus:border-red-500 focus:bg-transparent'
                    css={`
                      background: #f2f5fa;
                      padding-left: 45px;
                      font-size: 16px;
                      &:focus {
                        + div {
                          color: red;
                        }
                      }
                    `}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder='Password'
                  />
                  <div
                    className='absolute'
                    css={`
                      padding-left: 15px;
                      top: 18px;
                    `}
                  >
                    <MdLockOutline size={20} />
                  </div>
                  {isPasswordRequired ? (
                    <small className='text-red-600'>Password required</small>
                  ) : null}
                </div>
              </label>
              <div className='flex items-center justify-center'>
                <Button
                  primary
                  style={{
                    width: "100%",
                    boxShadow: "0px 0px 4px rgba(0, 0, 0, 0.1",
                    backgroundColor: "black",
                    fontSize: "18px",
                  }}
                  disabled={isSubmiting}
                  isLoading={isSubmiting}
                  onClick={login}
                >
                  Log In
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
