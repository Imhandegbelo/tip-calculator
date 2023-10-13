import { useState } from "react";

export const useAppLogic = () => {
  const [bill, setBill] = useState("");
  const [tip, setTip] = useState(0);
  const [people, setPeople] = useState("");
  const [total, setTotal] = useState(0);
  const [amount, setAmount] = useState(0);
  const [blurred, setBlurred] = useState(false);
  const [active, setActive] = useState(null);
  const [error, setError] = useState("");
  const [billError, setBillError] = useState("");

  const reset = () => {
    setBill("");
    setPeople("");
    setTip(0);
    setActive(null);
    setAmount(0);
    setTotal(0);
    setBlurred(false);
  };

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
    if (parseFloat(bill) === "") {
      setBlurred(true);
      setBillError("Can not be empty!");
    } else if (parseFloat(bill) <= 0) {
      setBlurred(true);
      setBillError("Can not be zero!");
    }
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

  return {
    reset,
    calculateTip,
    onClick,
    handleBlur,
    total,
    amount,
    blurred,
    active,
    error,
    billError
  };
};
// const [total, setTotal] = useState(0);
// const [amount, setAmount] = useState(0);
// const [blurred, setBlurred] = useState(false);
// const [active, setActive] = useState(null);
// const [error, setError] = useState("");
// const [billError, setBillError] = useState("");
