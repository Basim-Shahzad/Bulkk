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
import CustomersPage from "./pages/CustomersPage";
import ProtectedRoute from "./features/auth/components/ProtectedRoute";

// Provides
import { AuthProvider } from "./features/auth/AuthContext";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductsPage from "./pages/ProductsPage";
import AdminPage from "./pages/AdminPage";
import SalesPage from "./pages/SalesPage";

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
            element: (
               <ProtectedRoute>
                  <Dashboard />
               </ProtectedRoute>
            ),
         },
         {
            path: "products",
            element: (
               <ProtectedRoute>
                  <ProductsPage />
               </ProtectedRoute>
            ),
         },
         {
            path: "customers",
            element: (
               <ProtectedRoute>
                  <CustomersPage />
               </ProtectedRoute>
            ),
         },
         {
            path: "sales",
            element: (
               <ProtectedRoute>
                  <SalesPage />
               </ProtectedRoute>
            ),
         },
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
