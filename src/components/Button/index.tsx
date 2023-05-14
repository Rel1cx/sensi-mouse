import { Button as MTButton, type ButtonProps as MTButtonProps } from "@mantine/core"
import { memo } from "react"

type ButtonProps = MTButtonProps &
    React.PropsWithChildren & {
        onClick?: () => void
    }

export const Button = memo(({ children, ...rest }: ButtonProps) => {
    return (
        <MTButton
            compact
            gradient={{ deg: 35, from: "#ed6ea0", to: "#ec8c69" }}
            size="xs"
            style={{
                transition: "all 120ms ease-out",
            }}
            variant="gradient"
            {...rest}
        >
            {children}
        </MTButton>
    )
})
