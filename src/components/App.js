import React, { useState } from 'react';

// Initial packing items
const initialItems = [
  { id: 1, description: "Shirt", quantity: 5, packed: true },
  { id: 2, description: "Pants", quantity: 2, packed: false },
];

function Logo() {
  return <h1>My Travel List</h1>;
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    // Validation for description
    if (!description || description.trim() === "") {
      alert("Please enter a valid description!");
      return;
    }

    // Create a new item object
    const newItem = {
      id: Date.now(), // Unique timestamp-based ID
      description: description.trim(),
      quantity,
      packed: false,
    };

    // Use the prop to handle the addition of a new item
    onAddItems(newItem);

    // Clear input fields after submission
    setDescription("");
    setQuantity(1);
  }

  function handleQuantityChange(e) {
    setQuantity(Number(e.target.value));
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need to pack?</h3>
      <select value={quantity} onChange={handleQuantityChange}>
        <option value={1}>1</option>
        <option value={2}>2</option>
        <option value={3}>3</option>
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit">Add</button>
    </form>
  );
}




function Item({ item }) {

  const itemDone = item.packed ? { textDecoration: 'line-through' } : {};

  return (
    <li style={itemDone}>
      {item.description} ({item.quantity})
    </li>
  );
}

function PackingList({ items }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}



function Stats() {
  return (
    <footer className="stats">
      <em>You have X items in the list. You already packed Y (Z%).</em>
    </footer>
  );
}

function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((prevItems) => [item, ...prevItems]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItems={handleAddItems} />
      <PackingList items={items} />
      <Stats />
    </div>
  );
}


export default App;
