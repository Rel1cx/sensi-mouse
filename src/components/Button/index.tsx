import { Button as MButton } from '@mantine/core'
import { memo } from 'react'

type ButtonProps = {
    children: React.ReactNode
}

export const Button = memo(({ children }: ButtonProps) => {
    return (
        <MButton variant="gradient" gradient={{ from: '#ed6ea0', to: '#ec8c69', deg: 35 }} size="xs" compact>
            {children}
        </MButton>
    )
})
