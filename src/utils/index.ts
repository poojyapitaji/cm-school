/* eslint-disable no-console */

import { ElementType, ReactNode } from "react";

import { CustomProviderRouteObject, MenuProps, Modules } from "@/types";

export const fetchModuleConfigs = async (
  activeModules: string[]
): Promise<Modules[]> => {
  try {
    const configs = await Promise.all(
      activeModules.map(async (moduleName) => {
        const modules = await import(`../modules/${moduleName}/config.ts`);

        return modules;
      })
    );

    return configs as any;
  } catch (error) {
    throw error;
  }
};

export const getAllNavigationMenus = (modules: Modules[]): MenuProps[] => {
  const sortedModules = [...modules].sort(
    (a, b) => a.init.placement - b.init.placement
  );

  return sortedModules.flatMap((module) => module.navigation) as MenuProps[];
};

export const isValidElementType = (
  icon: ReactNode | ElementType
): icon is ElementType => {
  return (
    typeof icon === "function" ||
    (typeof icon === "object" && icon !== null && "type" in icon)
  );
};

export const generateRoutes = (
  navigation: MenuProps[]
): CustomProviderRouteObject[] => {
  const routes: CustomProviderRouteObject[] = [];

  navigation.forEach((menu) => {
    menu.menus.forEach((item) => {
      if (item.element) {
        routes.push({
          path: item.href,
          element: item.element as any,
          providers: [
            ...(menu.globalProviders || []),
            ,
            ...((item.providers as any) || []),
          ],
        });
      }
    });
  });

  return routes;
};
