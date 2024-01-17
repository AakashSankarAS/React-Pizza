import { useDispatch, useSelector } from 'react-redux';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { addItem, getCurrentItemQuantity } from '../cart/cartSlice';
import UpdateCart from '../../ui/UpdateCart';

function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  const currentItemQuanity = useSelector(getCurrentItemQuantity(id));

  const isInCart = currentItemQuanity > 0;
  const handleClick = () => {
    const newItem = {
      pizzaId: id,
      name,
      unitPrice,
      quantity: 1,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newItem));
  };

  return (
    <li className="flex gap-4 py-2">
      <img
        className={`h-24 ${soldOut ? 'opacity-[.7] grayscale' : ' '}`}
        src={imageUrl}
        alt={name}
      />
      <div className="flex grow flex-col">
        <p className="font-semibold">{name}</p>
        <p className=" text-sm capitalize italic text-stone-500 ">
          {ingredients.join(', ')}
        </p>
        <div className=" mt-auto flex items-center justify-between ">
          {!soldOut ? (
            <>
              <p className="text-sm ">{formatCurrency(unitPrice)}</p>

              {!isInCart ? (
                <Button onClick={handleClick} type="primary">
                  Add To Cart
                </Button>
              ) : (
                <UpdateCart id={id} currentItemQuanity={currentItemQuanity} />
              )}
            </>
          ) : (
            <p className="text-sm font-medium text-stone-500">Sold out</p>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
