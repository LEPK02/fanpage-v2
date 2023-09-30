import { Breadcrumb, Container } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import routes from "../routes";

import { useSelector } from "react-redux";

import "./SiteMap.css";

export const SiteMap = () => {
  // themeSlice from Redux
  const themeSecondary = useSelector((state) => state.theme.themeSecondary);

  const currentPath = useLocation().pathname;

  const generateBreadcrumb = () => {
    const pathArr = currentPath.split("/").filter(val => val !== "").map((element) => element = '/'+element);
    const overallRouteArr = [routes.find((route) => route.path === "/")];
    const routeIdxArr = [];

    pathArr.forEach((path, index, array) => {
      // Pick up where we left off in routes from previous loop
      let currentRouteArr = routes;
      routeIdxArr.forEach(routeIdx => currentRouteArr = currentRouteArr[routeIdx].children);

      // Look for desired path in routes
      let breadCrumbIdx = currentRouteArr.findIndex((route) => route.path === path);
      if (breadCrumbIdx >= 0) {
        // Add route to breadcrumb arr
        overallRouteArr.push(currentRouteArr[breadCrumbIdx]);

        // Stop searching for breadcrumbs if no further routes
        if (
          !currentRouteArr[breadCrumbIdx].hasOwnProperty("children") ||
          !currentRouteArr[breadCrumbIdx].children
        ) return;

        // Track route index for navigating the next breadcrumb
        routeIdxArr.push(breadCrumbIdx);
      }
    });

    // For current page's breadcrumb to be inactive upon render
    if (overallRouteArr.length > 1) {
      overallRouteArr[overallRouteArr.length-1].isCurrent = true;
      return overallRouteArr;
    }

    return [];
  }

  return (
    <Container id="breadcrumb-container" fluid>
      <Breadcrumb>
        {
          generateBreadcrumb().map((route, key) =>
            route.isCurrent ? (
              <Breadcrumb.Item
                key={`breadcrumb-${key}`}
                active
                className={`breadcrumb-${themeSecondary}`}
              >
                {route.name}
              </Breadcrumb.Item>
            ) : (
              <Breadcrumb.Item
                key={`breadcrumb-${key}`}
                linkProps={{ to: route.path }}
                linkAs={Link}
                className={`breadcrumb-${themeSecondary}`}
              >
                {route.name}
              </Breadcrumb.Item>
            )
          )}
      </Breadcrumb>
    </Container>
  );
};