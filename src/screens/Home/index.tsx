import { styled } from '@/theme'
import { Slider } from '@mantine/core'

interface HomeProps {}

const Container = styled('div', {
    width: '100%',
    height: '100%'
})

const marks = [
    { value: 20, label: '20%' },
    { value: 50, label: '50%' },
    { value: 80, label: '80%' }
]

const Home: FC<HomeProps> = () => {
    return <Container></Container>
}

export default Home
