import { type ReactElement } from "react";
import { useRouteError } from "react-router-dom";

interface RouteError {
  statusText?: string;
  message?: string;
}

function ErrorPage(): ReactElement {
  const routeError = useRouteError() as RouteError | null;

  const routeErrorComponent = (
    <div>
      <h1>Something went wrong, please check the route...</h1>
      <p>
        <i>{routeError?.statusText || routeError?.message}</i>
      </p>
    </div>
  );

  if (routeError) return routeErrorComponent;
  else return <>An error occured please check console</>;
}

export default ErrorPage;
