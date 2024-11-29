import React, { useState } from 'react';

function Stats({ items }) {
    const totalItems = items.length;
    const packedItems = items.filter(item => item.packed).length;
    const packedPercentage = totalItems === 0 ? 0 : Math.round((packedItems / totalItems) * 100);
  
    return (
      <footer className="stats">
        <em>
          You have {totalItems} items in the list. You already packed {packedItems} ({packedPercentage} %).
        </em>
        {packedPercentage === 100 && <p>You got everything!</p>}
      </footer>
    );
  }

export default Stats;