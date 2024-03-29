import { Text } from "@mantine/core";
import { getName, getVersion } from "@tauri-apps/api/app";
import React from "react";
import { suspend } from "suspend-react";

import * as css from "./styles.css";

const About = React.memo(function App() {
  const name = suspend(getName);
  const version = suspend(getVersion);

  return (
    <div className={css.container}>
      <img alt="logo" height="44px" src="/icon.png" width="auto" />
      <React.Suspense>
        <Text size="12px">{name}</Text>
        <Text size="10px">Version: {version}</Text>
      </React.Suspense>
      <Text ta="center" size="10px">
        Copyright © 2023 Eva1ent{" | "}
        <a
          className={css.link}
          href="https://raw.githubusercontent.com/Rel1cx/sensi-mouse/main/LICENSE"
          rel="noopener noreferrer"
          target="_blank"
        >
          MIT License
        </a>
      </Text>
    </div>
  );
});

export default About;
