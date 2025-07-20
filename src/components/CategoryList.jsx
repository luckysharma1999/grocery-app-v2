import ItemCard from "./ItemCard";

const CategoryList = ({ data, onAdd }) => {
  return (
    <div className="space-y-6">
      {Object.entries(data).map(([category, items]) => (
        <div key={category}>
          <h2 className="text-xl font-bold capitalize mb-2 border-b-2 pb-1 border-gray-300 shadow-sm">
            {category.replace(/_/g, " ")}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {Object.entries(items).map(([name_en, name_hi]) => (
              <ItemCard
                key={name_en}
                name_en={name_en}
                name_hi={name_hi}
                onAdd={onAdd}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryList;
