import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addedClient, loadClients } from '../../redux/features/clients';
import {
  Button,
  DialogContent,
  TextField,
  DialogActions,
  DialogTitle,
  Container,
  Dialog,
} from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import Client from './Client';
function Admin() {
  const [open, setOpen] = useState(false);
  const [client, setClient] = useState({
    firstname: '',
    lastname: '',
    patronymic: '',
    room: '',
  });
  const handleChange = (ev) => {
    setClient({ ...client, [ev.target.name]: ev.target.value });
  };
  const handleAdd = () => {
    dispatch(addedClient(client));
  };
  console.log(client);
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  const clients = useSelector((state) => state.clients.items);
  useEffect(() => {
    dispatch(loadClients());
  }, [dispatch]);
  return (
    <Container>
      <h1 style={{ marginLeft: 180 }}>Список клиентов</h1>
      {clients.map((client) => {
        return <Client client={client} />;
      })}
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Введите Ф.И.О</DialogTitle>
        <DialogContent>
          <TextField
            onChange={handleChange}
            autoFocus
            margin="dence"
            id="firstname"
            label="firstname"
            name="firstname"
            fullWidth
          />
          <TextField
            onChange={handleChange}
            margin="dence"
            id="lastname"
            label="lastname"
            name="lastname"
            fullWidth
          />
          <TextField
            onChange={handleChange}
            margin="dence"
            id="patronymic"
            label="patronymic"
            name="patronymic"
            fullWidth
          />
          <TextField
            onChange={handleChange}
            margin="dence"
            id="room"
            label="room"
            name="room"
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>

          <Button
            onClick={() => {
              handleClose();
              handleAdd();
            }}
            color="primary"
          >
            Добавить
          </Button>
        </DialogActions>
      </Dialog>
      <>
        <Button onClick={handleClickOpen}>
          <AddCircleIcon fontSize="large" />
        </Button>
      </>
    </Container>
  );
}

export default Admin;
