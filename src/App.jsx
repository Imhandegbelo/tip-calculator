import React,{ useState } from "react";
import Button from "./components/Button";
import dollar from "./assets/icon-dollar.svg";
import person from "./assets/icon-person.svg";
import ResetButton from "./components/ResetButton";
import Result from "./components/Result";

function App() {
  const [bill, setBill] = useState("");
  const [tip, setTip] = useState(0);
  const [people, setPeople] = useState("");
  const [total, setTotal] = useState(0);
  const [amount, setAmount] = useState(0);
  const [blurred, setBlurred] = useState(false);
  const [active, setActive] = useState(null);
  const [error, setError] = useState("");

  const percents = [5, 10, 15, 25, 50];
  return (
    <div className="w-100 h-screen flex items-center justify-center text-center">
      <main>
        <h1 className="font-bold tracking-[0.6rem] pb-10 text-[#00494d]">
          SPLI
          <br />
          TTER
        </h1>
        <div className="w-full md:w-4/5 lg:w-3/5 grid md:grid-cols-2 gap-6 md:gap-7 lg:gap-10 mx-auto bg-white p-6 md:p-7 lg:p-10 rounded-2xl">
          <div className="">
            <label className="text-gray-400 text-base text-left pb-2 font-bold">
              <p className="text-[#00494dd1] -mb-2 md:mb-0">Bill</p>
              <img src={dollar} alt="$" className="relative top-8 left-3" />
              <input
                type="text"
                placeholder="0"
                className={`w-full font-bold text-[24px] p-1 bg-[#f4fafa] border-2 border-transparent ${isNaN(
                  isNaN(parseFloat(bill)) ? "border-red-500" : ""
                )} text-[#00494d] text-right hover:border-2 hover:border-[#26c0ab] rounded-md placeholder:text-gray-400`}
                value={bill}
                onChange={(e) => setBill(e.target.value)}
              />
            </label>
            <h3 className="text-base text-[#00494dd1] text-left mt-8 mb-4 font-bold">
              Select Tip %
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {percents.map((percent, index) => (
                <Button
                  key={percent.toString()}
                  title={`${percent}%`}
                  active={active == index}
                  onClick={() => onClick(percent, index)}
                />
              ))}
              <input
                type="text"
                inputMode="decimal"
                className="text-lg rounded-md font-bold text-[#00494d] bg-[#f4fafa] text-center px-1 border-2 border-transparent hover:border-2 hover:border-[#26c0ab] placeholder:text-[#5e7a7d]"
                placeholder="Custom"
                onChange={(e) => setTip(parseFloat(e.target.value))}
              />
            </div>
            <div className="mt-8 pb-2">
              <div className="flex justify-between -mb-2 md:mb-0">
                <h3 className="text-left text-[#00494dd1] font-bold">
                  Number of People
                </h3>

                <small
                  className={`${
                    blurred ? "block font-bold text-red-500" : "hidden"
                  }`}
                >
                  {error}
                </small>
              </div>
              <label className="text-left text-gray-400 font-bold">
                <img src={person} alt="P" className="relative top-8 left-3" />
                <input
                  inputMode="decimal"
                  className={`w-full font-bold text-[24px] p-1 bg-[#f4fafa] text-[#00494d] text-right border-2 hover:border-[#26c0ab] ${
                    blurred ? "border-red-500" : "border-transparent"
                  } rounded-md placeholder:text-gray-400`}
                  value={people}
                  placeholder="0"
                  type="text"
                  onChange={(e) => setPeople(e.target.value)}
                  onBlur={handleBlur}
                />
              </label>
            </div>
          </div>
          <div className="bg-[#00494d] rounded-xl p-5 md:p-6 lg:p-10">
            <Result amount={amount} total={total} />
            <ResetButton people={people} onClick={reset} />
          </div>
        </div>
      </main>
    </div>
  );

  function reset() {
    setBill("");
    setPeople("");
    setTip(0);
    setActive(null);
    setAmount(0);
    setTotal(0);
    setBlurred(false);
  }

  function onClick(title, index) {
    setTip(title);
    setActive(index);
  }

  function calculateTip() {
    let tipPerPerson;
    let totalPerPerson;
    let peopleAsNumber = parseInt(people);
    let billAsNumber = parseFloat(bill);
    let tipAsNumber = parseFloat(tip);

    if (isNaN(peopleAsNumber) || isNaN(billAsNumber) || isNaN(Number(tip))) {
      setError("Inputs not number");
      return;
    } else {
      let tipAmount = billAsNumber * (tipAsNumber / 100);
      let totalAmount = billAsNumber + tipAmount;
      tipPerPerson = (tipAmount / peopleAsNumber).toFixed(2);
      totalPerPerson = (totalAmount / peopleAsNumber).toFixed(2);
      setAmount(tipPerPerson);
      setTotal(totalPerPerson);
    }
  }

  function handleBlur() {
    if (parseInt(people) < 1) {
      setBlurred(true);
      setError("Can't be zero");
      return;
    } else if (isNaN(parseInt(people))) {
      setBlurred(true);
      setError("Number expected");
      return;
    } else {
      setBlurred(false);
      setError("");
    }
    calculateTip();
  }
}

export default App;
