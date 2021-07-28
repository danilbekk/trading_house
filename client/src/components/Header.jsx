import {
  Box,
  Button,
  Typography,
  AppBar,
  Container,
  Toolbar,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
  },
}));
function Header() {
  const classes = useStyles();
  const [status, setStatus] = useState(false);
  return (
    <>
      <AppBar position="fixed">
        <Container fixed>
          <Toolbar>
            <Typography className={classes.title} variant="h6">
              <Link
                onClick={() => setStatus(false)}
                style={{ color: 'white' }}
                to="/"
              >
                GRAND ELEON
              </Link>
            </Typography>
            <Box mr={3}>
              <Link to="/">
                <Button
                  style={{ color: 'white' }}
                  onClick={() => setStatus(false)}
                >
                  Главная
                </Button>
              </Link>
            </Box>
            <Box mr={3}>
              <Link to="/admin">
                <Button
                  style={{ color: 'white' }}
                  onClick={() => setStatus(true)}
                >
                  Админка
                </Button>
              </Link>
              {status ? (
                <Link to="statuses">
                  <Button style={{ color: 'white' }}> Статусы</Button>
                </Link>
              ) : null}
            </Box>
            <Box mr={3}>
              <Button
                style={{ color: 'white' }}
                onClick={() => setStatus(false)}
              >
                О нас
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Toolbar />
    </>
  );
}

export default Header;
