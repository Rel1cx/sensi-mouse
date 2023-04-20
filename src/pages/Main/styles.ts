import { Flex, Slider, Switch, Title } from '@mantine/core'

import { styled } from '@/theme'

export const Container = styled(Flex, {
    padding: '8px 16px 6px 16px',
    width: '100%',
    height: '100%'
})

export const Header = styled(Title, {
    margin: '0',
    padding: '0',
    color: 'rgb(18, 18, 18)',
    fontSize: '15px',
    fontWeight: '500'
})

export const Content = styled('div', {
    padding: '8px 0',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px'
})

export const xSlider = styled(Slider, {
    marginBottom: '12px'
})

export const xSwitch = styled(Switch, {
    marginTop: '4px',
    cursor: 'pointer'
})

export const Footer = styled(Flex, {
    fontSize: '12px',
    opacity: '0.95'
})
