import React, { useState, useEffect } from "react";
import axios from "axios";

export default function Category() {
  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");
  const [categories, setCategories] = useState([]);

  // ✅ Fetch existing categories (GET)
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/category/");
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // ✅ POST New Category
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!categoryName.trim() || !categoryDescription.trim()) {
      alert("Category name and description are required");
      return;
    }

    try {
      await axios.post(
        "http://127.0.0.1:8000/api/category_create/",
        {
          name: categoryName,
          description: categoryDescription,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Clear inputs
      setCategoryName("");
      setCategoryDescription("");

      // Refresh list after adding
      fetchCategories();
    } catch (error) {
      console.error("Error adding category:", error);
    }
  };

  return (
    <div className="w-full px-10 py-8">
      <h2 className="text-3xl font-semibold text-purple-700 mb-8">
        Category Management
      </h2>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-lg rounded-xl p-6 space-y-6 max-w-2xl"
      >
        <h3 className="text-xl font-semibold text-gray-700">Add Category</h3>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">
            Category Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={categoryName}
            placeholder="Enter category name"
            onChange={(e) => setCategoryName(e.target.value)}
            className="px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-purple-300"
          />
        </div>

        <div className="flex flex-col">
          <label className="text-gray-700 font-medium mb-1">Description</label>
          <textarea
            value={categoryDescription}
            placeholder="Enter description"
            onChange={(e) => setCategoryDescription(e.target.value)}
            className="px-4 py-2 border rounded-xl outline-none focus:ring-2 focus:ring-purple-300 min-h-[100px]"
          ></textarea>
        </div>

        <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-full transition">
          Add Category
        </button>
      </form>

      {/* Display Categories */}
      <h3 className="text-xl font-semibold text-gray-800 mt-10">
        Existing Categories
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {categories.length > 0 ? (
          categories.map((cat, index) => (
            <div
              key={index}
              className="bg-purple-100 p-4 rounded-xl shadow border"
            >
              <h4 className="font-bold text-purple-700">
                {cat.name || cat.category_name}
              </h4>
              <p className="text-gray-600">
                {cat.description ? cat.description : "No description"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 italic">No categories available</p>
        )}
      </div>
    </div>
  );
}
