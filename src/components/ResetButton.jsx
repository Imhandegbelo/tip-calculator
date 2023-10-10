import { memo } from "react";

function ResetButton({ people, onClick }) {
  return (
    <button
      disabled={Number(people) <= 0}
      onClick={onClick}
      className="disabled:bg-[#5e7a7d] w-full rounded-lg py-2 mt-12 sm:mt-14 md:mt-20 lg:mt-28 bg-[#26c0ab] text-xl text-[#00494d] font-bold hover:bg-[#26c0abc1]"
    >
      RESET
    </button>
  );
}

export default memo(ResetButton);
