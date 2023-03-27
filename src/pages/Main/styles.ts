import { Divider, Slider, Switch, Title } from '@mantine/core'

import { styled } from '@/theme'

export const Container = styled('div', {
    width: '100%',
    height: '100%',
    padding: '8px 16px 6px 16px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
})

export const Header = styled(Title, {
    color: 'rgb(18, 18, 18)',
    fontSize: '15px',
    margin: '0',
    padding: '0',
    fontWeight: '500'
})

export const Content = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
    padding: '8px 0'
})

export const xSlider = styled(Slider, {
    marginBottom: '12px'
})

export const xSwitch = styled(Switch, {
    marginTop: '4px',
    cursor: 'pointer'
})

export const xDivider = styled(Divider, {
    margin: '4px 0'
})

export const Footer = styled('div', {
    fontSize: '12px'
})
