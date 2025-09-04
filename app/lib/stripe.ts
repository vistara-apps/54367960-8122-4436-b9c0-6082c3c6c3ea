import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-11-20.acacia',
});

export interface PaymentIntentData {
  amount: number; // in cents
  description: string;
  metadata?: Record<string, string>;
}

export async function createPaymentIntent(data: PaymentIntentData) {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: data.amount,
      currency: 'usd',
      description: data.description,
      metadata: data.metadata,
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return {
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);
    throw error;
  }
}

export async function confirmPayment(paymentIntentId: string) {
  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    
    return {
      status: paymentIntent.status,
      amount: paymentIntent.amount,
      paid: paymentIntent.status === 'succeeded',
    };
  } catch (error) {
    console.error('Error confirming payment:', error);
    throw error;
  }
}

// Pricing configuration
export const PRICING = {
  AD_GENERATION: 100, // $1.00 in cents for 5 variations
  AUTO_POST: 50,      // $0.50 in cents per post cycle
  STARTER_PACK: 800,  // $8.00 in cents for 10 generations
};

export { stripe };
