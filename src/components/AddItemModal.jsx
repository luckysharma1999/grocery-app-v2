import { useState } from "react";
const unitOptions = [
  "kg",
  "g",
  "litre",
  "pcs",
  "packet",
  "bottle",
  "पीपा",
  "box",
];

const AddItemModal = ({ isOpen, onClose, item, onConfirm }) => {
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg"); // default unit

  if (!isOpen) return null;

  const handleConfirm = () => {
    if (quantity.trim()) {
      onConfirm({ ...item, quantity, unit });
      setQuantity("");
      setUnit("kg");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-80 shadow-lg">
        <h2 className="text-lg font-bold mb-2">
          {item.name_hi} ({item.name_en})
        </h2>

        <div className="flex gap-2 ">
          <input
            type="text"
            placeholder="Enter quantity (e.g. 2)"
            className="shadow-lg p-2 w-full mb-3 rounded"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
          />

          <select
            className=" shadow-lg p-2  mb-4 rounded"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          >
            {unitOptions.map((u) => (
              <option key={u} value={u}>
                {u}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-1 bg-red-400 text-white rounded"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-1 bg-green-600 text-white rounded"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItemModal;
