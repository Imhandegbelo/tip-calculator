import React, { useContext, useEffect } from "react";
import "./App.css";
import Button from "./components/Button";
import { useState } from "react";
import dollar from "./assets/icon-dollar.svg";
import person from "./assets/icon-person.svg";

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
    <div className="App text-center pt-10">
      <main >
        <h1 className="font-bold tracking-[0.6rem] pt-5 md:pt-10 pb-10 text-[#00494d]">
          SPLI
          <br />
          TTER
        </h1>
        <div className="w-full md:w-4/5 lg:w-3/5 grid md:grid-cols-2 gap-6 md:gap-7 lg:gap-10 mx-auto bg-white p-6 md:p-7 lg:p-10 rounded-2xl">
          <div className="">
            <label className="text-gray-400 text-base text-left pb-2 font-bold">
              <p className="text-[#00494d] -mb-2 md:mb-0">Bill</p>
              <img src={dollar} alt="$" className="relative top-8 left-3" />
              <input
                type="text"
                placeholder="0"
                className={`w-full font-bold text-[24px] p-1 bg-[#f4fafa] border-2 border-transparent ${isNaN(
                  isNaN(parseFloat(bill)) ? "border-red-500" : ""
                )} text-[#00494d] text-right hover:border-2 hover:border-[#26c0ab] rounded-md placeholder:text-[#00494d]`}
                value={bill}
                onChange={(e) => setBill(e.target.value)}
              />
            </label>
            <h3 className="text-base text-[#00494d] text-left pt-6 pb-2 font-bold">
              Select Tip %
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {percents.map((percent, index) => (
                //bg-[#00494d] text-[#00494d]
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
            <div className="pt-6 pb-2">
              <div className="flex justify-between -mb-2 md:mb-0">
                <h3 className="text-left text-[#00494d] font-bold">
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
                  } rounded-md placeholder:text-[#00494d]`}
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
            <div className="flex flex-row justify-between md-4 md:mb-6">
              <div className="flex flex-col">
                <h3 className="text-white pb-[-2] font-bold">Tip Amount</h3>
                <small className="text-[#5e7a7d] text-left font-bold">
                  / person
                </small>
              </div>
              <div className="text-3xl text-[#26c0ab] font-bold">
                {amount <= 0 ? "$0.00" : amount}
              </div>
            </div>
            <div className="flex flex-row justify-between mt-4 md:mt-6">
              <div className="flex flex-col">
                <h3 className="text-white pb-[-2] font-bold">Total</h3>
                <small className="text-[#5e7a7d] text-left font-bold">
                  / person
                </small>
              </div>
              <div className="text-3xl text-[#26c0ab] font-bold">
                {total <= 0 ? "$0.00" : total}
              </div>
            </div>

            <button
              disabled={Number(people) <= 0}
              onClick={() => reset()}
              className="disabled:bg-[#5e7a7d] w-full rounded-lg py-2 mt-12 sm:mt-14 md:mt-20 lg:mt-28 bg-[#26c0ab] text-xl text-[#00494d] font-bold hover:bg-[#26c0abc1]"
            >
              RESET
            </button>
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
    } else if (isNaN(parseInt(people))) {
      setBlurred(true);
      setError("Number expected");
    } else {
      setBlurred(false);
      setError("");
    }
    calculateTip();
  }
}

export default App;
