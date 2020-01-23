import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ViroARScene,
  ViroAmbientLight,
  ViroBox,
  ViroMaterials,
  Viro3DObject,
  ViroSphere,
  ViroText,
} from 'react-viro';
import useWSServer from './useWSServer';

import { StyleSheet } from 'react-native';
import { getDeviceDetails } from './WebSocketController';

const pinConfig = [
  [0, -1.9, -12],
  [-0.5, -1.9, -13],
  [0.5, -1.9, -13],
  [-1, -1.9, -14],
  [0, -1.9, -14],
  [1, -1.9, -14],
  [-1.5, -1.9, -15],
  [-0.5, -1.9, -15],
  [0.5, -1.9, -15],
  [1.5, -1.9, -15],
];
const Game: React.FC = () => {
  // const { sendMessage, gameState } = useWSServer();
  const [playerName, setPlayerName] = useState('');
  const sphereInstance = useRef(null);

  useEffect(() => {
    getDeviceDetails().then(details => setPlayerName(details.deviceName));
  }, []);

  return (
    <ViroARScene>
      <ViroAmbientLight color="#aaaaaa" />
      <ViroBox
        viroTag="ground"
        onCollision={() => {
          // sendMessage({
          //   player: playerName,
          //   done: true,
          // });
        }}
        height={0.1}
        length={16}
        width={5}
        position={[0, -2.1, -8]}
        materials={['black']}
        physicsBody={{
          type: 'Static',
          restitution: 0.5,
        }}
      />
      <ViroSphere
        viroTag="ball"
        dragType="FixedToPlane"
        dragPlane={{
          planePoint: [0, -1.5, 0],
          planeNormal: [0, 1, 0],
          maxDistance: 5,
        }}
        onDrag={() => {}}
        onFuse={() => {
          console.log('onFuse');
        }}
        onHover={() => {
          console.log('onFuse');
        }}
        radius={0.3}
        ref={sphereInstance}
        position={[0, -1.5, -2]}
        materials={['red']}
        physicsBody={{
          type: 'Dynamic',
          mass: 6,
          restitution: 1,
        }}
      />
      {pinConfig.map((position, index) => (
        <Viro3DObject
          key={index}
          // ref={a[index]}
          source={require('./res/pin.obj')}
          position={position}
          resources={[
            require('./res/pinRessource.mtl'),
            require('./res/pinTexture.jpg'),
          ]}
          onTransformUpdate={() => {
            console.log('---> qweqwe ');
          }}
          scale={[0.04, 0.04, 0.04]}
          rotation={[-90, 0, 0]}
          materials={['pin']}
          type="OBJ"
          physicsBody={{
            type: 'Dynamic',
            mass: 1.5,
            restitution: 0.5,
            shape: {
              type: 'Compound',
              params: [0.3, 1.5, 0.3],
            },
          }}
        />
      ))}
    </ViroARScene>
  );
};

ViroMaterials.createMaterials({
  green: {
    diffuseTexture: require('./res/grid_bg.jpg'),
    diffuseColor: 'green',
  },
  blue: { diffuseTexture: require('./res/grid_bg.jpg'), diffuseColor: 'blue' },
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
