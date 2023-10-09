import PropTypes from "prop-types";

const Input = ({ icon, value }) => (
  <input
    className={`rounded-md py-2 cursor-pointer text-[24px] bg-[#f4fafa] ${
      isPrimary ? "bg-[#00494d] text-white" : "bg-[#FFFFFF}] text-[#00494d]"
    }  `}
  >
    {value}
  </input>
);
export default Input;

Input.propTypes = {
  icon: PropTypes.any,
  value: PropTypes.string,
};
