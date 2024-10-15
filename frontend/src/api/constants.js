export const HOST = import.meta.env.VITE_SERVER_URL;

//---------------Auth Routes-------------------------//

export const AUTH_ROUTE = "/auth";
export const LOGIN_ROUTE = `${AUTH_ROUTE}/login`;
export const RETAILERS_ROUTE = `${AUTH_ROUTE}/retailers`;
export const LOGOUT_ROUTE = `${AUTH_ROUTE}/log-out`;

//---------------Invoice Routes----------------------//

export const INVOICES_ROUTE = "/bill";
export const CREATE_INVOICE_ROUTE = `${INVOICES_ROUTE}/invoice`;
export const GET_INVOICE_ROUTE = `${INVOICES_ROUTE}/get-invoices`;
export const BILLING_INVOICE_ROUTE = `${INVOICES_ROUTE}/billing-invoice`;
export const UPDATE_INVOICE_ROUTE = `${INVOICES_ROUTE}/update-invoice`;

//---------------Payment Routes----------------------//

export const PAYMENT_ROUTES = "/gateway";
export const PAYMENT_INVOICE = `${PAYMENT_ROUTES}/payment-invoice`;
export const PAYMENT_VERIFICATION = `${PAYMENT_ROUTES}/verify-payment`;
