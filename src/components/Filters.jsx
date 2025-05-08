import React from "react";

export default function Filters({ filters, setFilters }) {
  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handleExcludedChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      excludedIngredients: e.target.value,
    }));
  };

  return (
    <section className="bg-white shadow-md rounded-lg p-6 max-w-3xl mx-auto mt-6">
      <h2 className="text-xl font-semibold text-blue-600 mb-4">Dietary Filters</h2>
      <div className="grid grid-cols-2 gap-4 mb-4">
        {["vegan", "vegetarian", "glutenFree", "dairyFree"].map((filter) => (
          <label key={filter} className="flex items-center space-x-2 text-gray-700">
            <input
              type="checkbox"
              name={filter}
              checked={filters[filter]}
              onChange={handleCheckboxChange}
              className="accent-blue-600"
            />
            <span className="capitalize">{filter.replace(/([A-Z])/g, " $1")}</span>
          </label>
        ))}
        <label className="flex items-center space-x-2 text-gray-700 col-span-2">
          <input
            type="checkbox"
            name="exclude"
            checked={filters.exclude}
            onChange={handleCheckboxChange}
            className="accent-blue-600"
          />
          <span>Exclude Ingredients</span>
        </label>
      </div>

      {filters.exclude && (
        <input
          type="text"
          placeholder="e.g. mushrooms, onions"
          value={filters.excludedIngredients}
          onChange={handleExcludedChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}
    </section>
  );
}
