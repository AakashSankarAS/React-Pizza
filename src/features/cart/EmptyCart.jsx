import BackButton from '../../ui/BackButton';

function EmptyCart() {
  return (
    <div>
      <BackButton
        className="text-sm text-blue-500 hover:text-blue-700 hover:underline"
        to="/menu"
      >
        &larr; Back To Menu
      </BackButton>

      <p className="mt-2 font-semibold text-stone-400">
        Your cart is still empty. Start adding some pizzas :)
      </p>
    </div>
  );
}

export default EmptyCart;
