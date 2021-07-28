import Header from './Header';
import Content from './Clients/Content';
import Notes from './Notes';
import Admin from './Admin';
import { Container } from '@material-ui/core';
import { Switch, Route } from 'react-router-dom';
import Statuses from './Statuses';
function App() {
  return (
    <Container> 
      <Header />
      <Switch>
        <Route path="/" exact>
          <Content />
        </Route>
        <Route path='/notes/:id' exact>
        <Notes />
        </Route>
        <Route path='/admin' exact> 
          <Admin />
        </Route>
        <Route path='/statuses'>
          <Statuses />
        </Route>
      </Switch>
    </Container>
  );
}

export default App;
