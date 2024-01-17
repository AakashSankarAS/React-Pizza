// Test ID: IIDSAT

import { useFetcher, useLoaderData, useParams } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from '../../utils/helpers';
import OrderItem from './OrderItem';
import { useEffect } from 'react';
import UpdatePriority from '../../ui/UpdatePriority';
function Order() {
  useParams();
  const order = useLoaderData();

  const fetcher = useFetcher();

  useEffect(() => {
    if (!fetcher.data && fetcher.state === 'idle') fetcher.load('/menu');
  }, [fetcher]);

  const isFetcherLoading = fetcher.state === 'loading';
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
    id,
  } = order;

  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="m-5">
      <div className="mb-7 flex justify-between">
        <h2 className="text-xl font-bold">Order #{id} Status</h2>

        <div className="space-x-2">
          {priority && (
            <span className=" rounded-full bg-red-500 px-2 py-1 font-semibold uppercase text-white">
              Priority
            </span>
          )}
          <span className=" rounded-full bg-green-500 px-2 py-1 font-semibold uppercase text-white">
            {status} order
          </span>
        </div>
      </div>

      <div className=" mb-5 flex items-center justify-between bg-stone-300 p-4">
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : 'Order should have arrived'}
        </p>
        <p className="text-xs">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>
      <ul className="dive-stone-200 mb-5 divide-y border-b border-t">
        {cart.map((item) => (
          <OrderItem
            item={item}
            key={item.pizzaId}
            isLoadingIngredients={isFetcherLoading}
            ingredients={
              fetcher?.data?.find((el) => el.id === item.pizzaId)
                ?.ingredients ?? []
            }
          />
        ))}
      </ul>
      <div className="mb-3 justify-between space-y-2 bg-stone-300 p-4">
        <p className="text-sm">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && (
          <p className="text-sm">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="font-semibold ">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>
      {priority ? '' : <UpdatePriority />}
    </div>
  );
}

export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
