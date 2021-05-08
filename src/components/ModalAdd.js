import React, { useState } from 'react'
import Styled from 'styled-components'
import {AiOutlineClose} from 'react-icons/ai'
import axios from 'axios'

const ModalAdd = ({closeModal, getData, total: {setTotalAdd, totalAdd}}) => {
    const [name, setName] = useState("")
    const [specie, setSpecie] = useState("")
    const [age, setAge] = useState(0)
    const [description, setDescription] = useState("")
    const [imgUrl, setImgUrl] = useState("")

    const handleSumbit = async (e) => {
        e.preventDefault()
        closeModal(null)

        const body = {
            name: name,
            especie: specie,
            edad: age,
            descripcion: description,
            img: imgUrl
        }

        try {
            await axios.post('https://william-crud-app.herokuapp.com/api/v1/mascots', body)
            setTotalAdd(totalAdd + 1)
            getData()
        }
        catch(err) {
            console.log(err.message)
        }
    }


    return (
        <Container>
            <CloseModal onClick={() => closeModal(null)}/>
            <BoxContainer>
                <Title>Añadir Mascota</Title>
                <Form onSubmit={(e) => handleSumbit(e)}>
                    <Label>Nombre De La Mascota</Label>
                    <Input onChange={(e) => setName(e.target.value)} type="text"/>
                    <Label>Especie</Label>
                    <Input onChange={(e) => setSpecie(e.target.value)} type="text"/>
                    <Label>Edad</Label>
                    <Input onChange={(e) => setAge(e.target.value)} type="number"/>
                    <Label>Descripcion</Label>
                    <Input onChange={(e) => setDescription(e.target.value)} type="text"/>
                    <Label>URL Imagen</Label>
                    <Input onChange={(e) => setImgUrl(e.target.value)} type="text"/>
                    <AddMascot>Agregar</AddMascot>
                </Form>
            </BoxContainer>
        </Container>
    )
}

export default ModalAdd


const Container = Styled.div`
    position: fixed;
    background: rgba(0, 0, 0, .3);
    top: 0;
    right: 0;
    margin: 0px 0px;
    height: 100vh;
    width: 100%;
`

const BoxContainer = Styled.div`
    background: #f2f2f2;
    height: 100vh;
    width: 350px;
    position: absolute;
    top: 0;
    right: 0;
    padding: 10px;
`

const Title = Styled.h3`
    color: #808080;
    font-size: 25px;
`

const CloseModal = Styled(AiOutlineClose)`
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 20;
    font-size: 20px;
    cursor: pointer;
    color: #82a2ff;
`

const Form = Styled.form`
    margin-top: 60px;
`

const Input = Styled.input`
    width: 100%;
    padding: 14px;
    margin-bottom: 20px;
    margin-top: 6px;
    border: 1px solid #dedede;
    border-radius: 5px;
    color: #b5b5b5;

    &:focus {
        outline: none;
        border: 1px solid #b5b5b5;
    }
`

const Label = Styled.label`
    margin-bottom: 10px;
    color: #999999;
`

const AddMascot = Styled.button`
    padding: 10px;
    width: 100%;
    border: 1px solid #82a2ff;
    border-radius: 5px;
    background: #D2D8FF;
    cursor: pointer;
    color: #030303;
    text-transform: uppercase;
    font-weight: bold;

    &:hover {
        background: #82a2ff;
        color: #f2f2f2;
    }
`