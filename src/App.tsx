import { type Component } from 'solid-js'
import { Route, Router } from '@solidjs/router'

import { ROUTES } from './constants/router'
import { CoreProvider } from './context/core.context'

import Alerts from './components/Alerts'
import Loader from './components/Loader'

import Home from './pages/Home'
import MainLayout from './layouts/Main'

const App: Component = () => (
  <CoreProvider>
    <Alerts />
    <Loader />
    <Router root={MainLayout}>
      <Route path={ROUTES.HOME} component={Home} />
    </Router>
  </CoreProvider>
)

export default App
