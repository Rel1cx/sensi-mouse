import { Button as MTButton, type ButtonProps as MTButtonProps } from '@mantine/core'
import { memo } from 'react'

type ButtonProps = MTButtonProps & {
    children: React.ReactNode
    onClick?: () => void
}

export const Button = memo(({ children, ...rest }: ButtonProps) => {
    return (
        <MTButton variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }} size="xs" compact {...rest}>
            {children}
        </MTButton>
    )
})
