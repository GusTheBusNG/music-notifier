import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, TextInput, Keyboard, Animated, Button, KeyboardAvoidingView } from 'react-native';

import firebase from 'react-native-firebase';
import validator from 'validator';

const DissmissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.firstEmailTry = true;
    this.firstPasswordTry = true;
    this.colors = {
      green: '#51db39',
      red: '#f44242',
      gray: '#a5adb0'
    }
    this.state = {
      borderColor: this.colors.gray,
      passwordBorderColor: this.colors.gray,
      fadeAnimation: new Animated.Value(0)
    };
  }

  async componentDidMount() {
    // TODO: You: Do firebase things
    // const { user } = await firebase.auth().signInAnonymously();
    // console.warn('User -> ', user.toJSON());

    // await firebase.analytics().logEvent('foo', { bar: '123' });
  }

  validateEmail(text) {
    if (validator.isEmail(text)) {
      this.firstEmailTry = false;
      this.setState({ borderColor: this.colors.green });
      this.passwordFieldFadeIn()
    } else if (!this.firstEmailTry) {
      this.setState({ borderColor: this.colors.red });
    }
  }

  validatePassword(text) {
    if (text.length > 6) {
      this.setState({ passwordBorderColor: this.colors.green });
      this.firstPasswordTry = false;
    } else if (!this.firstPasswordTry) {
      this.setState({ passwordBorderColor: this.colors.red });
    }
  }

  passwordFieldFadeIn() {
    Animated.timing(
      this.state.fadeAnimation,
      {
        toValue: 1,
        duration: 1000
      }
    ).start();
  }

  render() {
    return (
      <DissmissKeyboard>
        <View style={styles.container}>
          <TextInput
            style={[styles.inputFields, { borderColor: this.state.borderColor }]}
            placeholder="Email or phone number"
            blurOnSubmit={true}
            onChangeText={(text) => this.validateEmail(text)}
          />
          <Animated.View style={{
            alignItems: 'center',
            width: '100%',
            opacity: this.state.fadeAnimation
          }}>
            <TextInput
              style={[styles.inputFields, { borderColor: this.state.passwordBorderColor }]}
              placeholder="Password"
              blurOnSubmit={true}
              secureTextEntry={true}
              onChangeText={(text) => this.validatePassword(text)}
            />
          </Animated.View>
          <Button
            onPress={() => console.log('Signed in')}
            title='Sign in'
          />
        </View>
      </DissmissKeyboard>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputFields: {
    height: 45,
    width: '75%',
    borderStyle: 'solid',
    borderColor: '#a5adb0',
    borderWidth: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    margin: 5
  },
  signInButton: {
    marginTop: 15,
  }
});