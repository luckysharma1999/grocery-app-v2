const FinalListModal = ({ isOpen, onClose, finalList, onRemove, onClear }) => {
  if (!isOpen) return null;

  const handleCopy = () => {
    const text = finalList
      .map((item) => `• ${item.name_hi} – ${item.quantity} ${item.unit}`)
      .join("\n");
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-md w-[95%] max-w-xl shadow-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-xl font-bold mb-4">🧾 Final Grocery List</h2>

        {finalList.length === 0 ? (
          <p className="text-gray-500 mb-4">No items added yet.</p>
        ) : (
          <ul className="space-y-2 mb-4">
            {finalList.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center border-b pb-1"
              >
                <span>
                  {item.name_hi} – {item.quantity} {item.unit}
                </span>
                <button
                  onClick={() => onRemove(index)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="flex justify-between mt-4 space-x-2">
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-green-600 text-white rounded"
          >
            Copy List
          </button>
          <button
            onClick={onClear}
            className="px-4 py-2 bg-yellow-500 text-white rounded"
          >
            Clear All
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default FinalListModal;
