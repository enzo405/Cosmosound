import { type ReactElement } from "react";
import { useRouteError } from "react-router-dom";

interface RouteError {
  status?: number;
  statusText?: string;
  message?: string;
}

function ErrorPage(): ReactElement {
  const routeError = useRouteError() as RouteError | null;

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold text-red-500 mb-4">Oops! Something went wrong.</h1>
      <p className="text-lg mb-6 text-center">
        We're sorry for the inconvenience. Here are the details:
      </p>
      {routeError ? (
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
          {routeError.status && (
            <p className="mb-2">
              <span className="font-semibold">Status Code:</span> {routeError.status}
            </p>
          )}
          {routeError.statusText && (
            <p className="mb-2">
              <span className="font-semibold">Status Text:</span> {routeError.statusText}
            </p>
          )}
          {routeError.message && (
            <p className="mb-2">
              <span className="font-semibold">Message:</span> {routeError.message}
            </p>
          )}
        </div>
      ) : (
        <p className="text-center text-gray-600">
          An unknown error occurred. Please check the console for more details.
        </p>
      )}
      <button
        onClick={() => window.location.reload()}
        className="mt-6 bg-primary-orange text-white px-4 py-2 rounded-lg hover:bg-tertio-orange transition">
        Reload Page
      </button>
    </div>
  );
}

export default ErrorPage;
