Welcome to [PairUp](https://pairupapp.com/)!

PairUp is a peer-to-peer mentorship platform enabling remote and in-person teams to experience higher levels of engagement and improved performance. Combining research in psychology and human computer interaction, PairUp facilitates a seamless mentorship experience to foster knowledge-sharing, feedback, and collaboration.  

You can find PairUp in the [App Store](https://apps.apple.com/us/app/pairup-support/id1312752082) and [Google Play](https://play.google.com/store/apps/details?id=com.pairup.pairup).

## Get Started

To run the app on your own, download this repository on your workstation. If you've got the `credentials/firebaseCredentials.js` file, you can use the following commands from the root directory to get PairUp running:

```
yarn install
expo start
```

Once Expo starts, follow the instructions to build the app on an iOS/Android
emulator, or scan the generated QR code from a physical device.

### Dependencies

This project is build on [React Native](https://reactnative.dev/) and [Expo](https://expo.io/). Additionally, PairUp utilizes these dependencies:
* [Firebase](https://firebase.google.com/) for auth and storage
* [React Navigation](https://reactnavigation.org/) for routing and screen management
* [Sketch](https://www.sketch.com/) for creating assets like graphics and animation

### Updating to New Releases

Updating the `react-native-scripts` dependency of your app should be as simple as bumping the version number in `package.json` and reinstalling your project's dependencies.

Upgrading to a new version of React Native requires updating the `react-native`, `react`, and `expo` package versions, and setting the correct `sdkVersion` in `app.json`. See the [versioning guide](https://github.com/react-community/create-react-native-app/blob/master/VERSIONS.md) for up-to-date information about package version compatibility.
