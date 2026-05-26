import React from "react";
import List from "./components/List";
import { useRef } from "react";
import axios from "axios";

const App = () => {
  let listRef = useRef({});

  let handleFormSubmit = async (e) => {
    e.preventDefault();

    let obj = {
      name: listRef.current.name.value,
      description: listRef.current.description.value,
    };
    let res = await axios.post("http://localhost:3000/api/lists/create", obj);
    console.log(res);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4">
      <div className="w-full max-w-2xl bg-white shadow-2xl rounded-3xl p-8">
        <h1 className="text-4xl font-bold text-center text-red-500 mb-8">
          Todo List
        </h1>

        <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
          <input
            ref={(e) => (listRef.current.name = e)}
            type="text"
            placeholder="Enter task name"
            className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-400 text-lg"
          />

          <textarea
            ref={(e) => (listRef.current.description = e)}
            placeholder="Enter description..."
            rows="5"
            className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-red-400 text-lg resize-none"
          ></textarea>

          <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition duration-300">
            Add Task
          </button>
        </form>
      </div>

      <div className="w-full max-w-2xl mt-8">{/* <List /> */}</div>
    </div>
  );
};

export default App;
