import React from "react";
import { useHistory } from "react-router-dom";
import { loginAction } from "../../../request/auth";

export default function Login() {
  const history = useHistory();
  const [name, setName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const login = (e: any) => {
    e.preventDefault();
    loginAction(name, password)
      .then(() => {
        history.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className='login'>
        <div className='login_container'>
          <form>
            <div className='login_container_input'>
              <span>User Name</span>
              <input
                type='text'
                name='name'
                placeholder='Name'
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className='login_container_input'>
              <span>Password</span>
              <input
                type='password'
                name='password'
                placeholder='Password'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button type='submit' onClick={login}>
              Login
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
