import { Divider, Input, Slider, Switch, Text } from '@mantine/core'

import { styled } from '@/theme'

interface HomeProps {}

const Container = styled('div', {
    width: '100%',
    height: '100%',
    padding: '8px 16px'
})

const Title = styled(Text, {
    color: 'rgb(16, 17, 19)',
    fontSize: '15px',
    margin: '0',
    padding: '0',
    fontWeight: 'normal'
})

const Controls = styled('div', {
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
    padding: '8px 0'
})

const SCxSlider = styled(Slider, {
    marginBottom: '8px'
})

const SCxSwitch = styled(Switch, {
    marginTop: '2px'
})

const SCxDivider = styled(Divider, {
    margin: '4px 0'
})

const marks = [
    { value: 1, label: '1' },
    { value: 25, label: '' },
    { value: 50, label: '50' },
    { value: 75, label: '' },
    { value: 100, label: '100' },
    { value: 125, label: '' },
    { value: 150, label: '150' },
    { value: 175, label: '' },
    { value: 199, label: '199' }
]

const Home: FC<HomeProps> = () => {
    return (
        <Container>
            <Title>Flat Mouse</Title>
            <Controls>
                <Input.Wrapper label="Sensitivity">
                    <SCxSlider size="lg" marks={marks} min={1} max={199} defaultValue={50} />
                </Input.Wrapper>
                <Input.Wrapper label="Acceleration">
                    <SCxSwitch size="md" onLabel="ON" offLabel="OFF" />
                </Input.Wrapper>
            </Controls>
            <SCxDivider color="#7f828c95" />
            <Text
                sx={{
                    fontSize: '12px',
                    opacity: 0.8
                }}
                size="sm"
            >
                Made with ❤️ by @Eva1ent
            </Text>
        </Container>
    )
}

export default Home
