import WebSocket, { AddressInfo } from "ws";
import ip from "ip";

const wss = new WebSocket.Server({ port: 8080 });
console.log((wss.address() as AddressInfo).port);
console.log(`The host IP is: ${ip.address()}`);

type Players = {
  score: number;
  done: boolean;
  deviceName: string;
};

type Message = {
  gameStarted?: boolean;
  hit?: boolean;
  connect?: boolean;
  done?: boolean;
  restart?: boolean;
  player: string;
  deviceName?: string;
};

export class GameState {
  started: boolean = false;
  done: boolean = false;
  players: {
    [key: string]: Players;
  } = {};
}

let gameState = new GameState();

wss.on("connection", (ws: WebSocket) => {
  ws.on("message", (data: string) => {
    const msg = JSON.parse(data);
    console.log("received: %s", msg);
    updateGameState(msg);
    console.log("---> gameState ", gameState);
    broadcast(ws, gameState);
  });

  ws.on("close", () => {
    // console.log(`${player} disconnected`);
    // delete gameState[player];
  });
});

function broadcast(ws: any, data: any) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(createServerMessage(data));
    }
  });
}

function createServerMessage(message: any) {
  return JSON.stringify({
    id: "server",
    deviceName: `${ip.address()}`,
    message
  });
}

function updateGameState(msg: Message) {
  if (msg.gameStarted) {
    gameState.started = true;
  }
  if (msg.restart && gameState.done) {
    gameState = new GameState();
  }
  if (msg.hit) {
    gameState.players[msg.player].score += 1;
  }
  if (msg.connect) {
    const deviceName = msg.deviceName as string;
    gameState.players[deviceName] = {
      score: 0,
      done: false,
      deviceName
    };
  }
  if (msg.done) {
    gameState.players[msg.player].done = true;
    gameState.done = Object.values(gameState.players).reduce((acc: boolean, {done}) => acc && done, true)
  }
}
