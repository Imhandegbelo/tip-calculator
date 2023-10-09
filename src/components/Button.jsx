import PropTypes from "prop-types";
import { useState, memo } from "react";
// import { contextDestructured } from "./context";

function Button({ title, onClick, active }) {
  // const [active, setActive] = useState(false);
  // const {setActivePercent, activePercent} = contextDestructured();

  // function handleClick() {
  //   setActive(true);
  //   // isActive = false;
  // }

  return (
    <>
      <button
        className={`font-bold rounded-md py-2 cursor-pointer text-2xl ${
          active ? "bg-[#26c0ab] text-[#00494d]" : "bg-[#00494d]  text-white"
        } hover:bg-[#26c0abc1] hover:text-[#00494d]`}
        // onClick={() => setActive(!active)}
        onClick={onClick}
      >
        {title}
      </button>
    </>
  );
}
export default memo(Button);

Button.propTypes = {
  title: PropTypes.string.isRequired,
};
