import './App.css';
import Registration from './components/registration/registration';
import Login from './components/login/login';
import DashBoard from './components/home/dashboard';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Cart from "./components/cart/cart1";
function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/registration" component={Registration} />
        <Route exact path="/login" component={Login} />
        <Route path="/dashboard" component={DashBoard} />
        <Route path="/dashboard/books" component={DashBoard} />
        <Route path="/dashboard/cart1" component={DashBoard} />
      </Switch>
    </BrowserRouter>
  );
}
export default App;
