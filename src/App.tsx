import { type Component } from 'solid-js'
import { Route, Router } from '@solidjs/router'

import { ROUTES } from './constants/router'
import { RoomProvider } from './contexts/room.context'

import Room from './pages/Room'
import Vote from './pages/Vote'

const App: Component = () => (
  <RoomProvider>
    <div class="container mx-auto">
      <header class="text-center">SUPAPOKER</header>
      <Router>
        <Route path={ROUTES.HOME} component={Room} />
        <Route path={ROUTES.GAME} component={Vote} />
      </Router>
    </div>
  </RoomProvider>
)

export default App
