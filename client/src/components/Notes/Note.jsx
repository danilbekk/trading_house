import {
  Box,
  TableCell,
  TableRow,
  TextField,
  Select,
  MenuItem,
  FormControl,
} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadStatuses } from '../../redux/features/statuses';
import { makeStyles } from '@material-ui/core/styles';
import EditIcon from '@material-ui/icons/Edit';
import Fab from '@material-ui/core/Fab';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import { editNote, loadNotes } from '../../redux/features/notes';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 900,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  tr: {
    height: 80,
  },
  status: {
    height: 40,
    width: 200,
    color: 'white',
    textAlign: 'center',
    borderRadius: 4,
    lineHeight: '40px',
    fontSize: 16,
  },
}));

function Note({ note }) {
  const classes = useStyles();
  let id = useParams().id
  const [openForm, setOpenForm] = useState(false);
  const [noteForm, setNoteForm] = useState({
    status: '',
    text: '',
  });
  if(id === note.client) {
    id = note._id
  }
  const dispatch = useDispatch();
  const status = useSelector((state) => {
    return state.statuses.items.find((item) => item._id === note.status);
  });
  const statuses = useSelector((state) => {
    return state.statuses.items;
  });
  const handleChange = (ev) => {
    setNoteForm({ ...noteForm, [ev.target.name]: ev.target.value });
  };
  const handleEditNote = () => {
    dispatch(editNote(id, noteForm));
  };

  
  useEffect(() => {
    dispatch(loadStatuses());
  }, [dispatch]);

  return (
    <TableRow classes={{ root: classes.tr }}>
      {openForm ? (
        <>
        <FormControl>
          <Select
            style={{ marginTop: 30 }}
            name="status"
            defaultValue={note.status}
            onChange={handleChange}
            inputProps={{ 'aria-label': 'Выберите стаутс' }}
          >
            {statuses.map((item) => {
              return <MenuItem value={item._id}>{item.text}</MenuItem>;
            })}
            ;
          </Select>
          </FormControl>
          <TableCell style={{ fontSize: 18 }} item>
            <TextField defaultValue={note.text} name="text" onChange={handleChange} />
          </TableCell>
          <TableCell style={{ width: 150, textAlign: 'center' }}>
            <Fab
              style={{
                backgroundColor: '#4c4dc3',

                color: 'white',
              }}
              aria-label="edit"
              onClick={() => {
                handleEditNote()
                setOpenForm(false)
              }}
            >
              <EditIcon />
            </Fab>
          </TableCell>
        </>
      ) : (
        <>
          <TableCell style={{ width: 120 }}>
            <Box bgcolor={status?.color} classes={{ root: classes.status }}>
              {status?.text}
            </Box>
          </TableCell>
          <TableCell style={{ fontSize: 18 }} item>
            {note.text}
          </TableCell>
          <TableCell style={{ width: 150, textAlign: 'center' }}>
            <Fab
              style={{
                backgroundColor: '#4c4dc3',

                color: 'white',
              }}
              aria-label="edit"
              onClick={() => setOpenForm(true)}
            >
              <EditIcon />
            </Fab>
          </TableCell>
        </>
      )}

      <Helmet>
        <meta charSet="utf-8" />
        <title>Заметки</title>
        <link rel="canonical" href="http://localhost:3000/" />
      </Helmet>
    </TableRow>
  );
}

export default Note;
