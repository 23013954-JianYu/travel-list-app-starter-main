import React, { useState, useEffect } from 'react';

function Form({ onAddItems, sortOrder, onSort, onClearItems, onSearch, editItem, onEditItem }) {
  const [description, setDescription] = useState(editItem ? editItem.description : "");
  const [quantity, setQuantity] = useState(editItem ? editItem.quantity : 1);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  // Reset description if editItem changes
  useEffect(() => {
    if (editItem) {
      setDescription(editItem.description); // Set to the description of the item being edited
      setQuantity(editItem.quantity); // Set quantity to match the item being edited
    } else {
      setDescription(""); // Reset description if not editing
      setQuantity(1); // Reset quantity to 1 if not editing
    }
  }, [editItem]); // Only run when editItem changes

  function handleSubmit(e) {
    e.preventDefault();

    // Validation for description
    if (!description || description.trim() === "") {
      alert("Please enter a valid description!");
      return;
    }

    if (editItem) {
      // If we're editing, update the item
      onEditItem({ ...editItem, description: description.trim(), quantity });
    } else {
      // Create a new item if we're not editing
      const newItem = {
        id: Date.now(), // Unique timestamp-based ID
        description: description.trim(),
        quantity,
        packed: false,
      };

      onAddItems(newItem); // Add new item
    }

    // Clear input fields after submission (only when adding, not editing)
    if (!editItem) {
      setDescription(""); // Reset description after adding new item
      setQuantity(1); // Reset quantity after adding new item
    }
  }

  function handleQuantityChange(e) {
    setQuantity(Number(e.target.value));
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>{editItem ? "Edit Item" : "What do you need to pack?"}</h3>
      <select value={quantity} onChange={handleQuantityChange}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description} // Ensure input value is controlled by description state
        onChange={(e) => setDescription(e.target.value)} // Update description on input change
      />
      <button type="submit">{editItem ? "Update" : "Add"}</button>

      {/* Only show these buttons if not editing */}
      {!editItem && (
        <>
          <button type="button" onClick={onClearItems}>
            Clear All Items
          </button>

          {/* Sort By dropdown */}
          <div>
            <label htmlFor="sortOrder">Sort By: </label>
            <select id="sortOrder" value={sortOrder} onChange={(e) => onSort(e.target.value)}>
              <option value="input">Input Order</option>
              <option value="description">Description</option>
              <option value="packed">Packed Status</option>
            </select>
          </div>

          {/* Search Bar */}
          <div>
            <label htmlFor="search">Search Items: </label>
            <input
              type="text"
              id="search"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                onSearch(e.target.value); // Pass the query to the parent component's onSearch function
              }}
              placeholder="Search by description"
            />
          </div>
        </>
      )}
    </form>
  );
}

export default Form;
