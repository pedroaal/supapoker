import { type Component } from 'solid-js'
import { Route, Router } from '@solidjs/router'

import { ROUTES } from './constants/router'
import { GameProvider } from './context/game.context'
import { CoreProvider } from './context/core.context'

import Alerts from './components/Alerts'
import Loader from './components/Loader'

import Room from './pages/Room'
import Vote from './pages/Vote'

const App: Component = () => (
  <CoreProvider>
    <GameProvider>
      <div class="container mx-auto">
        <header class="text-center">SUPAPOKER</header>
        <Alerts />
        <Loader />
        <Router>
          <Route path={ROUTES.HOME} component={Room} />
          <Route path={ROUTES.GAME} component={Vote} />
        </Router>
      </div>
    </GameProvider>
  </CoreProvider>
)

export default App
