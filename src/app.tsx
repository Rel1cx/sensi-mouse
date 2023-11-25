import { MantineProvider } from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import React, { lazy, Suspense, useMemo } from "react";
import { match } from "ts-pattern";

import { Router } from "@/router";
import { mantineTheme } from "@/theme/mantine.config";

import * as css from "./app.css";

const Main = lazy(() => import("./pages/main/main"));
const About = lazy(() => import("./pages/about/about"));
const Preferences = lazy(() => import("./pages/preferences/preferences"));

export const App = React.memo(function App() {
  const preferredColorScheme = useColorScheme();

  const theme = useMemo(() => ({ ...mantineTheme, colorScheme: preferredColorScheme }), [preferredColorScheme]);

  const route = Router.useRoute(["Main", "About", "Preferences"]);

  return (
    <MantineProvider theme={theme}>
      <main className={css.appShellScreen}>
        <Suspense>
          {useMemo(
            () =>
              match(route)
                .with({ name: "Main" }, () => <Main />)
                .with({ name: "About" }, () => <About />)
                .with({ name: "Preferences" }, () => <Preferences />)
                .otherwise(() => null),
            [route],
          )}
        </Suspense>
      </main>
    </MantineProvider>
  );
});
