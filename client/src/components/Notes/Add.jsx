import {
  Grid,
  TextField,
  Button,
  FormControl,
  MenuItem,
  FormHelperText,
  Select,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AddNote } from '../../redux/features/notes';
import { loadStatuses } from '../../redux/features/statuses';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 180,
  },
}));
function Add({ clientId }) {
  const classes = useStyles();
  const [note, setNote] = useState({
    status: '',
    text: '',
  });

  const handleChange = (ev) => {
    setNote({ ...note, [ev.target.name]: ev.target.value });
  };

  const handleAddNote = () => {
    dispatch(AddNote(clientId, note));
  };
  const dispatch = useDispatch();
  const statuses = useSelector((state) =>
    state.statuses.items.map((item) => item)
  );

  useEffect(() => {
    dispatch(loadStatuses());
  }, [dispatch]);
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <form>
          <TextField
            name="text"
            id="outlined-full-width"
            style={{ margin: 8 }}
            placeholder="Комментарий..."
            fullWidth
            margin="normal"
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
          />
        </form>

        <FormControl className={classes.formControl}>
          <FormHelperText>Выберите статус</FormHelperText>
          <Select
            name="status"
            value={note.status}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'Выберите стаутс' }}
          >
            {statuses.map((status) => {
              return <MenuItem value={status._id}>{status.text}</MenuItem>;
            })}
          </Select>
        </FormControl>
        <Button
          style={{ marginTop: 20 }}
          onClick={handleAddNote}
          color="primary"
          variant="outlined"
        >
          Добавить
        </Button>
      </Grid>
    </Grid>
  );
}

export default Add;
