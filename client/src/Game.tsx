import React, {useEffect, useRef, useState} from 'react';
import {
  ViroARScene,
  ViroAmbientLight,
  ViroBox,
  ViroMaterials,
  ViroSphere,
  ViroText,
  Viro3DObject
} from 'react-viro';
import useWSServer from './useWSServer';
import {StyleSheet} from 'react-native';
import {getDeviceDetails} from './WebSocketController';

const initialPosition = [Math.random() * 0.1, -1.5, -2];

const Game: React.FC = () => {
  const {sendMessage, gameState} = useWSServer();
  const [playerName, setPlayerName] = useState('');
  const sphereInstance = useRef(null);
  useEffect(() => {
    getDeviceDetails().then(details => setPlayerName(details.deviceName));
  }, []);

  return (
    <ViroARScene>
      <ViroAmbientLight color="#aaaaaa" />

      {gameState?.started && ( // scores
        <>
          <ViroText
            width={1}
            text="Score:"
            position={[-1, 0.3, -3]}
            style={styles.text}
          />
          {Object.entries(gameState?.players || {}).map(([key, value], index) => {
            const {score, done, deviceName} = value;
            return (
              <ViroText
                key={index}
                width={1}
                text={`${deviceName || key}: ${score}`}
                // scale={[0.5, 0.5, 0.5]}
                position={[-1, -0.5 * index, -3]}
                style={[styles.text, {color: done ? 'red' : 'white'}]}
              />
            );
          })}
        </>
      )}

      {!gameState?.started && !gameState?.players[playerName] && (
        <ViroText
          text="Connect"
          // scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.text}
          onClick={() => {
            sendMessage({
              connect: true,
              deviceName: playerName,
            });
          }}
        />
      )}

      {!gameState?.started && !!Object.keys(gameState?.players || {}).length && (
        <ViroText
          text="Start game"
          position={[0, 0, -1]}
          style={styles.text}
          onClick={() => {
            sendMessage({
              gameStarted: true,
            });
          }}
        />
      )}

      {gameState?.done && (
        <ViroText
          text="Restart"
          position={[0, 0.2, -1]}
          style={styles.text}
          onClick={() => {
            sendMessage({
              restart: true,
            });
          }}
        />
      )}
      {/* <ViroBox
        // dragType="FixedToPlane"
        // dragPlane={{
        //   planePoint: [0, -1.5, 0],
        //   planeNormal: [0, 1, 0],
        //   maxDistance: 10,
        // }}
        onCollision={() => {
          sendMessage({
            player: playerName,
            hit: true,
          });
        }}
        onDrag={() => {}}
        height={0.1}
        length={0.3}
        width={0.3}
        position={initialPosition}
        materials={['green']}
        physicsBody={{
          type: 'Static',
          restitution: 1,
          shape: {
            type: 'Sphere',
            params: [0.3],
          },
        }}
      /> */}

      <ViroBox
        viroTag="ground"
        onCollision={() => {
          sendMessage({
            player: playerName,
            done: true,
          });
        }}
        height={0.5}
        length={15}
        width={4}
        position={[0, -2, -9]}
        materials={['black']}
        physicsBody={{
          type: 'Static',
          restitution: 0.5,
        }}
      />
      {/* {gameState?.started && !gameState?.done && ( */}
        <ViroSphere
          viroTag="ball"
          dragType="FixedToPlane"
          dragPlane={{
            planePoint: [0, -1.5, 0],
            planeNormal: [0, 1, 0],
            maxDistance: 5,
          }}
          onDrag={() => {}}
          onFuse={() => { console.log('onFuse')}}
          onHover={() => { console.log('onFuse') }}
          radius={0.20}
          ref={sphereInstance}
          position={[0, -1.5, -2]}
          materials={['red']}
          physicsBody={{
            type: 'Dynamic',
            mass: 6,
            restitution: 1,
          }}
        />
        <Viro3DObject source={require('./res/pin.obj')}
              position={[0, -1.7, -15]}
              resources={[require('./res/pinRessource.mtl'), require('./res/pinTexture.jpg')]}
              scale={[0.04,0.04,0.04]}
              rotation={[-90,0,0]}
              materials={["pin"]}
              type="OBJ" 
              physicsBody={{
                type: 'Dynamic',
                mass: 1.5,
                restitution: 1,
                shape: {
                  type: 'Compound',
                  params: [0.3,2,0.3],
                },
              }}
          />
      {/* )} */}
    </ViroARScene>
  );
};

ViroMaterials.createMaterials({
  green: {
    diffuseTexture: require('./res/grid_bg.jpg'),
    diffuseColor: 'green',
  },
  blue: {diffuseTexture: require('./res/grid_bg.jpg'), diffuseColor: 'blue'},
  red: {
    diffuseTexture: require('./res/face.jpg'),
    // diffuseColor: 'red',
  },
  black: {
    diffuseTexture: require('./res/ground.png'),
    // diffuseColor: 'green',
  },
  pin: {
    diffuseTexture: require('./res/pinTexture.jpg'),
    // diffuseColor: 'green',
  },
});

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Arial',
    fontSize: 20,
    textAlignVertical: 'center',
    textAlign: 'center',
  },
});

export default Game;
