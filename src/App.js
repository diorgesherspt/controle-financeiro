import './App.css'
import { Container,Row,Col,Button,Modal,Table } from 'react-bootstrap'
import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import Tabela from "./componentes/Tabela"
import Lancamentos from './componentes/Lancamentos'
import Receitas from './componentes/Receitas'
import Despesas from './componentes/Despesas'


export default function App () {

  const [values,setValues] =useState()
  const [listMov,setListMov]=useState()
  const [listLancamento,setListLancamento]=useState()
  const [listReceita,setReceita]=useState()
  const [listDespesa,setDespesa]=useState()
  console.log(listMov)
  const handleChangeValues = (value) => {
    
    setValues(prevValue=> ({
      ...prevValue,
      [value.target.name]: value.target.value,
    }));
  };

  const handleClickButton= () => {

    const data= values.campoData

    var [ano, mes, dia] = data.split('-');

    const anoMes = mes+'-'+ano

    Axios.post("http://localhost:3001/register",{
      escolha: values.campoEscolha,
      descricao: values.campoDescricao,
      categoria:values.campoCategoria,
      valor:values.campoValor,
      anoMesDia:values.campoData,
      dia:dia,
      mes:mes,
      ano:ano,
      anoMes:anoMes
  }).then((response)=>{
    console.log(response)
    
  })
  handleClose()
    }

    useEffect(()=>{
      Axios.get("http://localhost:3001/getTabela").then((response)=>{
        setListMov(response.data)
      })
    },[listMov])

    useEffect(()=>{
      Axios.get("http://localhost:3001/getLancamento").then((response)=>{
        setListLancamento(response.data)
      })
    }, [])

    useEffect(()=>{
      Axios.get("http://localhost:3001/getReceita").then((response)=>{
        setReceita(response.data)
      })
    }, [])

    useEffect(()=>{
      Axios.get("http://localhost:3001/getDespesa").then((response)=>{
        setDespesa(response.data)
      })
    }, [])


  

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  

  return(
<div className="App">
  <header>
    <h1>Controle Financeiro Pessoal</h1>
    <select name="select" placeholder='mes'>
    <option value={"01"}>Janeiro</option>
    <option value={"02"}>Fevereiro</option>
    <option value={"03"}>Março</option>
    <option value={"04"}>Abril</option>
    <option value={"05"}>Maio</option>
    <option value={"06"}>Junho</option>
    <option value={"07"}>Julho</option>
    <option value={"08"}>Agosto</option>
    <option value={"09"}>Setembro</option>
    <option value={"10"}>Outubro</option>
    <option value={"11"}>Novembro</option>
    <option value={"12"}>Dezembro</option>
</select>
<br/>
<select name="select-ano" placeholder='ano'>
  <option value={"2010"}>2010</option>
  <option value={"2011"}>2011</option>
  <option value={"2012"}>2012</option>
  <option value={"2013"}>2013</option>
  <option value={"2014"}>2014</option>
  <option value={"2015"}>2015</option>
  <option value={"2016"}>2016</option>
  <option value={"2017"}>2017</option>
  <option value={"2018"}>2018</option>
  <option value={"2019"}>2019</option>
  <option value={"2020"}>2020</option>
  <option value={"2021"}>2021</option>
  <option value={"2022"}>2022</option>
</select>
<br/>
<Button>Filtrar</Button>
</header>
<br></br>
  <Container className='container-principal'>
  <Row className='row-informacoes'>
    <Col>Lançamentos:{typeof listLancamento !== "undefined" && listLancamento.map((value)=>{return<Lancamentos key={value.id} listLancamento={listLancamento} setListLancamento
    ={setListLancamento} total_registros={value.total_registros}/>})}</Col>
    <Col>Receitas:{typeof listLancamento !== "undefined" && listReceita.map((value)=>{return<Receitas key={value.id} listReceita={listReceita} setReceita
    ={setReceita} total={value.total}/>})}</Col>
    <Col>Despesas:{typeof listLancamento !== "undefined" && listDespesa.map((value)=>{return<Despesas key={value.id} listDespesa={listDespesa} setDespesa
    ={setDespesa} total={value.total}/>})}</Col>
    <Col>Saldo</Col>
  </Row>
  <br></br>
  <Row className="opcoes">
    <Col md={4}><Button className='botaoLancamento' onClick={handleShow}>+Novo Lançamento</Button></Col>
    <Col md={8}><input placeholder='filtro' className='filtroBusca'></input></Col>
  </Row>
  
</Container>
<br></br>
<Container>
  <Table>
  <thead>
    <tr>
      <th>Data</th>
      <th>Tipo</th>
      <th>Categoria</th>
      <th>Descricão</th>
      <th>Valor</th>
    </tr>
  </thead>
{typeof listMov !== "undefined" && listMov.map((value)=>{
  return<Tabela
  key={value.id}
  listMov={listMov}
  setListMov={setListMov}
  tipo={value.tipo}
  anoMesDia={value.anoMesDia}
  categoria={value.categoria}
  descricao={value.descricao}
  valor={value.valor}
  id={value.id}
  />
})}
</Table>
</Container>
<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Inclusão de Lançamento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
          <select  name="campoEscolha" onChange={handleChangeValues} type="text">
  
  <option value="Receita">Escolha uma opção</option>
  <option value="Despesa">Despesa</option>
  <option value="Receita">Receita</option>
</select>
<br/>
        <label>Descricão:</label><br/><input className="campos" type="text" name="campoDescricao" onChange={handleChangeValues}/><br/>
        <label>Categoria:</label><br/><input className="campos" type="text" name="campoCategoria" onChange={handleChangeValues}/><br/>
        <label>Valor:</label><br/><input className="campos" type="text" name="campoValor" onChange={handleChangeValues}/><br/>
        <label>Data:</label><br/><input className="campos" type="date" name="campoData" onChange={handleChangeValues}/><br/>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClickButton}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
</div>
  )
};
