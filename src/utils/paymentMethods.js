// Payment methods configuration
// Update these with your actual payment methods

export const PAYMENT_METHODS = {
  paypal: 'your-paypal@email.com',
  venmo: '@your-venmo',
  cashapp: '$your-cashapp',
  zelle: 'your-zelle@email.com',
  crypto: 'bc1q...your-btc-address'
};

export const getPaymentMethodsText = () => {
  return `Payment Methods:
  
PayPal: ${PAYMENT_METHODS.paypal}
Venmo: ${PAYMENT_METHODS.venmo}
CashApp: ${PAYMENT_METHODS.cashapp}
Zelle: ${PAYMENT_METHODS.zelle}
Crypto (BTC): ${PAYMENT_METHODS.crypto}

Please send payment using one of the methods above. Once payment is confirmed, you will receive your account credentials.`;
};
