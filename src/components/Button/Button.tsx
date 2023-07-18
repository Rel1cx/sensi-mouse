import { Button as MTButton, type ButtonProps as MTButtonProps } from "@mantine/core"
import React from "react"

type ButtonProps = MTButtonProps &
    React.PropsWithChildren & {
        onClick?: () => void
    }

export const Button = React.memo(({ children, ...rest }: ButtonProps) => {
    return (
        <MTButton
            style={{
                transition: "all 120ms ease-out",
            }}
            gradient={{ deg: 35, from: "#ed6ea0", to: "#ec8c69" }}
            size="xs"
            variant="gradient"
            compact
            {...rest}
        >
            {children}
        </MTButton>
    )
})
