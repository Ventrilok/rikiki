import { Server } from 'boardgame.io/server'
import Rikiki from './game/game'

const server = Server({ games: [Rikiki] })
server.run(2468)
