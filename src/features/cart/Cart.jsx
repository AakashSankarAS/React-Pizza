import { useDispatch, useSelector } from 'react-redux';
import BackButton from '../../ui/BackButton';
import Button from '../../ui/Button';
import CartItem from './CartItem';
import { clearCart, getCart } from './cartSlice';
import EmptyCart from './EmptyCart';

function Cart() {
  const cart = useSelector(getCart);

  const username = useSelector((store) => store.user.userName);

  const dispatch = useDispatch();

  const handleClear = () => {
    dispatch(clearCart());
  };

  if (!cart.length) return <EmptyCart />;
  return (
    <div className=" ml-3 mt-3">
      <BackButton
        className=" text-sm text-blue-500 hover:text-blue-700 hover:underline"
        to="/menu"
      >
        &larr; Back to menu
      </BackButton>

      <h2 className="mt-8 font-bold">Your cart, {username}</h2>
      <ul className="mt-8 divide-y">
        {cart.map((item) => (
          <CartItem item={item} key={item.pizzaId} />
        ))}
      </ul>
      <div className="my-4 flex space-x-4">
        <Button type="primary" to="/order/new">
          Order pizzas
        </Button>
        <Button onClick={handleClear} type="secondary">
          Clear cart
        </Button>
      </div>
    </div>
  );
}

export default Cart;
