import './App.css';
import Registration from './components/registration/registration';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/registration" component={Registration} />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
