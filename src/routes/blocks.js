// 여기서 블럭 처리 해놓고 한번 살펴 보자
import axios from "axios";
import { useForm } from "react-hook-form";

function Blocks() {
  let n = false;
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      if (n == true) n = false;
      else n = true;
      const blocks = await axios.post("http://localhost:3001/bbb", n);

      // 계속 채굴 돌리는 거 할거임
      console.log(blocks);
    } catch (err) {
      console.log("실패");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="submit" />
      </form>
    </div>
  );
}

export default Blocks;
