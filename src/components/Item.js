function Item({ item, onDelete, onUpdate, onEdit }) {
    const itemDone = item.packed ? { textDecoration: 'line-through' } : {};
  
    return (
      <li style={itemDone}>
        <input
          type="checkbox"
          checked={item.packed}
          onChange={() => onUpdate(item.id)} // Trigger the update function on change
          style={{ marginRight: "10px" }}
        />
        {item.description} ({item.quantity})
        <button onClick={() => onDelete(item.id)}>❌</button>
        <button onClick={() => onEdit(item)}>✏️</button> {/* Edit Button */}
      </li>
    );
  }

export default Item;