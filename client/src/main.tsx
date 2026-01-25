import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";

// Components & Pages
import AppLayout from "./layout/AppLayout";
import ErrorPage from "./pages/ErrorPage";
import Homepage from "./pages/HomePage";
import Dashboard from "./pages/DashboardPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";

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
            path : "signup",
            element: <SignupPage />
         },
         {
            path : "login",
            element: <LoginPage />
         },
         {
            path: "dashboard",
            element: <Dashboard />,
         },
         {
            path: "inventory",
            element: <div className="p-8">Inventory Module (Coming Soon)</div>,
         },
      ],
   },
]);

createRoot(document.getElementById("root")!).render(
   <StrictMode>
      <RouterProvider router={router} />
   </StrictMode>,
);
