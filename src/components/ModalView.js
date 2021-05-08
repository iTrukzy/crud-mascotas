import React, { useState } from 'react'
import Styled from 'styled-components'
import {AiOutlineClose} from 'react-icons/ai'
import axios from 'axios'
import Loader from './Loader'

const ModalView = ({closeModal, isData, getData, setTotalDeleted, totalDeleted, setTotalUpdated, totalUpdated}) => {
    const [isDelete, setIsDelete] = useState(null)
    const [isUpdate, setIsUpdate] = useState(null)

    const [name, setName] = useState("sdfsdf")
    const [specie, setSpecie] = useState("")
    const [age, setAge] = useState(0)
    const [description, setDescription] = useState("")
    const [imgUrl, setImgUrl] = useState("")
    const [id, setId] = useState("") 


    const handleDelete = async (id) => {
        setIsDelete(true)
        try {
            await axios.delete(`https://william-crud-app.herokuapp.com/api/v1/mascots/${id}`)
            setIsDelete(false)
            closeModal(null)
            getData()
            setTotalDeleted(totalDeleted + 1)
        }
        catch(err) {
            console.log(err.message)
        }
    }

    const handleEditar = async (id) => {
        setIsUpdate(true)
        setId(id)
        setName(isData.data.mascot.name)
        setSpecie(isData.data.mascot.especie)
        setAge(isData.data.mascot.edad)
        setDescription(isData.data.mascot.descripcion)
        setImgUrl(isData.data.mascot.img)
    }

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
            await axios.put(`https://william-crud-app.herokuapp.com/api/v1/mascots/${id}`, body)
            getData()
            setTotalUpdated(totalUpdated + 1)
        }
        catch(err) {
            console.log(err.message)
        }
    }



    return (
        <Container>
            <CloseModal onClick={() => closeModal(null)}/>
            <BoxContainer>
                {isData ?
                    <>
                        {
                            isUpdate ?
                            <>
                                <Title>Editar Mascota</Title>
                                <Form onSubmit={(e) => handleSumbit(e)}>
                                    <Label>Nombre De La Mascota</Label>
                                    <Input onChange={(e) => setName(e.target.value)} type="text" value={name}/>
                                    <Label>Especie</Label>
                                    <Input onChange={(e) => setSpecie(e.target.value)} type="text" value={specie}/>
                                    <Label>Edad</Label>
                                    <Input onChange={(e) => setAge(e.target.value)} type="number" value={age}/>
                                    <Label>Descripcion</Label>
                                    <Input onChange={(e) => setDescription(e.target.value)} type="text" value={description}/>
                                    <Label>URL Imagen</Label>
                                    <Input onChange={(e) => setImgUrl(e.target.value)} type="text" value={imgUrl}/>
                                    <EditMascot>Editar</EditMascot>
                                </Form>
                            </>
                            :
                            <>
                                <Img src={isData.data.mascot.img ? isData.data.mascot.img : 'https://semantic-ui.com/images/wireframe/image.png'}/>
                                <Title>Nombre</Title>
                                <Content>{isData.data.mascot.name}</Content>
                                <Title>Especie</Title>
                                <Content>{isData.data.mascot.especie}</Content>
                                <Title>Edad</Title>
                                <Content>{isData.data.mascot.edad}</Content>
                                <Title>Descripcion</Title>
                                <Content>{isData.data.mascot.descripcion}</Content>

                                <ButtonContainer>
                                    <ButtonUpdate onClick={() => handleEditar(isData.data.mascot._id)}>
                                        Editar
                                    </ButtonUpdate>
                                    <ButtonDelete onClick={() => handleDelete(isData.data.mascot._id)}>
                                        {isDelete ? "Eliminando" : 'Eliminar'}
                                    </ButtonDelete>
                                </ButtonContainer>
                            </> 
                        }
                    </>
                
                
                
                : <Loader />}
            </BoxContainer>
        </Container>
    )
}

export default ModalView


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
    width: 370px;
    position: absolute;
    top: 0;
    left: 0;
    text-align: center;
    overflow: auto;
`

const Img = Styled.img`
    width: 100%;
    height: 200px;
`

const Title = Styled.h4`
    margin-top: 10px;
`

const Content = Styled.p`
    margin-top: 10px;
    text-align: center;
    padding: 10px;
`

const CloseModal = Styled(AiOutlineClose)`
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 20;
    font-size: 20px;
    cursor: pointer;
    color: #030303;
    background-color: #f2f2f2; 
    width: 30px;
    height: 30px;
    border-radius: 50px;
`

const ButtonContainer = Styled.div`
    width: 100%;
    margin-top: 35px;
`

const ButtonUpdate = Styled.button`
    width: 50%;
    padding: 10px;
    border: 1px solid #FFCC56;
    background: #FFE8B3;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;

    &:hover {
        background: #FFCC56;
        color: #f2f2f2;
    }
`

const ButtonDelete = Styled.button`
    width: 50%;
    padding: 10px;
    border: 1px solid #FF8D5A;
    background: #FFCBB3;
    font-weight: bold;
    text-transform: uppercase;
    cursor: pointer;

    &:hover {
        background: #FF8D5A;
        color: #f2f2f2;
    }
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

const EditMascot = Styled.button`
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
