import {useEffect, useRef, useState, useCallback} from 'react';
import {setupWebSocket} from './WebSocketController';
import {GameState} from '../../server/server';
const wsPromise = setupWebSocket();

export default () => {
  const [gameState, setGameState] = useState<null | GameState>(null);
  const wsInstance = useRef<null | WebSocket>(null);

  useEffect(() => {
    console.log('useEffect');
    wsPromise.then(ws => {
      wsInstance.current = ws;
      ws.onmessage = function incoming(msg) {
        const data = JSON.parse(msg.data);
        setGameState(data.message);
      };
    });
  }, []);
  const sendMessage = useCallback(
    (data: {[key: string]: any}) =>
      wsInstance?.current && wsInstance.current.send(JSON.stringify(data)),
    [wsInstance],
  );

  return {
    gameState,
    sendMessage,
  };
};
