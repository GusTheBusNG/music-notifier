import HomePage from './src/pages/Home';
import SignUp from './src/pages/SignUp';
import { Navigation } from 'react-native-navigation';

Navigation.registerComponent(`Home`, () => HomePage);
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