import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadClients } from '../../redux/features/clients';
import Fuse from 'fuse.js';
import {
  TableRow,
  Table,
  TableCell,
  TableContainer,
  TableBody,
  TableHead,
  Paper,
  Avatar,
  Button,
  TextField
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { loadStatuses } from '../../redux/features/statuses';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      //backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

function Content() {
  const [load, setLoad] = useState(false);
  const [query, setQuery] = useState('');

  const clients = useSelector((state) => state.clients.items);
  const loading = useSelector((state) => state.clients.loading);
  const fuse = new Fuse(clients, {
    keys: ['firstname', 'lastname', 'patronymic'],
    includesScore: true,
  });

  const handleOnSearch = (ev) => {
    setQuery(ev.target.value);
  };

  const results = fuse.search(query);

  const clientsResults = query ? results.map((result) => result.item) : clients;

  const classes = useStyles();

  const dispatch = useDispatch();

  const statuses = useSelector((state) => state.statuses.items);

  useEffect(() => {
    dispatch(loadClients());
    dispatch(loadStatuses());
  }, [dispatch]);

  return loading ? (
    <h2>Идет закгрузка...</h2>
  ) : (
    <div>
      <h1>Список клиентов...</h1>
      {!load ? (
        <Button onClick={() => setLoad(true)} color="primary">
          <h3>Показать фильтр</h3>
        </Button>
      ) : (
        <Button onClick={() => setLoad(false)} color="primary">
          <h3>Скрыть фильтр</h3>
        </Button>
      )}

      <div>
        {load ? (
          <TextField
            name="text"
            id="outlined-full-width"
            style={{ margin: 8 }}
            placeholder=""
            helperText="Full width!"
            fullWidth
            margin="normal"
          
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            value={query}
            onChange={handleOnSearch}
          />
        ) : null}
      </div>
      <TableContainer component={Paper}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <StyledTableCell>Фото</StyledTableCell>
              <StyledTableCell>Ф.И.О</StyledTableCell>
              <StyledTableCell align="right">Помещение</StyledTableCell>
              <StyledTableCell align="right">
                Последнее изменение
              </StyledTableCell>
              <StyledTableCell align="right">Статус договора</StyledTableCell>
              <StyledTableCell align="right">Записей</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {clientsResults.map((client) => {
              const status = statuses.find(
                (item) => item._id === client.lastNote?.status
              );
              return (
                <StyledTableRow key={client._id}>
                  <StyledTableCell>
                    <Avatar alt="Remy Sharp" src={client.avatar} />
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    <Link to={`/notes/${client._id}`}>
                      <h4>
                        {client.firstname} {client.lastname} {client.patronymic}
                      </h4>
                    </Link>
                  </StyledTableCell>
                  <StyledTableCell align="right">{client.room}</StyledTableCell>
                  <StyledTableCell align="right">
                    {client.lastNote?.updatedAt}
                  </StyledTableCell>
                  <StyledTableCell style={{ marginLeft: 50 }} align="right">
                    <Button
                      fullWidth
                      style={{ backgroundColor: `${status?.color}` }}
                    >
                      {status?.text}
                    </Button>
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {client.notes?.length}
                  </StyledTableCell>
                </StyledTableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Content;
