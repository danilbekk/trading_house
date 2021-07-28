import { useEffect } from 'react';
import { Box } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { loadNotes } from '../../redux/features/notes';
import { Container } from '@material-ui/core';
import Add from './Add';
import Note from './Note';
import { useParams } from 'react-router-dom';
import { loadClients } from '../../redux/features/clients';
function Notes() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const notes = useSelector((state) => {
    return state.notes.items.filter((item) => item.client === id);
  });
  const client = useSelector((state) =>
    state.clients.items.find((item) => item._id === id)
  );
  useEffect(() => {
    dispatch(loadNotes());
    dispatch(loadClients());
  }, [dispatch]);

  return (
    <Container>
      <Box>
        <h2>
          Все записи: {client?.firstname} {client?.lastname}{' '}
          {client?.patronymic}
        </h2>
      </Box>
      <Add clientId={client?._id} />
      {notes.map((note) => {
        return <Note note={note} />;
      })}
    </Container>
  );
}

export default Notes;
