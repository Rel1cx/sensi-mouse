import { styled } from '@stitches/react'

interface AboutProps {}

const Container = styled('div', {})

const About: FC<AboutProps> = () => {
    return <Container />
}

About.displayName = 'About'

export default About
