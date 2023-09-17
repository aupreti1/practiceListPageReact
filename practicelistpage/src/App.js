import React, { useState, useEffect } from 'react';
import './index.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronLeft, faCircle, faCheckCircle, faPlus } from '@fortawesome/free-solid-svg-icons';

const App = () => {
  // HINT: each "item" in our list names a name, a boolean to tell if its been completed, and a quantity
  const [items, setItems] = useState([
    { itemName: 'item 1', quantity: 1, isSelected: false },
    { itemName: 'item 2', quantity: 3, isSelected: true },
    { itemName: 'item 3', quantity: 2, isSelected: false }
  ]);

  const [inputValue, setInputValue] = useState("");
  const [totalItemCount, setTotalItemCount] = useState(6);

  const handleAddButtonClick = () => {
    const newItem = {
      itemName: inputValue,
      quantity: 1,
      isSelected: false,
    }
    const newItems = [...items, newItem];
    setItems(newItems);
    setInputValue("");
  }
  
  const handleQuantIncrease = (index) => {
    const newItems = [...items];
    newItems[index].quantity++;
    setItems(newItems);
    calculateTotal();
  }

  const handleQuantDecrease = (index) => {
    const newItems = [...items];
    newItems[index].quantity--;
    setItems(newItems);
    calculateTotal();
  }

  const handleChecked = (index) => {
    const newItems = [...items];
    newItems[index].isSelected = true;
    setItems(newItems);
  }

  const handleUnchecked = (index) => {
    const newItems = [...items];
    newItems[index].isSelected = false;
    setItems(newItems);
  }

  const calculateTotal = () => {
    const totalItemCount = items.reduce((total,item)=>{
      return total + item.quantity;
    }, 0)
    setTotalItemCount(totalItemCount);
  };

  return (
    <div className='app-background'>
      <div className='main-container'>
        <div className='add-item-box'>
          <input value={inputValue} onChange={(event) => setInputValue(event.target.value)} className='add-item-input' placeholder='Add an item...' />
          <FontAwesomeIcon icon={faPlus} onClick={()=> handleAddButtonClick()}/>
        </div>
        <div className='item-list'>
          {items.map((item, index) =>(
            <div className='item-container'>
              <div className='item-name'>
                {/* HINT: replace false with a boolean indicating the item has been completed or not */}
                {item.isSelected ? (
                  <>
                    <FontAwesomeIcon icon={faCheckCircle} onClick={(()=>handleUnchecked(index))}/>
                    <span className='completed'>{item.itemName}</span>
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCircle} onClick={(()=>handleChecked(index))}/>
                    <span>{item.itemName}</span>
                  </>
                )}
              </div>
              <div className='quantity'>
                <button>
                  <FontAwesomeIcon icon={faChevronLeft} onClick={(()=>handleQuantDecrease(index))}/>
                </button>
                <span> {item.quantity} </span>
                <button>
                  <FontAwesomeIcon icon={faChevronRight} onClick={(()=>handleQuantIncrease(index))} />
                </button>
              </div>
            </div>)
          )}
        </div>
        <div className='total'>Total: {totalItemCount}</div>
      </div>
    </div>
  );
};

export default App;
