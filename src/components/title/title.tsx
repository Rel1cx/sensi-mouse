import React from "react";

import * as css from "./styles.css";

type TitleProps = {
  children?: React.ReactNode;
};

export const Title = React.memo(function Title({ children, ...rest }: TitleProps) {
  return (
    <div className={css.title} {...rest}>
      {children}
    </div>
  );
});
