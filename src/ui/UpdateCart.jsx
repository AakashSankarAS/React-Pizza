import React from 'react';
import Button from './Button';
import { useDispatch } from 'react-redux';
import {
  decreaseItemQuantity,
  increaseItemQuantity,
} from '../features/cart/cartSlice';
import Delete from './Delete';

export default function UpdateCart({ id, currentItemQuanity }) {
  const dispatch = useDispatch();

  return (
    <>
      <div className="flex items-center justify-between space-x-2">
        <Button type="small" onClick={() => dispatch(decreaseItemQuantity(id))}>
          -
        </Button>
        <input
          className="w-10 rounded-full bg-stone-200 text-center"
          value={currentItemQuanity}
          disabled
        />
        <Button type="small" onClick={() => dispatch(increaseItemQuantity(id))}>
          +
        </Button>
        <Delete itemId={id} />
      </div>
    </>
  );
}
