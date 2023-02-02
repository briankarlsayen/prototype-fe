import React, { useState, KeyboardEventHandler } from "react";
import CreatableSelect from "react-select/creatable";

interface Option {
  readonly label: string;
  readonly value: string;
}

const EmailSend = () => {
  const [spinAction, setSpinAction] = useState(false);
  const [value, setValue] = useState<readonly Option[]>([]);
  const [inputValue, setInputValue] = useState("");
  // const [emailArr, setEmailArr] = useState<Array<string>>([]);
  const generateHandler = async (e: any) => {
    e.preventDefault();
    setSpinAction(true);

    setTimeout(() => {
      setSpinAction(false);
    }, 5000);
  };

  // const selectedArr = [
  //   "mail@mail.com",
  //   "jinsei@mail.com",

  // ]

  const createOption = (label: string) => ({
    label,
    value: label,
  });

  const isEmailValid = (inputVal: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(inputVal);
  };

  const handleAddEmail: KeyboardEventHandler = async (event) => {
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        if (isEmailValid(inputValue)) {
          setValue((prev) => [...prev, createOption(inputValue)]);
          setInputValue("");
        } else {
          console.log("Email not valid");
        }
        event.preventDefault();
    }
  };

  const components = {
    DropdownIndicator: null,
  };

  return (
    <div className="flex gap-4 h-full ">
      <div className="toast toast-top toast-end">
        <div className="alert alert-info">
          <div>
            <span>New mail arrived.</span>
          </div>
        </div>
        <div className="alert alert-success">
          <div>
            <span>Message sent successfully.</span>
          </div>
        </div>
      </div>
      <section className="basis-1/3 bg-slate-700 p-4 border border-white rounded-md">
        <h1 className="pb-8">Generate:</h1>
        <form onSubmit={generateHandler}>
          <div className="form-control pb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 ">
              Email Address
            </label>

            {/* <input
              type="text"
              placeholder="email address"
              className="input input-bordered w-full"
            /> */}
            <CreatableSelect
              components={components}
              isMulti
              classNamePrefix="mult-email-input"
              onChange={(e: any) => setValue(e)}
              value={value}
              onKeyDown={handleAddEmail}
              inputValue={inputValue}
              onInputChange={(newValue) => setInputValue(newValue)}
              menuIsOpen={false}
            />
          </div>
          <div className="form-control pb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Message
            </label>
            {/* <input
            type="text"
            placeholder="message"
            className="input input-bordered w-full max-w-xs"
          /> */}
            <textarea
              className="textarea textarea-bordered"
              placeholder="message"
            ></textarea>
          </div>
          <div className="form-control pb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              Design
            </label>
            <select className="select select-bordered outline-none w-full">
              <option>basic</option>
              <option>business</option>
              <option>casual</option>
            </select>
          </div>
          {/* <button
            type="submit"
            className={`mt-8 float-right btn btn-outline btn-info ${
              spinAction && "loading"
            }`}
            // className="mt-8 float-right btn btn-outline btn-info loading"
          >
            Generate
          </button> */}
        </form>
      </section>
      <section className="basis-2/3 bg-slate-700 p-4 border border-white rounded-md">
        <h1 className="pb-8">Result:</h1>
        {/* <textarea
          className="textarea textarea-bordered w-full"
          disabled
        ></textarea> */}
        <div className="bg-[#2A303C] border border-gray-600 h-32 rounded-md"></div>
      </section>
    </div>
  );
};

export default EmailSend;
