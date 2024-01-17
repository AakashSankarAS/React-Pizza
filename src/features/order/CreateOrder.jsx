import { useState } from 'react';
import {
  Form,
  redirect,
  useActionData,
  useNavigate,
  useNavigation,
} from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';

import Button from '../../ui/Button';
import { useDispatch, useSelector } from 'react-redux';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import { formatCurrency } from '../../utils/helpers';
import store from '../../store';
import { fetchAddress } from '../user/userSlice';
import EmptyCart from '../cart/EmptyCart';
// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);

  const cartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = cartPrice * 0.2;
  const totalCartPrice = withPriority ? cartPrice + priorityPrice : cartPrice;

  const navigate = useNavigation();

  const isSubmitting = navigate.state === 'submitting';
  const { userName, status, position, address, error } = useSelector(
    (store) => store.user,
  );

  const formError = useActionData();
  const dispatch = useDispatch();

  if (!cart.length) return <EmptyCart />;
  return (
    <div className="mx-3 flex flex-col">
      <h2 className="my-5 text-xl font-semibold text-stone-600">
        Ready to order? Let's go!
      </h2>

      <Form method="POST">
        <div className="flex flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input my-2 bg-white transition-none sm:grow sm:p-5"
            type="text"
            name="customer"
            defaultValue={userName}
            required
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input
              className="input my-2 w-full bg-white sm:p-5"
              type="tel"
              name="phone"
              required
            />
            {formError?.phone && (
              <p className="mb-2 rounded-full bg-red-400 px-3 py-1">
                {formError.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative flex flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input my-2 w-full bg-white sm:p-5 "
              type="text"
              name="address"
              required
              disabled={status === 'loading'}
              defaultValue={address}
            />
            {!position.longitude && !position.latitude && (
              <Button
                className=" absolute right-1 top-[34px] sm:top-[10px]  "
                type="small"
                disabled={status === 'loading'}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Location
              </Button>
            )}
            {status === 'error' && (
              <p className="mb-2 rounded-full bg-red-400 px-3  py-1">{error}</p>
            )}
          </div>
        </div>

        <div className="mt-5 flex items-center">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="mr-5 h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label
            htmlFor="priority"
            className="text-sm font-semibold tracking-wide"
          >
            Want to yo give your order priority?
          </label>
        </div>

        <div className="mt-5 tracking-wider">
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude},${position.longitude}`
                : ''
            }
          />
          <Button type="primary" disabled={isSubmitting}>
            {isSubmitting
              ? 'Submitting...'
              : `Order now for ${formatCurrency(totalCartPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);

  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true',
  };

  const error = {};
  if (!isValidPhone(order.phone))
    error.phone =
      'Please enter a vlid mobile number. so,that we can contact you';

  if (Object.keys(error).length > 0) return error;

  const newOrder = await createOrder(order);

  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
