import React from 'react'
import Styled from 'styled-components'
import CrudContainer from './components/CrudContainer'
import Sidebar from './components/Sidebar'

function App() {
  return (
    <Container>
        <BoxSidebar>
            <Sidebar />
        </BoxSidebar>
        <BoxCrud>
            <CrudContainer />
        </BoxCrud>
    </Container>
  );
}

export default App;

const Container = Styled.div`
    display: flex;
    height: 100vh;
`

const BoxSidebar = Styled.div`
    width: 20%;
    background: #f5f5f5;
    border-right: 2px solid #d1d1d1;
`

const BoxCrud = Styled.div`
    width: 100%;
`
