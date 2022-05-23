import FormDialog from "./Dialog"
import '../App.css'
import React, { useState } from "react"
export default function Tabela(props) {
    const [open,setOpen] = React.useState(false)

    const handleClickTabela = () =>{
        setOpen(true)
    }

   

    return(
  <tbody>
  <tr onClick={()=>handleClickTabela()} className="linhaTabela" >
      <td>{props.anoMesDia}</td>
      <td>{props.tipo}</td>
      <td>{props.categoria}</td>
      <td>{props.descricao}</td>
      <td>{props.valor}</td>
      <td><FormDialog open={open} setOpen={setOpen}
      descricao={props.descricao}
      categoria={props.categoria}
      valor={props.valor}
      listMov={props.listMov}
      id={props.id}
      setlistMov={props.setlistMov}
      
      /></td>
    </tr>
  </tbody>
    )
}