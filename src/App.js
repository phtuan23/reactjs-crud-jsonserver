import React from 'react';
import { Switch, Route, NavLink } from 'react-router-dom';
import Home from './component/Home';
import Product from './component/product/index';
import Category from './component/category/index';
import CategoryAdd from './component/category/add';
import CategoryEdit from './component/category/edit';
import About from './component/About';
import CreateProduct from './component/product/create';
import ProtectedRoute from './component/ProtectedRoute';
import Login from './component/Login';
import Auth from './component/Auth';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  const history = useHistory();
  const logout = () => {
    Auth.logout();
    history.push('/login');
  }
  return (
    <Switch>
      <Route path="/login" exact component={Login} />
      <div className="App">
        <div className="container-fluid">
          <nav className="navbar navbar-expand-sm navbar-light bg-light">
            <NavLink className="navbar-brand" to="/">Home</NavLink>
            <button className="navbar-toggler d-lg-none" type="button" data-toggle="collapse" data-target="#collapsibleNavId" aria-controls="collapsibleNavId"
              aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="collapsibleNavId">
              <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
                <li className="nav-item active">
                  <NavLink className="nav-link" to="/">Home <span className="sr-only">(current)</span></NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/about">About</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/category">Category</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/product">Product</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="#" onClick={logout}>Logout</NavLink>
                </li>
              </ul>
              <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
              </form>
            </div>
          </nav>
        </div>
        <div className="container" style={{ padding: 40 }}>
          <Switch>
            <ProtectedRoute path="/" exact component={Home} />
            <ProtectedRoute path="/about" exact component={About} />
            <ProtectedRoute path="/category" exact component={Category} />
            <ProtectedRoute path="/category/add" component={CategoryAdd} />
            <ProtectedRoute path="/category/:id/edit" component={CategoryEdit} />
            <ProtectedRoute path="/product" exact component={Product} />
            <ProtectedRoute path="/product/create" component={CreateProduct} />
          </Switch>
        </div>
      </div>
    </Switch>

  );
}

export default App;
