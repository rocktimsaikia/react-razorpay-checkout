# react-razorpay-checkout

Razorpay checkout integration for React.

[![npm](https://img.shields.io/npm/v/react-razorpay-checkout?color=bright)](https://npmjs.com/package/react-razorpay-checkout)

## Installtion

```sh
npm i react-razorpay-checkout
```

## Usage

1. If you are using `order_id`, use the below way of initializing a standard checkout:

> Some options are only available/required for the `StandardCheckout` ie. `order_id`, `amount` and `currency`.

```tsx
import { StandardCheckout } from "react-razorpay-checkout"
import type { StandardCheckoutOptions } from "react-razorpay-checkout"

// Define the needed options
const options: StandardCheckoutOptions = {
	key: "RAZORPAY_API_KEY",
	order_id: "sub_00000000000001",
	amount: 240000,
	currency: "INR"
	// other options here
}

// Set up the checkout instance
const razopay = new StandardCheckout(options)

// Open the checkout modal
razorpay.open()
```


2. If you are using `subscription_id`, use the below way of initializing a subscription based checkout:

```tsx
import { SubscriptionCheckout } from "react-razorpay-checkout"
import type { SubscriptionCheckoutOptions } from "react-razorpay-checkout"

// Define the needed options
const options: SubscriptionCheckoutOptions = {
	key: "RAZORPAY_API_KEY",
	subscription_id: "sub_00000000000001",
	// other options here
}

// Set up the checkout instance
const razopay = new SubscriptionCheckout(options)

// Open the checkout modal
razorpay.open()
```

## API
For the complete API reference check the [Razorpay's offical documentation.](https://razorpay.com/docs/payments/payment-gateway/web-integration/standard/integration-steps#123-checkout-options)


## LICENSE

[MIT](./LICENSE) License &copy; [Rocktim Saikia](https://rocktimsaikia.dev) 2025
