import { Navigate, Route, Routes } from "react-router-dom";
import React from "react";

import { RouteProviderWrapper } from "./route-provider-wrapper";

import useModules from "@/hooks/use-modules";
import DefaultLayout from "@/layouts/default";

const activeModules = ["front-office", "income"];

function App() {
  const { navigationMenus, routes, loading } = useModules(activeModules);

  if (loading) {
    return <h1>Loading....</h1>;
  }

  return (
    <DefaultLayout menus={navigationMenus}>
      <Routes>
        <Route
          element={<Navigate to={"/front-office/admission-enquiry"} />}
          path="/"
        />
        {routes.map((route, index) => (
          <Route
            key={index}
            element={
              <React.Suspense fallback={<div>Loading...</div>}>
                {/* @ts-ignore */}
                <RouteProviderWrapper providers={route.providers || []}>
                  {/* @ts-ignore */}
                  <route.element />
                </RouteProviderWrapper>
              </React.Suspense>
            }
            path={route.path}
          />
        ))}
      </Routes>
    </DefaultLayout>
  );
}

export default App;
