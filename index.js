// /** @format */

// import {AppRegistry} from 'react-native';
import LoginInputs from './src/components/LoginInputs';
import SignUp from './src/components/SignUp';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);


import { Navigation } from 'react-native-navigation';

Navigation.registerComponent(`Login`, () => LoginInputs);
Navigation.registerComponent(`SignUp`, () => SignUp);

Navigation.events().registerAppLaunchedListener(() => {
  Navigation.setRoot({
    root: {
      stack: {
        children: [
          {
            id: 'App Stack',
            component: {
              name: "Login"
            }
          }
        ]
      }
    }
  });
});