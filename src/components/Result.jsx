import { memo } from "react";

function Result({ amount, total }) {
  return (
    <>
      <div className="flex flex-row justify-between md-4 md:mb-6">
        <div className="flex flex-col">
          <h3 className="text-white pb-[-2] font-bold">Tip Amount</h3>
          <small className="text-[#5e7a7d] text-left font-bold">/ person</small>
        </div>
        <div className="text-3xl text-[#26c0ab] font-bold">
          {amount <= 0 ? "$0.00" : amount}
        </div>
      </div>
      <div className="flex flex-row justify-between mt-4 md:mt-6">
        <div className="flex flex-col">
          <h3 className="text-white pb-[-2] font-bold">Total</h3>
          <small className="text-[#5e7a7d] text-left font-bold">/ person</small>
        </div>
        <div className="text-3xl text-[#26c0ab] font-bold">
          {total <= 0 ? "$0.00" : total}
        </div>
      </div>
    </>
  );
}

export default memo(Result);
