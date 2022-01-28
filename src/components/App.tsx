import React from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Card from '../card/card';
import { Main } from '../main/Main';
import './App.css';
const App = () => {

  // expect(element).toHaveTextContent(/react/i)

  return (
    <BrowserRouter>
      <div className="conteiner">
        <Switch>
          <Route exact path="/" component={Main} />
          <Route path="/card/:username/:reponame" component={Card} />
          <Redirect to="/" />
        </Switch>
      </div>
    </BrowserRouter>
  );
}

export default App;
