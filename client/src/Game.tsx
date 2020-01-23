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
  [0, -2, -12],
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
        // onCollision={() => {
        //   sendMessage({
        //     player: playerName,
        //     done: true,
        //   });
        // }}
        height={0.1}
        length={16}
        width={5}
        position={[0, -2.1, -8]}
        materials={['ground']}
        physicsBody={{
          type: 'Static',
          restitution: 0.5,
        }}
      />
        <ViroBox
        viroTag="cave"
        height={0.5}
        length={4}
        width={7}
        position={[0, -2.5, -18]}
        materials={['side']}
        physicsBody={{
          type: 'Static',
          restitution: 0.5,
        }}
      />
      <ViroBox
        viroTag="back"
        height={7}
        length={0.5}
        width={3}
        rotation={[0,0,-90]}
        position={[0, -1, -20]}
        materials={['side']}
        physicsBody={{
          type: 'Static',
          restitution: 0,
        }}
      />
      <ViroBox
        viroTag="leftside"
        height={0.1}
        length={16}
        width={0.5}
        rotation={[0,0,15]}
        position={[-2.25, -1.88, -7]}
        materials={['side']}
        physicsBody={{
          type: 'Static',
          restitution: 0,
        }}
      />
      <ViroBox
        viroTag="leftside"
        height={0.1}
        length={16}
        width={0.5}
        //rotation={[0,0,20]}
        position={[-2.7, -1.9, -7]}
        materials={['side']}
        physicsBody={{
          type: 'Static',
          restitution: 0,
        }}
      />
      <ViroBox
        viroTag="leftside"
        height={0.1}
        length={21}
        width={1.5}
        rotation={[0,0,-90]}
        position={[-3.1, -1.8, -9]}
        materials={['side']}
        physicsBody={{
          type: 'Static',
          restitution: 0,
        }}
      />
      <ViroBox
        viroTag="rightside"
        height={0.1}
        length={16}
        width={0.5}
        rotation={[0,0,-15]}
        position={[2.25, -1.88, -7]}
        materials={['side']}
        physicsBody={{
          type: 'Static',
          restitution: 0,
        }}
      />
      <ViroBox
        viroTag="rightside"
        height={0.1}
        length={16}
        width={0.5}
        //rotation={[0,0,20]}
        position={[2.7, -1.9, -7]}
        materials={['side']}
        physicsBody={{
          type: 'Static',
          restitution: 0,
        }}
      />
      <ViroBox
        viroTag="rightside"
        height={0.1}
        length={21}
        width={1.5}
        rotation={[0,0,-90]}
        position={[3.1, -1.8, -9]}
        materials={['side']}
        physicsBody={{
          type: 'Static',
          restitution: 0,
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
        rotation={[0,-110,15]}
        materials={['dave']}
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
            mass: 2,
            restitution: 0.1,
            shape: {
              type: 'Compound',
              params: [0.3, 0.5, 0.3],
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
  dave: {
    diffuseTexture: require('./res/dave2.jpg'),
    // diffuseColor: 'red',
  },
  ground: {
    diffuseTexture: require('./res/ground.png'),
    // diffuseColor: 'green',
  },
  ditch: {
    // diffuseTexture: require('./res/ground.png'),
    diffuseColor: 'green',
  },
  pin: {
    diffuseTexture: require('./res/pinTexture.jpg'),
  },
  ball: {
    diffuseTexture: require('./res/ball.jpg'),
    // diffuseColor: 'green',
  },
  side: {
    diffuseTexture: require('./res/side.jpg'),
    // diffuseColor: 'green',
  },
  wall: {
    diffuseTexture: require('./res/wall.jpg'),
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
