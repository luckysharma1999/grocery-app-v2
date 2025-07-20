import React from "react";

const Itemcard = ({ name_en, name_hi, onAdd }) => {
  return (
    <div
      className="flex flex-col items-center justify-center p-4 rounded-4xl shadow-lg shadow-gray-700/30 bg-white   text-center"
      onClick={() => onAdd({ name_en, name_hi })}
    >
      <p className="font-semibold text-lg text-gray-800">
        {name_hi}
        <span className="block text-sm text-gray-500">({name_en})</span>
      </p>
    </div>
  );
};

export default Itemcard;
