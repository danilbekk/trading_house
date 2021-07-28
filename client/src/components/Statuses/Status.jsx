import {
  Box,
  Button,
  TableRow,
  TableCell,
  Typography,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  statusName: {
    color: '#4c4dc3',
    fontSize: 25,
    fontWeight: 'bold',
  },
}));

function Status({ status }) {
  const classes = useStyles();
  return (
    <TableRow>
      <TableCell style={{ fontSize: 18 }}>
        <Typography classes={{ root: classes.statusName }}>
          {status.text}
        </Typography>
      </TableCell>
      <TableCell style={{ width: 150, textAlign: 'center' }}>
        <Box
          bgcolor={status.color}
          style={{ borderRadius: 100, width: 60, height: 60 }}
        />
      </TableCell>
    </TableRow>
  );
}

export default Status;
