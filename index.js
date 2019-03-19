import HomePage from './src/components/home';
import LoginInputs from './src/components/LoginInputs';
import SignUp from './src/components/SignUp';
import { Navigation } from 'react-native-navigation';

Navigation.registerComponent(`Home`, () => HomePage);
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
              name: "Home"
            }
          }
        ]
      }
    }
  });
});