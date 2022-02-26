import React from "react";
import { useDispatch } from "react-redux";
// import { useHistory } from "react-router";
import { useForm } from "../../../hooks/useForm";
import { startLogin } from "../../../redux/actions/auth";
import { LoginIndex } from "./LoginIndex";
export const Login = () => {
  // const history = useHistory();
  const dispatch = useDispatch();
  const [formLoginValues, handleLoginInputChange] = useForm({
    email: "",
    password: "",
  });
  const { email, password } = formLoginValues;
  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(startLogin(email, password));
  };
  // const handleRegister = () => {
  //   history.push("/auth/register");
  // };
  return (
    <LoginIndex
      email={email}
      handleLogin={handleLogin}
      handleLoginInputChange={handleLoginInputChange}
    />
  );
};
