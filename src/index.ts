type Methods = "card" | "netbanking" | "wallet" | "emi" | "upi" | "interface Options";

interface Prefill {
	name: string;
	email: string;
	contact: string;
	method: Methods;
}

interface Theme {
	hide_topbar: boolean;
	color: string;
	backdrop_color: string;
}

interface Modal {
	backdropclose: boolean;
	escape: boolean;
	handleback: boolean;
	confirm_close: boolean;
	ondismiss: boolean;
	animation: boolean;
}

interface Readonly {
	contact: boolean;
	email: boolean;
	name: boolean;
}

interface Hidden {
	contact: boolean;
	email: boolean;
}

interface Retry {
	enabled: boolean;
	max_count: number; // Not supported on web integration.
}

interface Config {
	display: {
		language: "en" | "ben" | "hi" | "mar" | "guj" | "tam" | "tel";
	};
}

interface HandlerResponse {
	razorpay_payment_id: string;
	razorpay_subscription_id: string;
	razorpay_signature: string;
}

interface BaseOptions {
	key: string;
	name: string;
	redirect?: boolean;
	customer_id?: string;
	remember_customer?: boolean;
	timeout?: number;
	description?: string;
	image?: string;
	notes?: Record<string, string>;
	prefill: Partial<Prefill>;
	theme: Partial<Theme>;
	modal?: Partial<Modal>;
	readonly?: Partial<Readonly>;
	hidden?: Partial<Hidden>;
	send_sms_hash?: boolean;
	allow_rotation?: boolean;
	retry?: Retry;
	config?: Config;
	callback_url?: string;
	handler?: (response: HandlerResponse) => void;
}

// Either handler function or callback URL can be passed, not both together.
type RazorpayCheckoutOptions = BaseOptions &
	(
		| { callback_url: string; handler?: never }
		| { handler: (response: HandlerResponse) => void; callback_url?: never }
		| { callback_url?: never; handler?: never }
	);

type StandardCheckoutOptions = RazorpayCheckoutOptions & {
	order_id: string;
	amount: number;
	currency: string;
};

type SubscriptionCheckoutOptions = RazorpayCheckoutOptions & {
	subscription_id: string;
	subscription_card_change?: boolean;
	recurring?: boolean;
};

const CHECKOUT_JS = "https://checkout.razorpay.com/v1/checkout.js";

class RazorpayBaseCheckout<T> {
	protected options: T;
	private razorpay: any;

	constructor(options: T) {
		this.options = options;
		this.loadCheckoutScript(this.initializeRazorpay);
	}

	// The callback is to ensure the script is fully loaded before initializing.
	private loadCheckoutScript(callback: () => void): void {
		const checkoutScript = document.createElement("script");
		checkoutScript.src = CHECKOUT_JS;
		checkoutScript.onload = () => callback.call(this);
		document.head.appendChild(checkoutScript);
	}

	private initializeRazorpay(): void {
		this.razorpay = new (window as any).Razorpay(this.options);
	}

	public open(): void {
		if (this.razorpay) this.razorpay.open();
	}
}

// This class is for using with order_id based standard checkout
export class StandardCheckout extends RazorpayBaseCheckout<StandardCheckoutOptions> {}

// This class is for using with subscription_id based subscription checkout
export class SubscriptionCheckout extends RazorpayBaseCheckout<SubscriptionCheckoutOptions> {}
