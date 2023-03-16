import { Divider, Slider, Switch, Text } from '@mantine/core'
import type {} from '@mantine/utils'

import { styled } from '@/theme'

export const Container = styled('div', {
    width: '100%',
    height: '100%',
    padding: '8px 16px'
})

export const Title = styled(Text, {
    color: 'rgb(16, 17, 19)',
    fontSize: '15px',
    margin: '0',
    padding: '0',
    fontWeight: 'normal'
})

export const Controls = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
    padding: '8px 0'
})

export const xSlider = styled(Slider, {
    marginBottom: '8px'
})

export const xSwitch = styled(Switch, {
    marginTop: '2px'
})

export const xDivider = styled(Divider, {
    margin: '4px 0'
})
