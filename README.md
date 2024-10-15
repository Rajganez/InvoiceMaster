# InvoiceMaster - Backend

## Overview

InvoiceMaster is a backend system designed to manage invoicing and payment collection for distributors and retailers. Distributors can create invoices and assign them to retailers, while retailers can view their assigned invoices and complete payments online. This project is designed to provide a seamless billing experience for both parties.

In the future, this project can be extended to support specific products and manage all billing-related liabilities.

## Features

- **User Authentication**: Secure login for both distributors and retailers.
- **Invoice Management**: Distributors can create, assign, and manage invoices.
- **Payment Gateway Integration**: Razorpay integration for online payments.
- **Role-based Access Control**: Distributors and retailers have different access levels.
- **Real-time Billing Updates**: View invoices and payment statuses in real-time.

## Technologies Used

- **Node.js**: Backend framework for handling API requests.
- **Express.js**: Web framework for building REST APIs.
- **MongoDB**: Database for storing user, invoice, and payment information.
- **Razorpay**: Payment gateway integration for handling online payments.
- **JWT (jsonwebtoken)**: Token-based authentication for user sessions.
- **Bcrypt**: Secure password hashing and storage.
- **Nodemon**: Development tool for automatic server restarts.
- **Dotenv**: Environment variable management.
- **CORS**: Cross-Origin Resource Sharing for secure communication.
- **Cookie Parser**: Parsing and managing cookies for session control.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) installed on your machine.
- [MongoDB](https://www.mongodb.com/try/download/community) instance running.
- A Razorpay account for payment integration.

### Steps to Run the Project

1.  **Clone the Repository**:

    ```bash
    git clone https://github.com/Rajganez/InvoiceMaster/git

     cd InvoiceMaster/backend

     npm install

    ```

2.  **Set Up Environment Variables**:

```bash
    PORT=5000
    MONGO_URI=mongodb://localhost:27017/invoiceDB
    JWT_SECRET=your_secret_key
    PAYMENT_KEY_ID=your_razorpay_key_id
    PAYMENT_SECRET=your_razorpay_secret
```

3.  **Start the Server**:

```bash
npm run dev
```

## API Endpoints:

**User Authentication**
POST /login: Login/Sigup to the system.

**Invoices**
POST /invoice: Create a new invoice (distributor access).

POST /get-invoices: Get details of a specific invoice.

GET /update-invoice: Update the status invoices by payment (retailer access).

**Payments**
POST /payment-invoice: Initialize payment with Razorpay.

POST /verify-payment: Verify payment signature.

## Future Scope

- **Product Management: Integrate product catalog and inventory management.**

- **Advanced Reporting: Detailed reporting for sales, payments, and invoices.**

- **Tax Calculation: Automated tax calculations for invoices.**

- **Multi-currency Support: Allow transactions in different currencies.**

## Folder structure

InvoiceMaster/
├── backend/ # Backend Folder structure
│ ├── server/
│ | └── controller/ # Controller Folder structure
│ | └── DB/ # DB Folder structure MongoDB Connection file
│ | └── middleware/ # Cookieparser Middleware Folder structure
│ | └── routes/ # Express Router Folder structure
│ └── index.js/ # Main index.js express server file
│
├── frontend/
│ ├── assets/ # Static assets like images, icons
│ ├── components/ # Reusable components
│ ├── pages/ # Page components (Login, distributor, etc.)
│ ├── hooks/ # Custom React hooks
│ ├── zstore/ # Zustand store for state management
│ ├── utils/ # Helper functions and utilities
│ └── App.jsx # Main application component
├── .gitignore # Backend files
├── package.json # Backend files
└── README.md # Backend files

### Key Sections:

- **Overview**: Brief description of the project and its purpose.
- **Features**: Highlighted main features of the backend.
- **Technologies Used**: List of major packages and tools utilized.
- **Installation**: Step-by-step guide for setting up and running the project.
- **API Endpoints**: Basic API structure.
- **Future Scope**: Possible future developments for the project.
- **Folder structure**: Organized structure to give an idea of how the project is set up.

This `README.md` provides a clear and concise overview of the project, making it easier for others to understand and contribute.
