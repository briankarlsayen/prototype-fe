import { useState } from "react";
import { FaRegCopy, FaSyncAlt, FaCaretDown } from "react-icons/fa";
import axios from "../../../api/axios";

const EmailPromo = () => {
  const [inputSettings, setInputSettings] = useState({
    recipient: "",
    sender: "",
    description: "",
    tone: "business",
    promotion: false,
  });

  const [mailMessage, setMailMessage] = useState<Array<string>>();
  const [rawMessage, setRawMessage] = useState("");
  const [addOpt, setAddOpt] = useState(false);
  const [showBusinessOpt, setShowBusinessOpt] = useState(true);
  const [spinAction, setSpinAction] = useState(false);

  const updateField = (e: any) => {
    // * check if tone > business is selected, show business settings
    if (e.target.name === "tone" && e.target.value === "casual") {
      setShowBusinessOpt(false);
    } else if (e.target.name === "tone" && e.target.value === "business") {
      setShowBusinessOpt(true);
    }

    if (e.target.name === "promotion") {
      setInputSettings({
        ...inputSettings,
        ["promotion"]: !inputSettings.promotion,
      });
    } else {
      setInputSettings({
        ...inputSettings,
        [e.target.name]: e.target.value,
      });
    }
  };

  const generateHandler = (e: any) => {
    e.preventDefault();
    generateEmail();
  };

  const handleAddSettings = () => {
    setAddOpt(!addOpt);
  };

  const generateEmail = async () => {
    try {
      // const emailMessage =
      //   "\n\nHello Nazer,\n\nThank you for your interest in our promotional products! We would be more than happy to help you promote your business with our high-quality products.\n\nOur team of experts can help you choose the perfect promotional products to fit your needs and budget. We offer a wide variety of products, including custom-printed t-shirts, pens, and more.\n\nWe would be honored to help you promote your business and would love to discuss your promotional needs further. Please feel free to contact us at any time.\n\nThank you,\n\nBrian";
      const response = await axios.post("/generateemail", {
        recipient: inputSettings.recipient,
        sender: inputSettings.sender,
        description: inputSettings.description,
        tone: inputSettings.tone,
      });

      const emailMessage = response.data.data;
      const trimmedMessage = emailMessage.trim();
      setRawMessage(trimmedMessage);
      const newMail = trimmedMessage.split(/\r?\n|\r|\n/g);
      // console.log("newMail", newMail);
      // const newMail = emailMessage.split(/\r?\n|\r|\n/g);
      // const mail1 = newMail.map((item) => item.trim());

      // * remove empty arr before text arr
      // for (let i = 0; i < newMail.length; i++) {
      //   if (newMail[i] !== "") {
      //     newMail.splice(0, i);
      //     break;
      //   }
      // }
      setMailMessage(newMail);
    } catch (err) {
      console.log("err", err);
    }
  };

  const showAddOpt = () => {
    return (
      <>
        {addOpt && (
          <div className="pt-4">
            <div>
              <label
                htmlFor="tone"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Tone
              </label>
              <select
                id="tone"
                name="tone"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                required
                onChange={updateField}
              >
                <option defaultValue="business" value="business">
                  Business
                </option>
                <option value="casual">Casual</option>
              </select>
              {showBusinessOpt && (
                <section id="business-settings" className="flex pt-4">
                  <label className="text-sm font-thin pb-2 flex-1">
                    Promotion
                  </label>
                  <div className="relative inline-block w-10 mr-2 align-middle select-none transition duration-200 ease-in">
                    <input
                      type="checkbox"
                      name="promotion"
                      id="promotion"
                      className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                      onChange={updateField}
                      checked={inputSettings.promotion}
                    />
                    <label
                      htmlFor="promotion"
                      className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-600 cursor-pointer"
                    ></label>
                  </div>
                </section>
              )}
            </div>
          </div>
        )}
      </>
    );
  };

  const regenerateEmail = async () => {
    setSpinAction(true);

    // setTimeout(() => {
    //   console.log("ongoing");
    //   setSpinAction(false);
    // }, 5000);
    await generateEmail();
    setSpinAction(false);
  };

  const copyPassword = () => {
    navigator.clipboard.writeText(rawMessage).then(() => console.log("copy"));
  };

  return (
    <div className="flex gap-4 h-full ">
      <div className="basis-1/3 bg-slate-700 border border-white rounded-lg p-4">
        <h4>Generate:</h4>
        <form onSubmit={generateHandler}>
          <div className="pt-8">
            <div>
              <label
                htmlFor="recipient"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Recipient
              </label>
              <input
                type="text"
                id="recipient"
                name="recipient"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="John"
                onChange={updateField}
                required
              />
            </div>
            <div className="pt-2">
              <label
                htmlFor="sender"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Sender
              </label>
              <input
                type="text"
                id="sender"
                name="sender"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Mav"
                onChange={updateField}
                required
              />
            </div>
            <div className="pt-2">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Description
              </label>
              <input
                type="text"
                id="description"
                name="description"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="remind for car montly dues"
                onChange={updateField}
                required
              />
            </div>
          </div>
          <div className="pt-4">
            <h4 className="flex gap-2 items-center">
              Additional Options
              <span
                className="cursor-pointer hover:text-gray-400"
                onClick={handleAddSettings}
              >
                <FaCaretDown />
              </span>
            </h4>
            {showAddOpt()}
          </div>
          <button
            type="submit"
            className="bg-white text-black px-4 py-2 rounded-md float-right mt-4 hover:bg-slate-200"
          >
            Generate
          </button>
        </form>
      </div>
      <div className="basis-2/3 bg-slate-700 border border-white rounded-lg p-4">
        <h4 className="pb-14">Result:</h4>
        <div className="bg-gray-700 p-4 border border-gray-600 rounded-md min-h-[5rem]">
          {mailMessage && (
            <div className="float-right flex gap-4">
              <button
                className={`cursor-pointer hover:text-gray-300 ${
                  spinAction && "animate-spin"
                }`}
                onClick={regenerateEmail}
              >
                <FaSyncAlt title="reload" />
              </button>
              <button
                className=" cursor-pointer hover:text-gray-300 "
                onClick={copyPassword}
              >
                <FaRegCopy title="copy" />
              </button>
            </div>
          )}
          {mailMessage &&
            mailMessage.map((item, index) => (
              <p className="bg-gray-700 text-base font-thin py-1" key={index}>
                {item}
              </p>
            ))}
        </div>
      </div>
    </div>
  );
};

export default EmailPromo;
