import React, { FormEvent, RefObject } from "react";

type InputProps = {
  handleSubmit: (e: FormEvent<HTMLFormElement>) => void;
  inputRef: RefObject<HTMLInputElement>;
};

const Input = ({ handleSubmit, inputRef }: InputProps) => {
  return (
    <div className="">
      <form
        className="flex justify-center items-center mt-10 pb-10"
        onSubmit={handleSubmit}
        action=""
      >
        <input
          className="p-2 rounded-l-lg outline-none text-gray-700"
          placeholder="Enter city..."
          type="text"
          ref={inputRef}
        />
        <button
          className="py-2 px-4 bg-emerald-600 hover:bg-emerald-500 
duration-200 hover:scale-105 cursor-pointer transition hover:-translate-y-0.5
rounded-r-lg shadow-sm hover:shadow-md hover:shadow-rose-50 text-white"
        >
          search
        </button>
      </form>
    </div>
  );
};

export default Input;
