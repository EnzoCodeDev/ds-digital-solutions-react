import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { useForm } from "../../../hooks/useForm";
import { StartRegister } from "../../../redux/actions/auth";
import Swal from "sweetalert2";
import { RegisterIndex } from "./RegisterIndex";
export const Register = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [formRegisterValues, handleRegisterInputChange] = useForm({
    name: "",
    lastName: "",
    email: "",
    password1: "",
    password2: "",
  });
  const { name, lastName, email, password1, password2 } = formRegisterValues;
  const handleRegister = (e) => {
    e.preventDefault();
    if (password1 !== password2) {
      return Swal.fire(
        "Error",
        "Las contraseñas deben de ser iguales",
        "error"
      );
    }
    dispatch(StartRegister(email, password1, name, lastName));
  };
  const handleLogin = () => {
    history.push("/auth/login");
  };
  return (
    <RegisterIndex
      name={name}
      lastName={lastName}
      password1={password1}
      password2={password2}
      handleLogin={handleLogin}
      handleRegister={handleRegister}
      handleRegisterInputChange={handleRegisterInputChange}
    />
  );
};
