import { useDispatch, useSelector } from 'react-redux';
import Status from './Status';
import { useEffect, useState } from 'react';
import { addStatus, loadStatuses } from '../../redux/features/statuses';
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
function Statuses() {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState({
    text: '',
    color: '',
  });

  const handleChange = (ev) => {
    setStatus({ ...status, [ev.target.name]: ev.target.value });
  };
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleAdd = () => {
    dispatch(addStatus(status));
  };
  const dispatch = useDispatch();
  const statuses = useSelector((state) => state.statuses.items);
  useEffect(() => {
    dispatch(loadStatuses());
  }, [dispatch]);
  return (
    <Container>
      <div style={{marginLeft: 180}}>
      <h1 >Статусы</h1>
      {statuses.map((status) => {
        return <Status status={status} />;
      })}
      </div>
        
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Введите Ф.И.О</DialogTitle>
        <DialogContent>
          <TextField
            onChange={handleChange}
            margin="dence"
            id="text"
            label="text"
            name="text"
            fullWidth
          />
           <TextField
            onChange={handleChange}
            margin="dence"
            id="color"
            label="color"
            name="color"
            defaultValue="#"
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

export default Statuses;
