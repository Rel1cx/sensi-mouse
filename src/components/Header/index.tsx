import { Title as MTTitle } from '@mantine/core'

import { styled } from '@/theme'

export const Header = styled(MTTitle, {
    color: 'rgb(18, 18, 18)',
    fontSize: '15px',
    margin: '0',
    padding: '0',
    fontWeight: '500',

    '@media (prefers-color-scheme: dark)': {
        color: 'rgb(240, 240, 240)'
    }
})
