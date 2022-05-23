import React,{useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Axios from 'axios'

export default function FormDialog(props) {
  const [editValues, setEditValues] = useState({
      id: props.id,
      valor: props.valor,
      descricao: props.descricao,
      categoria: props.categoria,
  }
  )

  const handleEditMov = () => {
      Axios.put("http://localhost:3001/edit",{
        id: editValues.id,
        valor: editValues.valor,
        descricao: editValues.descricao,
        categoria: editValues.categoria,
      })
      handleClose()
  }

  const handleDeleteMov = () => {
      Axios.delete(`http://localhost:3001/delete/${editValues.id}`)
  }

  const handleClickOpen = () => {
    props.setOpen(true);
  };

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleChangeValues = (value) => {
      setEditValues((prevValues)=>({
          ...prevValues,
          [value.target.id]: value.target.value,
      }))
  }

  return (
      <Dialog open={props.open} onClose={handleClose}>
        <DialogTitle>Editar</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="categoria"
            label="categoria"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={props.categoria}
            onChange={handleChangeValues}
          />
          <TextField
            autoFocus
            margin="dense"
            id="descricao"
            label="descricao"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={props.descricao}
            onChange={handleChangeValues}
          />
          <TextField
            autoFocus
            margin="dense"
            id="valor"
            label="valor"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={props.valor}
            onChange={handleChangeValues}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleDeleteMov}>Excluir</Button>
          <Button onClick={handleEditMov}>Salvar</Button>
        </DialogActions>
      </Dialog>
  );
}
