import "./App.css";
import { Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

function App() {
    const [아이디, 아이디변경] = useState(0);
    const [비밀번호, 비밀번호변경] = useState(0);

    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => axios.post("localhost:3001/auth/join");

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input {...register("email")} />
                <input {...register("password")} />
                <input type="submit" />
            </form>
            <Button variant="primary" type="submit">
                채굴 시작
            </Button>
        </div>
    );
}

export default App;
