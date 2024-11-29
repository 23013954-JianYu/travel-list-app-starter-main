// @flow

import React, { useState } from 'react';
import Logo from "./Logo.js"
import Form from "./Form.js"
import PackingList from './Pack.js';
import Stats from './Stat.js';
import { initialItems } from './Data.js'; 

// Initial packing items

function App() {
  const [items, setItems] = useState(initialItems);
  const [sortOrder, setSortOrder] = useState('input');
  const [searchQuery, setSearchQuery] = useState('');
  const [editItem, setEditItem] = useState(null); // State for editing

  function handleAddItems(item) {
    setItems((prevItems) => [item, ...prevItems]);
  }

  function handleDeleteItem(id) {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  }

  function handleUpdateItem(id) {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleSortItems(order) {
    setSortOrder(order);
  }

  function handleSearch(query) {
    setSearchQuery(query); // Update search query in state
  }

  // Function to handle the edit action
  function handleEditItem(item) {
    setEditItem(item); // Set the item to be edited
  }

  function handleClearItems() {
    setItems([]); // Clear the list
    setEditItem(null); // Clear the edit state
  }

  // Filter items based on the search query
  const filteredItems = items.filter((item) =>
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Sort the filtered items based on the selected sortOrder
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortOrder) {
      case 'input': // Sort by input order (by ID)
        return a.id - b.id;
      case 'description': // Sort by description alphabetically
        return a.description.localeCompare(b.description);
      case 'packed': // Sort by packed status
        return a.packed === b.packed ? 0 : a.packed ? 1 : -1;
      default:
        return 0;
    }
  });

  return (
    <div className="app">
      <Logo />
      <Form
        onAddItems={handleAddItems}
        sortOrder={sortOrder}
        onSort={handleSortItems}
        onClearItems={handleClearItems}
        onSearch={handleSearch}
        editItem={editItem} // Pass the item to edit
        onEditItem={(updatedItem) => {
          setItems((prevItems) =>
            prevItems.map((item) =>
              item.id === updatedItem.id ? updatedItem : item
            )
          );
          setEditItem(null); // Clear the edit item after update
        }}
      />
      <PackingList items={sortedItems} onDelete={handleDeleteItem} onUpdate={handleUpdateItem} onEdit={handleEditItem} />
      <Stats items={sortedItems} />
    </div>
  );
}

export default App;

