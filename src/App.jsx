import { useEffect, useState } from "react";
import CategoryList from "./components/CategoryList";
import SearchBar from "./components/SearchBar";
import ItemCard from "./components/ItemCard";
import AddItemModal from "./components/AddItemModal";
import FinalListModal from "./components/FinalListModal";

const App = () => {
  const [groceryData, setGroceryData] = useState({});
  const [filteredItems, setFilteredItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [finalList, setFinalList] = useState(() => {
    const saved = localStorage.getItem("finalList");
    return saved ? JSON.parse(saved) : [];
  });

  const [isFinalListOpen, setIsFinalListOpen] = useState(false);

  useEffect(() => {
    fetch("/grocery.json")
      .then((res) => res.json())
      .then((data) => {
        setGroceryData(data);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    localStorage.setItem("finalList", JSON.stringify(finalList));
  }, [finalList]);

  const handleSearch = (term) => {
    setSearchTerm(term);

    if (!term) {
      setFilteredItems([]);
      return;
    }

    const lower = term.toLowerCase();
    const flatItems = [];

    for (const [category, items] of Object.entries(groceryData)) {
      for (const [name_en, name_hi] of Object.entries(items)) {
        if (name_en.toLowerCase().includes(lower) || name_hi.includes(term)) {
          flatItems.push({ name_en, name_hi });
        }
      }
    }

    setFilteredItems(flatItems);
  };

  const handleAddClick = (item) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleConfirmAdd = (itemWithQty) => {
    setFinalList((prev) => [...prev, itemWithQty]);
  };

  const handleRemoveItem = (index) => {
    const updatedList = [...finalList];
    updatedList.splice(index, 1);
    setFinalList(updatedList);
  };

  const handleClearList = () => {
    setFinalList([]);
    setIsFinalListOpen(false);
  };

  if (loading) return <div className="p-4">Loading...</div>;

  return (
    <div className="p-4 max-w-6xl mx-auto font-serif bg-zinc-100 shadow-lg rounded-lg pb-18">
      <h1 className="text-3xl font-bold mb-4">Grocery List</h1>
      <button
        onClick={() => setIsFinalListOpen(true)}
        className=" fixed bottom-6 right-6 px-4 py-3 bg-blue-600 text-white rounded-full shadow-lg"
      >
        🧾 View List ({finalList.length})
      </button>
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />

      {filteredItems.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {filteredItems.map((item) => (
            <ItemCard
              key={item.name_en}
              name_en={item.name_en}
              name_hi={item.name_hi}
              onAdd={handleAddClick}
            />
          ))}
        </div>
      ) : searchTerm ? (
        <p className="text-gray-600">No items found.</p>
      ) : (
        <CategoryList data={groceryData} onAdd={handleAddClick} />
      )}

      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        item={selectedItem || {}}
        onConfirm={handleConfirmAdd}
      />

      <FinalListModal
        isOpen={isFinalListOpen}
        onClose={() => setIsFinalListOpen(false)}
        finalList={finalList}
        onRemove={handleRemoveItem}
        onClear={handleClearList}
      />
    </div>
  );
};

export default App;
