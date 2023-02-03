import { useState, KeyboardEventHandler, useRef } from "react";
import CreatableSelect from "react-select/creatable";
import Editor from "./EmailEditor";

interface Option {
  readonly label: string;
  readonly value: string;
}

interface ExportProps {
  design: string;
  html: string;
}

// TODO make container with email message
// TODO save multiple templates, save in json file
// TODO validate if email is valid
// TODO send email to multiple users
const EmailSend = () => {
  const [spinAction, setSpinAction] = useState(false);
  const [value, setValue] = useState<readonly Option[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isWarning, setWarning] = useState(false);
  const [isSaved, setSaved] = useState(false);

  const emailEditorRef = useRef<any>(null);

  const generateHandler = async (e: any) => {
    e.preventDefault();
    setSpinAction(true);

    setTimeout(() => {
      setSpinAction(false);
    }, 5000);
  };

  const createOption = (label: string) => ({
    label,
    value: label,
  });

  const isEmailValid = (inputVal: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(inputVal);
  };

  const handleAddEmail: KeyboardEventHandler = async (event) => {
    setWarning(false);
    if (!inputValue) return;
    switch (event.key) {
      case "Enter":
      case "Tab":
        if (isEmailValid(inputValue)) {
          setValue((prev) => [...prev, createOption(inputValue)]);
          setInputValue("");
        } else {
          setWarning(true);
          console.log("Email not valid");
        }
        event.preventDefault();
    }
  };

  const components = {
    DropdownIndicator: null,
  };

  const exportHtml = () => {
    if (emailEditorRef.current) {
      emailEditorRef.current.editor.exportHtml((data: ExportProps) => {
        const { design, html } = data;
        console.log("exportHtml", html);
      });
    }
  };

  const saveJsonFile = (jsonData: any, filename: string) => {
    const fileData = JSON.stringify(jsonData);
    const blob = new Blob([fileData], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.style.cssText = "position:absolute";

    link.download = `${filename}.json`;
    link.href = url;
    link.click();
  };

  const handleSave = () => {
    const design = emailEditorRef.current.editor.saveDesign(
      async (design: any) => {
        // saveJsonFile(design, "dummy");
        localStorage.setItem("design", JSON.stringify(design));
        setSaved(true);
      }
    );
    // console.log("design", design);
  };

  return (
    <div className="flex gap-4 h-full ">
      <section className="basis-1/3 bg-slate-700 p-4 border border-white rounded-md">
        <h1 className="pb-8">Generate:</h1>
        <form onSubmit={generateHandler}>
          <div className="form-control pb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300 ">
              Email Address
            </label>
            {isWarning && (
              <div
                className="tooltip tooltip-open tooltip-warning"
                data-tip="input correct email format"
              ></div>
            )}
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
              placeholder="email address"
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
          <button
            type="submit"
            className={`mt-8 float-right btn btn-outline btn-info ${
              spinAction && "loading"
            }`}
          >
            Generate
          </button>
        </form>
      </section>
      <section className="basis-2/3 bg-slate-700 p-4 border border-white rounded-md">
        <h1 className="pb-8">Result:</h1>
        {/* <textarea
          className="textarea textarea-bordered w-full"
          disabled
        ></textarea> */}
        {/* <div className="bg-[#2A303C] border border-gray-600 h-32 rounded-md"></div> */}
        <div>
          <button className="btn" onClick={exportHtml}>
            Export HTML
          </button>
        </div>
        <Editor
          emailEditorRef={emailEditorRef}
          exportHtml={exportHtml}
          setSaved={setSaved}
        />
        <div className="flex flex-row-reverse">
          {isSaved ? (
            <button onClick={handleSave} className="btn mt-4" disabled>
              Saved
            </button>
          ) : (
            <button onClick={handleSave} className="btn mt-4">
              Save
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

export default EmailSend;
