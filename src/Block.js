import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Block() {
  const a = async () => {
    try {
      // const data = await axios.get("http://localhost:3001/blocks");
      // console.log(data);
      console.log("이거면 성공");
    } catch (err) {
      console.log("비동기 실패");
    }
  };
  return <div>맞구나 ㅋ</div>;
}

export default Block;
