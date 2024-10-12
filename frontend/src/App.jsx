import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { lazy, Suspense } from "react";
const AuthPage = lazy(() => import("./pages/AuthPage"));
const Distributor = lazy(() => import("./pages/Distributor"));
const Billing = lazy(() => import("./pages/Billing"));
const Retailer = lazy(() => import("./pages/Retailer"));

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <AuthPage /> },
    { path: "/distributor", element: <Distributor /> },
    { path: "/billing", element: <Billing /> },
    { path: "/retailer", element: <Retailer /> },
  ]);
  return (
    <>
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500"></div>
          </div>
        }
      >
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </>
  );
}

export default App;
