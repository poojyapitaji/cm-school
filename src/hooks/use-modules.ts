/* eslint-disable no-console */
import { useEffect, useState } from "react";
import { RouteObject } from "react-router-dom";

import {
  fetchModuleConfigs,
  generateRoutes,
  getAllNavigationMenus,
} from "@/utils";
import { MenuProps, Modules } from "@/types";

function useModules(modules: string[]) {
  const [moduleConfig, setModuleConfig] = useState<Modules[]>([]);
  const [navigationMenus, setNavigationMenus] = useState<MenuProps[]>([]);
  const [routes, setRoutes] = useState<RouteObject[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadModuleConfigs = async () => {
      try {
        setLoading(true);
        const res = await fetchModuleConfigs(modules);

        setModuleConfig(res);
      } catch (error) {
        console.error("Unable to load modules configurations:", error);
      } finally {
        setLoading(false);
      }
    };

    loadModuleConfigs();
  }, [modules]);

  useEffect(() => {
    if (moduleConfig.length > 0) {
      const allNavigation = getAllNavigationMenus(moduleConfig);

      setNavigationMenus(allNavigation);

      const generatedRoutes = generateRoutes(allNavigation);

      setRoutes(generatedRoutes);
    }
  }, [moduleConfig]);

  return { moduleConfig, navigationMenus, routes, loading };
}

export default useModules;
