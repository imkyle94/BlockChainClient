import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const [isRedirect, setIsRedirect] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3001/auth/login", data);
      setIsRedirect(true);
      console.log("로그인 클라이언트 성공");
    } catch (err) {
      console.log("로그인 클라이언트 실패");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("email")} placeholder="이메일" />
        <input {...register("password")} placeholder="비밀번호" />
        <input type="submit" />
      </form>
      {isRedirect && <Navigate to="/" />}
    </div>
  );
}

export default Login;
