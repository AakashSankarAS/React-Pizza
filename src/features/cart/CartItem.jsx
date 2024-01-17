import { formatCurrency } from '../../utils/helpers';

import UpdateCart from '../../ui/UpdateCart';

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className=" flex flex-col justify-between gap-4 sm:flex-row">
      <p>
        {quantity}&times; {name}
      </p>
      <div className=" mb-2 flex items-center justify-between">
        <p className="  text-sm font-semibold sm:mx-8">
          {formatCurrency(totalPrice)}
        </p>
        <UpdateCart currentItemQuanity={quantity} id={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
