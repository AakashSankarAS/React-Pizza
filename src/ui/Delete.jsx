import React from 'react';
import Button from './Button';
import { deleteItem } from '../features/cart/cartSlice';
import { useDispatch } from 'react-redux';

export default function Delete({ itemId }) {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(deleteItem(itemId));
  };
  return (
    <Button onClick={handleClick} type="primary">
      Delete
    </Button>
  );
}
