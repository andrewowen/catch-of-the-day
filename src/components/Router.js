import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import StorePicker from './StorePicker'
import App from './App'
import NotFound from './NotFound'

const Router = () => (
  <BrowserRouter>
    <div>
      <Switch>
        <Route exact path="/catch-of-the-day/" component={StorePicker} />
        <Route path="/store/:storeId" component={App} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
)

export default Router
