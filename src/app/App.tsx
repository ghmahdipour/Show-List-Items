import { lazy, Suspense } from "react";
import { useRoutes } from "react-router-dom";
import { Helmet } from "react-helmet";
import PublicLayout from "../components/Layout/PublicLayout";
import Loading from "./Loading";
import './App.css';


function App() {
  const routes = useRoutes([
    {
      path: "/",
      element: <PublicLayout />
    }
  ]);
  return (
    <>
      <Helmet>
        <title>My List Items</title>
        <meta name="description" content="My List Items" />
      </Helmet>
      <Suspense>
        <div className="App min-h-screen bg-gray-100 ">{routes}</div>
      </Suspense>
    </>
  );
}

export default App;
