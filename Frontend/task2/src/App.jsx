import { useState } from "react";
import Login from "./components/Login";
import Register from "./components/Register";

function App() {
  const [toggle, setToggle] = useState(false); // false = Register

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f0f2f5]">
      {toggle ? (
        <Login setToggle={setToggle} />
      ) : (
        <Register setToggle={setToggle} />
      )}
    </div>
  );
}

export default App;