import axios from 'axios'
import React, { useState } from 'react'
import Styled from 'styled-components'
import ModalView from './ModalView'

const CrudList = ({name, specie, age, description, id, getData, setTotalDeleted, totalDeleted, setTotalUpdated, totalUpdated}) => {
    const [isModalView, setIsModalView] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [isData, setIsData] = useState([])

    const handleView = async () => {
        console.log(id)
        setIsModalView(true)
        setIsLoading(true)
        try {
            const response = await axios.get(`https://william-crud-app.herokuapp.com/api/v1/mascots/${id}`)
            setIsData(response)
            setIsLoading(false)
        }
        catch(err) {
            console.log(err.message)
        }
    }

    return (
        <Container>
            {isModalView && <ModalView setTotalUpdated={setTotalUpdated} setTotalDeleted={setTotalDeleted} totalDeleted={totalDeleted} closeModal={setIsModalView} getData={getData} isData={isLoading ? null : isData} totalUpdated={totalUpdated}/>}
            <Box>
                <Title>Nombre:</Title>
                <Content>{name}</Content>
            </Box>
            <Box>
                <Title>Especie:</Title>
                <Content>{specie}</Content>
            </Box>
            <Box>
                <Title>Edad:</Title>
                <Content>{age}</Content>
            </Box>
            <Box>
                <Title>Descripcion:</Title>
                <Content>{description.slice(0, 10)}...</Content>
            </Box>
            <div>
                <ViewButton onClick={handleView}>View</ViewButton>
            </div>
        </Container>
    )
}

export default CrudList

const Container = Styled.div`
    background: #f0f2ff;
    padding: 10px;
    display: flex;
    justify-content: space-between;
    box-shadow: 0 .5rem 1rem rgba(0,0,0,.15)!important;
    margin-bottom: 25px;
`

const Box = Styled.div`
    width: 130px;
`

const Title = Styled.h6`
    color: #b8b8b8;
    margin-bottom: 5px;
`

const Content = Styled.p`

`

const ViewButton = Styled.button`
    margin-top: 12px;
    border: none;
    border-radius: 4px;
    background: #afddf0;
    padding: 1px 5px;
    color: #737373;
    cursor: pointer;

    &:hover {
        color: #030303;
    }
`