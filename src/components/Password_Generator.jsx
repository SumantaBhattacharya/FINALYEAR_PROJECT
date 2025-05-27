import { React, useCallback, useState, useEffect, useRef } from "react";

export default function Password_Generator() {
  const [isLength, setLength] = useState(8);
  const [isCheckedNumbers, setCheckedNumbers] = useState(false);
  const [isCheckedSpecialChars, setCheckedSpecialChars] = useState(false);
  const [ispassword, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const passwordRef = useRef(null);

  const copyToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(ispassword).then(() => {
      setAlertMessage("Password copied to clipboard!");
      setTimeout(() => setAlertMessage(""), 3000);
    });
  }, [ispassword]);

  const passwordGenerator = useCallback(() => {
    let password = "";
    let string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (isCheckedNumbers) {
      string += "0123456789";
    }

    if (isCheckedSpecialChars) {
      string += "!@#$%^&*()";
    }

    for (let index = 1; index <= isLength; index++) {
      const char = Math.floor(Math.random() * string.length);
      password += string.charAt(char);
    }

    setPassword(password);
  }, [isLength, isCheckedNumbers, isCheckedSpecialChars]);

  useEffect(() => {
    passwordGenerator();
  }, [isLength, isCheckedNumbers, isCheckedSpecialChars, passwordGenerator]);

  return (
    <div className="main w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 bg-gray-300
                    min-h-[18rem] sm:min-h-[20rem] md:min-h-[16rem]">
      <div
        style={{ borderBottom: "2px solid black", marginBottom: "1vw" }}
        className="overflow-hidden"
      >
        <h1
          className="text-center text-3xl sm:text-4xl md:text-5xl font-bold text-[#111]"
          style={{
            fontFamily: "HeadingNow",
            whiteSpace: "nowrap",
            fontStretch: "300%",
            fontWeight: 600,
            lineHeight: 1.2,
          }}
        >
          Password Generator
        </h1>
      </div>

      <form action="">
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <input
            type="text"
            value={ispassword}
            placeholder="Your generated password"
            readOnly
            ref={passwordRef}
            className="outline-none py-2 px-3 rounded-lg flex-1 border border-gray-400 text-black w-full sm:w-auto"
            style={{ border: "none" }}
          />
          <button
            type="button"
            className="outline-none bg-[#DBEAFE] text-black py-2 px-3 rounded-lg font-semibold shrink-0 w-full sm:w-auto"
            onClick={copyToClipboard}
          >
            Copy
          </button>
          {alertMessage && (
            <div className="fixed bottom-4 right-4 bg-blue-500 text-white p-4 rounded shadow-md z-50">
              {alertMessage}
            </div>
          )}
        </div>

        <div className="flex flex-wrap mt-4 text-sm gap-4">
          <div className="flex items-center gap-x-2 min-w-[150px]">
            <input
              type="range"
              min={8}
              max={50}
              value={isLength}
              className="cursor-pointer accent-blue-500 flex-1"
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label className="font-bold whitespace-nowrap">Length: {isLength}</label>
          </div>

          <div className="flex items-center gap-x-2 min-w-[150px]">
            <input
              type="checkbox"
              checked={isCheckedNumbers}
              id="checkedInput"
              className="cursor-pointer accent-blue-500"
              onChange={() => setCheckedNumbers(!isCheckedNumbers)}
            />
            <label className="font-bold" htmlFor="checkedInput">
              Include numbers
            </label>
          </div>

          <div className="flex items-center gap-x-2 min-w-[200px]">
            <input
              type="checkbox"
              checked={isCheckedSpecialChars}
              id="checkedCharacters"
              className="cursor-pointer accent-blue-500"
              onChange={() => setCheckedSpecialChars(!isCheckedSpecialChars)}
            />
            <label className="font-bold" htmlFor="checkedCharacters">
              Include special characters
            </label>
          </div>
        </div>
      </form>
    </div>
  );
}
