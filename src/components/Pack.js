import React from 'react';
import Item from './Item.js'; // Import the Item component

function PackingList({ items, onDelete, onUpdate, onEdit, editItem }) {
  // Only show the item being edited, or show all if not in edit mode
  const itemsToDisplay = editItem ? [editItem] : items;

  return (
    <div className="list">
      <ul>
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} onDelete={onDelete} onUpdate={onUpdate} onEdit={onEdit} />
        ))}
      </ul>
    </div>
  );
}

export default PackingList;
