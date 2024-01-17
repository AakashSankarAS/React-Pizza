import { formatCurrency } from '../../utils/helpers';

function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item;

  return (
    <li className="flex items-center justify-between py-1">
      <p>
        <span className=" font-semibold">{quantity}&times;</span> {name}
        <p className="text-sm font-semibold capitalize text-stone-400">
          {isLoadingIngredients ? 'loading...' : ingredients.join(',')}
        </p>
      </p>
      <p className="text-sm font-semibold">{formatCurrency(totalPrice)}</p>
    </li>
  );
}

export default OrderItem;
