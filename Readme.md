# AR/VR google day - 23 Jan 2020

The repo includes 2 parts a server and a client. The server is only necessary if you want to attempt to create something which has communication between multiple users.

Both were setup with typescript for your DX, of course you are not required to write typescript and as such we have set tsconfig to be js friendly. This was also done to make everything a touch more familiar to the angular peeps.

## Gotchas
* In **multiplayer** applications: It is not reasonable to expect two devices running the same application to process dynamic physics exactly the same way. From our experimentation different devices will always have slightly different results. this is most likely due to the nature of AR being a best effort technology and not being able to make guaranties about its interpretation of the real environment. 

* In **multiplayer** applications: it is important to not flood the websocket with updates, This will have an impact on your applications rendering performance (assuming the updates affect rendering). As it will hog the JS thread and trigger continuos re-renders on the client.

* Android and iOS handle AR slightly differently 😔. For one you need to different versions of viroReact for the different platforms. This is why we created a `ios-app`, and `android-app` branch. The package is `"react-viro": "^2.17.0"` on iOS, and `"react-viro": "react-viro@npm:@iskander508/react-viro@0.61.2"` on Android.

* you require a **Android** device with ARCore support, for a list of supported devices please check [developers.google.com/ar/discover/supported-devices](https://developers.google.com/ar/discover/supported-devices).

## Setup
for those who don't have react-native dev environment setup and who want to participate in coding part of event there are some suggestions:
1) Make sure to do all the steps from this guide: https://facebook.github.io/react-native/docs/getting-started
React Native CLI Quickstart -> your os -> your phone os
2) Do "Running your React Native application" part of the guide above on the real device 
3) For ones who have iPhone you will need apple developer account (free one)
4) If you fell yourself frustrated precisely following some RN-related guide and it's not working, don't worry, it's just a part of RN development 🤪

At this point you are ready to try run the repo, or the demo examples from [viro-react](https://github.com/viromedia/viro)

## Libraries

* We are using react native, with [react-viro](https://docs.viromedia.com/docs). Pavol and Frane did an extensive investigation for us a few months ago into what the best options are for the google day 🙇‍♂️ (thanks gents). You can find there findings and there demo app here: [github.com/pfulop/ar-pong](https://github.com/pfulop/ar-pong).

## Server

**This is optional**
To help get you up and running quickly we setup this super tiny node Websocket server. to run it in auto reload mode just run `yarn dev`. 
This is a very simple websocket server that can be configured however you like. just take note that you send strings (or stringified JSON) over WebSockets and need to handle that yourself. You can see what I mean in our demo.

## Tips
* To make your life easier you can setup react native development to work over WiFi. This is done by following the following guide [docs](https://facebook.github.io/react-native/docs/running-on-device#method-2-connect-via-wi-fi).

* You can connect multiple devices to the same development machine. Even if you originally set them up on different machines over usb. Useful for rapid development and avoiding setting up a machine to work for android and iOS.


*This is a best effort to make your lives easier on the google day. We also hacked this together on short notice so keep your opinions of the code to yourselves* 😜