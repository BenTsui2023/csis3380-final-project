import React, { useState } from 'react';

function Filter({ onFilterChange, onReset }) {
  const [name, setName] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleMinPriceChange(e) {
    setMinPrice(e.target.value);
  }

  function handleMaxPriceChange(e) {
    setMaxPrice(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onFilterChange({ name, minPrice, maxPrice });
  }

  function handleReset(){
    setName('');
    setMinPrice('');
    setMaxPrice('');
    onReset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Meal Name:</label>
        <input type="text" id="name" value={name} onChange={handleNameChange} />
      </div>
      <div>
        <label htmlFor="minPrice">Min Price:</label>
        <input type="number" id="minPrice" value={minPrice} onChange={handleMinPriceChange} />
      </div>
      <div>
        <label htmlFor="maxPrice">Max Price:</label>
        <input type="number" id="maxPrice" value={maxPrice} onChange={handleMaxPriceChange} />
      </div>
      <button type="reset" onClick={handleReset}>Reset</button>
      <button type="submit">Filter</button>
    </form>
  );
}

export default Filter;