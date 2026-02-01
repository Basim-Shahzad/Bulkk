import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// Components & Pages
import AppLayout from "./layout/AppLayout";
import ErrorPage from "./pages/ErrorPage";
import Homepage from "./pages/HomePage";
import Dashboard from "./pages/DashboardPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

// Provides
import { AuthProvider } from "./features/auth/AuthContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductsPage from "./pages/ProductsPage";

const router = createBrowserRouter([
   {
      path: "/",
      element: <AppLayout />,
      errorElement: <ErrorPage />, // Global error boundary
      children: [
         {
            index: true,
            element: <Homepage />,
         },
         {
            path: "signup",
            element: <SignupPage />,
         },
         {
            path: "login",
            element: <LoginPage />,
         },
         {
            path: "dashboard",
            element: <Dashboard />,
         },
         {
            path: "inventory",
            element: <div className="p-8">Inventory Module (Coming Soon)</div>,
         },
         {
            path: "products",
            element: <ProductsPage />
         }
      ],
   },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <QueryClientProvider client={queryClient}>
         <AuthProvider>
            <RouterProvider router={router} />
         </AuthProvider>
      </QueryClientProvider>
   </StrictMode>,
);
