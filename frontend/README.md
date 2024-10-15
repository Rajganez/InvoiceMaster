# InvoiceMaster - Frontend

## Overview

InvoiceMaster is a web application that facilitates distributors and retailers in managing their billing and payment processes. The frontend provides an intuitive and user-friendly interface for both roles, allowing distributors to create and assign invoices, while retailers can view their assigned invoices and make payments online.

The application leverages modern web technologies, including ShadCN for the interface components, Axios for API communication, and Framer Motion for smooth animations.

## Features

- **Role-based Interface**: Distributors and retailers see different pages based on their roles.
- **Invoice Display**: Retailers can view their invoices with detailed information.
- **Online Payment**: Integrated with Razorpay for seamless payment processing.
- **Responsive Design**: TailwindCSS is used to ensure a fully responsive layout.
- **Animations**: Framer Motion adds smooth animations for a modern UI experience.

## Technologies Used

- **React**: Core library for building the user interface.
- **React Router DOM**: Routing for different pages and user navigation.
- **Axios**: HTTP client for making API requests to the backend.
- **Zustand**: State management solution for handling application-wide state.
- **TailwindCSS**: Utility-first CSS framework for fast UI development.
- **Radix UI**: Set of high-quality and accessible React components for the interface.
- **Framer Motion**: Library for animations.
- **Lucide React**: A simple and beautiful icon library for React.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/en/download/) installed on your machine.
- Backend service running for API interaction.

### Steps to Run the Project

1. **Clone the Repository**:

   ```bash
   git clone https://github.com/Rajganez/InvoiceMaster/git

   cd InvoiceMaster/frontend

    npm install
   ```

2. **Set Up Environment Variables**

```bash
VITE_PAYMENT_KEY_ID=your_razorpay_key_id
VITE_BACKEND_URL=http://localhost:5000
```

3. **Start the application**

```bash
npm run dev
```

### Key Features

- **ShadCN UI Components**: Used for modals, dropdown menus, and other UI elements for accessibility and consistency.

- **Google OAuth**: Integrated Google OAuth login with @react-oauth/google.

- **Framer Motion**: Beautiful animations for smooth transitions and interactions.

- **Zustand State Management**: Lightweight and efficient state management for handling application state.

- **TailwindCSS**: Responsive and utility-based CSS for designing the interface quickly and effectively.

### Future Scope

- **Product Management**: Extend the application to handle specific products and services for distributors.

- **Notification System**: Implement real-time notifications for new invoices and payment statuses.

- **Advanced Filtering**: Add filtering options for invoices based on status, date, or retailer.

### Key Sections:

- **Overview**: Brief description of the project and its purpose.
- **Features**: Highlighted main features of the frontend.
- **Technologies Used**: List of major packages and tools utilized.
- **Installation**: Step-by-step guide for setting up and running the project.
- **Key Features**: Special features like Radix UI components and animations.
- **Future Scope**: Possible future developments for the project.

This `README.md` provides a clear and concise overview of the frontend, helping users understand how to set up, run, and contribute to the project.
