import React, {useEffect, useState} from 'react'
import Styled from 'styled-components'
import {GrAddCircle} from 'react-icons/gr'
import {BiStats} from 'react-icons/bi'
import {BsListCheck} from 'react-icons/bs'
import CrudStats from './CrudStats'
import CrudList from './CrudList'
import ModalAdd from './ModalAdd'
import axios from 'axios'

const CrudContainer = () => {
    const [isModalAdd, setIsModalAdd] = useState(null)
    const [dataMascot, setDataMascot] = useState([])
    const [totalAdd, setTotalAdd] = useState(2)
    const [totalUpdated, setTotalUpdated] = useState(0)
    const [totalDeleted, setTotalDeleted] = useState(0)

    const getData = async () => {
        try {
            const response = await axios.get('https://william-crud-app.herokuapp.com/api/v1/mascots')
            setDataMascot(response.data.mascots)
        }
        catch(err) {
            console.log(err.message)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <Container>
            <Header>
                {isModalAdd && <ModalAdd closeModal={setIsModalAdd} getData={getData} total={{totalAdd, setTotalAdd}} />}
                <AddButton onClick={() => setIsModalAdd(true)}>Agregar Mascota <IconAdd /></AddButton>
            </Header>
            <BodyContainer>
                <Box>
                    <Title><IconStats /> Estadisticas</Title>
                    <BoxStats>
                        <CrudStats title="Enlistados" description={dataMascot.length} />
                        <CrudStats title="Total Agregados" description={totalAdd} />
                        <CrudStats title="Editados" description={totalUpdated} />
                        <CrudStats title="Eliminados" description={totalDeleted} />
                    </BoxStats>
                </Box>
                <Box>
                    <Title><IconList/> Listado</Title>
                        <BoxList>
                            {
                                dataMascot ? 
                                dataMascot.map((items) => (
                                    <CrudList key={items._id} name={items.name} specie={items.especie} age={items.edad} description={items.descripcion} id={items._id} getData={getData} setTotalDeleted={setTotalDeleted} totalDeleted={totalDeleted} setTotalUpdated={setTotalUpdated} totalUpdated={totalUpdated}/>
                                ))
                                :
                                <p>Ups! No Hay Mascotas Agregadas</p>
                            }
                        </BoxList>
                </Box>
            </BodyContainer>
        </Container>
    )
}

export default CrudContainer

const Container = Styled.div`

`

const Header = Styled.div`
    display: flex;
    justify-content: flex-end;
    border-bottom: 1px solid #daffd1;
    padding: 10px 20px;
`

const AddButton = Styled.button`
    display: flex;
    align-items: center;
    padding: 12px;
    background: rgba(62, 173, 35, 0.3);
    border: none;
    border-radius: 5px;
    color: #5c5c5c;
    cursor: pointer;
    transition: background .2s;

    &:hover {
        background: rgba(62, 173, 35, 0.5);
    }
`

const IconAdd = Styled(GrAddCircle)`
    margin-left: 20px;
    color: #81ff26;
`

const IconStats = Styled(BiStats)`
    margin-right: 20px;  
`

const IconList = Styled(BsListCheck)`
    margin-right: 20px; 
`

const BodyContainer = Styled.div`
    width: 90%;
    margin: 0 auto;
    padding: 20px 0px;
`

const Box = Styled.div`

`

const BoxStats = Styled.div`
    display: flex;
`

const BoxList = Styled.div`
    overflow-y: auto;
    height: 320px;
`

const Title = Styled.h3`
    display: flex;
    align-items: center;
    color: #686c6e;
    margin-bottom: 20px;
`


