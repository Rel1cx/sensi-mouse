import { Button as MButton, type ButtonProps as MButtonProps } from '@mantine/core'
import { memo } from 'react'

type ButtonProps = MButtonProps & {
    children: React.ReactNode
    onClick?: () => void
}

export const Button = memo(({ children, ...rest }: ButtonProps) => {
    return (
        <MButton variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }} size="xs" compact {...rest}>
            {children}
        </MButton>
    )
})
