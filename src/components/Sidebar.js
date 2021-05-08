import React from 'react'
import Styled from 'styled-components'
import {SiDatadog} from 'react-icons/si'

const Sidebar = () => {
    return (
        <Container>
            <Title># Mascotas</Title>
            <NavContainer>
                <Link><Icon /> Lista De Mascotas</Link>
            </NavContainer>
        </Container>
    )
}

export default Sidebar

const Container = Styled.div`
    
`

const Title = Styled.h2`
    padding: 10px 20px;
    color: #0d8f16;
`

const NavContainer = Styled.div`
    margin-top: 70px;

`

const Link = Styled.p`
    background: #d8ffd1;
    padding: 10px 20px;
    color: #808080;
    cursor: pointer;
    display: flex;
    align-items: center;

    &:hover {
        background: #bdffb3;        
    }
`

const Icon = Styled(SiDatadog)`
    color: #737373;
    font-size: 30px;
    margin-right: 14px;
`


