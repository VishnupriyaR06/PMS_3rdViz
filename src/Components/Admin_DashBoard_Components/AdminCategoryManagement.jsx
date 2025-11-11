import React, { useState, useEffect } from "react";
import axios from "axios";
import { nanoid } from "nanoid";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { motion } from "framer-motion";

/* ✅ Reusable Modal */
const Modal = ({ show, title, message, onClose, onConfirm }) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-xl p-6 w-[400px] shadow-xl"
      >
        <h2 className="text-xl font-semibold mb-3 text-pink-600">{title}</h2>
        <p className="text-gray-700 mb-6">{message}</p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Cancel
          </button>

          {onConfirm && (
            <button
              onClick={onConfirm}
              className="px-4 py-2 rounded bg-pink-600 text-white hover:bg-pink-700"
            >
              Confirm
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

/* ✅ Main Component */
export default function CategoryPhaseDashboard() {
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState(null);
  const [originalName, setOriginalName] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const [showCategoryForm, setShowCategoryForm] = useState(false);

  const [categoryName, setCategoryName] = useState("");
  const [categoryDescription, setCategoryDescription] = useState("");

  const [modalData, setModalData] = useState({
    show: false,
    title: "",
    message: "",
    onConfirm: null,
  });

  const [phases, setPhases] = useState([
    { id: nanoid(), name: "Planning" },
    { id: nanoid(), name: "Design" },
    { id: nanoid(), name: "Frontend" },
    { id: nanoid(), name: "Backend" },
    { id: nanoid(), name: "Testing" },
    { id: nanoid(), name: "Deployment" },
  ]);

  /* ✅ Fetch categories */
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://127.0.0.1:8000/api/Category_list/");
      setCategories(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  /* ✅ Create category */
  const handleCreateCategory = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://127.0.0.1:8000/api/category_create/", {
        name: categoryName,
        description: categoryDescription,
        phase: phases.map((p) => p.name),
      });

      setModalData({
        show: true,
        title: "Success",
        message: "Category Created Successfully!",
        onConfirm: null,
      });

      setCategoryName("");
      setCategoryDescription("");
      setShowCategoryForm(false);
      fetchCategories();
    } catch (error) {
      console.error(error);
      setModalData({
        show: true,
        title: "Error",
        message: "Failed to create category.",
        onConfirm: null,
      });
    }
  };

  /* ✅ Update category */
  const handleUpdateCategory = async () => {
    try {
      await axios.put(
        `http://127.0.0.1:8000/api/Category_update/${originalName}/`,
        {
          name: selectedCategory.name,
          description: selectedCategory.description,
          phase: selectedCategory.phase
            .split(",")
            .map((p) => p.trim())
            .filter((x) => x),
        }
      );

      setModalData({
        show: true,
        title: "Updated",
        message: "Category Updated Successfully!",
        onConfirm: null,
      });

      setIsEditing(false);
      setSelectedCategory(null);
      fetchCategories();
    } catch (error) {
      console.error(error);
      setModalData({
        show: true,
        title: "Error",
        message: "Failed to update category.",
        onConfirm: null,
      });
    }
  };

  /* ✅ Delete category */
  const handleDeleteCategory = async () => {
    setModalData({
      show: true,
      title: "Delete Category",
      message: `Are you sure you want to delete "${originalName}"?`,
      onConfirm: async () => {
        try {
          await axios.delete(
            `http://127.0.0.1:8000/api/Category_delete/${originalName}/`
          );

          setModalData({
            show: true,
            title: "Deleted",
            message: "Category Deleted Successfully!",
            onConfirm: null,
          });

          setSelectedCategory(null);
          setIsEditing(false);
          fetchCategories();
        } catch (error) {
          console.error(error);
          setModalData({
            show: true,
            title: "Error",
            message: "Error deleting category.",
            onConfirm: null,
          });
        }
      },
    });
  };

  /* ✅ Drag handling */
  const onDragEnd = (result) => {
    if (!result.destination) return;
    const updated = Array.from(phases);
    const [removed] = updated.splice(result.source.index, 1);
    updated.splice(result.destination.index, 0, removed);
    setPhases(updated);
  };

  return (
    <div className="p-10">

      {/* ✅ Modal */}
      <Modal
        show={modalData.show}
        title={modalData.title}
        message={modalData.message}
        onClose={() => setModalData({ ...modalData, show: false })}
        onConfirm={modalData.onConfirm}
      />

      {/* ✅ Detail Page */}
      {selectedCategory && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white p-6 rounded-xl shadow"
        >
          <button
            onClick={() => {
              setSelectedCategory(null);
              setIsEditing(false);
            }}
            className="mb-6 px-4 py-2 bg-gray-200 rounded"
          >
            ← Back
          </button>

          {/* Edit + Delete */}
          <div className="flex justify-end gap-4">
            <button
              onClick={() => setIsEditing(true)}
              className="px-5 py-2 bg-blue-500 text-white rounded"
            >
              Edit
            </button>

            <button
              onClick={handleDeleteCategory}
              className="px-5 py-2 bg-red-500 text-white rounded"
            >
              Delete
            </button>
          </div>

          {/* ✅ Edit Mode */}
          {isEditing ? (
            <div className="mt-6">
              <label>Name</label>
              <input
                className="w-full border rounded px-3 py-2 mb-3"
                value={selectedCategory.name}
                onChange={(e) =>
                  setSelectedCategory({ ...selectedCategory, name: e.target.value })
                }
              />

              <label>Description</label>
              <textarea
                className="w-full border rounded px-3 py-2 mb-3"
                value={selectedCategory.description}
                onChange={(e) =>
                  setSelectedCategory({
                    ...selectedCategory,
                    description: e.target.value,
                  })
                }
              />

              <label>Phases (comma separated)</label>
              <textarea
                className="w-full border rounded px-3 py-2"
                value={selectedCategory.phase}
                onChange={(e) =>
                  setSelectedCategory({
                    ...selectedCategory,
                    phase: e.target.value,
                  })
                }
              />

              <div className="flex justify-end mt-4 gap-3">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border rounded"
                >
                  Cancel
                </button>

                <button
                  onClick={handleUpdateCategory}
                  className="px-4 py-2 bg-green-500 text-white rounded"
                >
                  Update
                </button>
              </div>
            </div>
          ) : (
            <>
              <h1 className="text-3xl font-bold mt-6 text-pink-600">
                {selectedCategory.name}
              </h1>

              <p className="mt-4 text-gray-700">{selectedCategory.description}</p>

              <h3 className="text-xl mt-6 text-gray-700">Phases:</h3>

              <ul className="list-disc list-inside mt-3">
                {selectedCategory.phase.split(",").map((txt, i) => (
                  <li key={i}>{txt.trim()}</li>
                ))}
              </ul>
            </>
          )}
        </motion.div>
      )}

      {/* ✅ MAIN PAGE */}
      {!selectedCategory && (
        <>
          {!showCategoryForm && (
            <div className="flex justify-end mb-6">
              <button
                onClick={() => setShowCategoryForm(true)}
                className="px-6 py-2 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-lg shadow"
              >
                + Add Category
              </button>
            </div>
          )}

          {/* ✅ Category Cards */}
          {!showCategoryForm && (
            <>
              <h2 className="text-2xl font-bold text-pink-600 mb-4">
                Created Categories
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {categories.map((c) => (
                  <div
                    key={c.id}
                    onClick={() => {
                      setSelectedCategory(c);
                      setOriginalName(c.name);
                    }}
                    className="bg-white shadow-lg p-4 rounded-xl border hover:shadow-2xl cursor-pointer transition"
                  >
                    <h3 className="text-lg font-semibold text-pink-600">
                      {c.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {c.description.substring(0, 40)}...
                    </p>

                    <div className="text-right text-pink-600 font-bold mt-2">
                      View →
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ✅ Add Category Form */}
          {showCategoryForm && (
            <div className="bg-white p-6 mt-10 rounded-xl shadow-xl">
              <h2 className="text-2xl font-bold text-pink-600 mb-6">
                Create Category
              </h2>

              <form onSubmit={handleCreateCategory}>
                <label>Category Name</label>
                <input
                  className="w-full border px-3 py-2 rounded mb-4"
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                />

                <label>Description</label>
                <textarea
                  className="w-full border px-3 py-2 rounded mb-4"
                  value={categoryDescription}
                  onChange={(e) => setCategoryDescription(e.target.value)}
                />

                {/* ✅ Drag Phase UI */}
                <div>
                  <label>Phases</label>

                  <div className="bg-pink-100 p-4 rounded-xl border">
                    <DragDropContext onDragEnd={onDragEnd}>
                      <Droppable droppableId="phases" direction="horizontal">
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            className="flex flex-wrap gap-3"
                          >
                            {phases.map((p, i) => (
                              <Draggable key={p.id} draggableId={p.id} index={i}>
                                {(provided) => (
                                  <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    className="flex items-center bg-white shadow border px-3 py-2 rounded gap-2"
                                  >
                                    <span className="text-pink-600 font-bold">
                                      {i + 1}.
                                    </span>

                                    <input
                                      className="bg-transparent outline-none text-sm"
                                      value={p.name}
                                      onChange={(e) =>
                                        setPhases((prev) =>
                                          prev.map((item) =>
                                            item.id === p.id
                                              ? { ...item, name: e.target.value }
                                              : item
                                          )
                                        )
                                      }
                                    />

                                    <button
                                      type="button"
                                      className="text-red-500"
                                      onClick={() =>
                                        setPhases((prev) =>
                                          prev.filter((item) => item.id !== p.id)
                                        )
                                      }
                                    >
                                      ×
                                    </button>
                                  </div>
                                )}
                              </Draggable>
                            ))}

                            {provided.placeholder}
                          </div>
                        )}
                      </Droppable>
                    </DragDropContext>

                    <button
                      type="button"
                      className="text-pink-600 mt-3"
                      onClick={() =>
                        setPhases((prev) => [
                          ...prev,
                          { id: nanoid(), name: "" },
                        ])
                      }
                    >
                      + Add Phase
                    </button>
                  </div>
                </div>

                {/* ✅ Buttons */}
                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowCategoryForm(false)}
                    className="px-6 py-2 border rounded"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2 bg-pink-500 text-white rounded"
                  >
                    Save Category
                  </button>
                </div>
              </form>
            </div>
          )}
        </>
      )}
    </div>
  );
}