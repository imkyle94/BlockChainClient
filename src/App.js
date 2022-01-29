import "./App.css";
import React from "react";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function App() {
  const [isRedirect, setIsRedirect] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("http://localhost:3001/practice", data);
      setIsRedirect(true);
      console.log("채굴 클라이언트 성공");
    } catch (err) {
      console.log("채굴 클라이언트 실패");
    }
  };

  return (
    <div>
      <nav
        style={{
          borderBottom: "solid 1px",
          paddingBottom: "1rem",
        }}
      >
        <h1>프로젝트 뿅</h1>
        <Link to="/1blocks">블럭보기</Link> |{" "}
        <Link to="/1expenses">그냥 만들어봄</Link>
        <br></br>
        <Link to="/join">회원가입</Link> | <Link to="/login">로그인</Link>
        <br></br>
        <Link to="/apis">Apis</Link>
      </nav>

      <h2>채굴해보기</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("number")} placeholder="채굴 인원" />
        <input type="submit" />
      </form>
    </div>
  );
}

export default App;
