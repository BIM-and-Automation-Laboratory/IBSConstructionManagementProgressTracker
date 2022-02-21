import {BrowserRouter as Router, Route} from 'react-router-dom';
import React from 'react';
import {Container} from 'semantic-ui-react';

import MenuBar from './components/MenuBar'
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';
import AuthRoute from './util/AuthRoute';

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import ModelViewer from './pages/ForgeViewer';
import Charts from './pages/Charts';
import SinglePost from './pages/SinglePost';

function App() {
  return (
    <AuthProvider>
      <Router>
      <AuthRoute>
      <Container>
        <MenuBar/>
        <Route exact path = '/home' component = {Home}/>
        <Route exact path = '/forge' component = {ModelViewer}/>
        <Route exact path = '/login' component = {Login}/>
        <Route exact path = '/register' component = {Register}/>
        <Route exact path = '/charts' component = {Charts}/>
        <Route exact path = '/posts/:postId' component = {SinglePost}/>
      </Container>
      </AuthRoute>
      </Router>
    </AuthProvider>
  );
}

export default App;
