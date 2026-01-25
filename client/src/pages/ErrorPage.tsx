import { useRouteError, isRouteErrorResponse, Link } from "react-router-dom";

const ErrorPage = () => {
   const error = useRouteError();

   return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center">
         <h1 className="text-6xl font-bold text-blue-600 mb-4">Oops!</h1>
         <p className="text-xl text-gray-800 mb-2">Something went wrong.</p>
         <p className="text-gray-500 mb-8">
            {isRouteErrorResponse(error) ? error.statusText || error.data.message : "An unexpected error occurred."}
         </p>
         <Link
            to="/"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
            Back to Safety
         </Link>
      </div>
   );
};

export default ErrorPage;
   