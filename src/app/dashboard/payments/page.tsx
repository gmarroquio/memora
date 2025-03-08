import { Elements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(
  "pk_test_51NWPkUE4vJuSIv12WyAp9V9PBvjTq2FKWdxjfchLcUARGaR78NGcEJ4FdwLrpCmlDPcbhtfcX1wQblxio1qKq33I00czMFFO26"
);

export default function Page() {
  const options = {
    // passing the client secret obtained from the server
    clientSecret: "{{CLIENT_SECRET}}",
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      <form>
        <PaymentElement />
        <button>Submit</button>
      </form>
    </Elements>
  );
}
