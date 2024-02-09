import { type Component } from 'solid-js'
import { Route, Router } from '@solidjs/router'

import { ROUTES } from './constants/router'
import { GameProvider } from './context/game.context'
import { CoreProvider } from './context/core.context'

import Alerts from './components/Alerts'
import Loader from './components/Loader'

import Room from './pages/Room'
import Vote from './pages/Vote'
import BaseLayout from './layouts/Base'

const App: Component = () => (
  <CoreProvider>
    <GameProvider>
      <Alerts />
      <Loader />
      <Router root={BaseLayout}>
        <Route path={ROUTES.HOME} component={Room} />
        <Route path={ROUTES.GAME} component={Vote} />
      </Router>
    </GameProvider>
  </CoreProvider>
)

export default App
