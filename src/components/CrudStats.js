import React from 'react'
import Styled from 'styled-components'

const CrudStats = ({title, description}) => {
    return (
        <Container>
            <Title>{title}</Title>
            <Description>{description}</Description>
        </Container>
    )
}

export default CrudStats

const Container = Styled.div`
    background: #d4dfff;
    margin: 0px 10px 20px 10px;
    padding: 10px;
    width: 200px;
    border-radius: 5px;
`

const Title = Styled.h5`
    color: #82a2ff;
`

const Description = Styled.p`
    margin-top: 10px;
    color: #595959;
`
