import DeviceInfo from 'react-native-device-info';

console.log('WebsocketController.tsx');

console.log(DeviceInfo.getDeviceId(), DeviceInfo.getDeviceName());

// The URL is currently hard coded. update update this to the server ip address
const SERVER_IP = 'ws://10.10.102.136:8080';

export type MessageType = {
  deviceName: string;
  id: string;
  message?: {};
};

export async function getDeviceDetails(): Promise<MessageType> {
  return {
    deviceName: await DeviceInfo.getDeviceName(),
    id: DeviceInfo.getUniqueId(),
  };
}

export async function setupWebSocket() {
  const details = await getDeviceDetails();
  return setupSocketConnection(details);
}

function setupSocketConnection(messageDetails: MessageType) {
  const ws = new WebSocket(SERVER_IP);

  // send a message to the server when the connection is established;
  ws.onopen = function open() {
    ws.send(
      JSON.stringify({
        ...messageDetails,
        message: `${messageDetails.deviceName} connected`,
      }),
    );
  };

  return ws;
}
