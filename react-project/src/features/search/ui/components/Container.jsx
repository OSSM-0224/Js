import React from "react";

const Container = ({ songs }) => {
  return (
    <div className="h-100 w-100 z-10 overflow-auto absolute p-5 bg-gray-800 flex flex-col gap-2">
      {songs.map((elem) => (
        <h1 className="text-xl font-semibold">{elem.title}</h1>
      ))}
    </div>
  );
};

export default Container;