import React from 'react';
import {
  Animated,
  Button,
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';

import firebase from 'react-native-firebase';
import validator from 'validator';

const DissmissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);

export default class LoginInputs extends React.Component {
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
      emailBorderColor: this.colors.gray,
      passwordBorderColor: this.colors.gray,
      fadeAnimation: new Animated.Value(0),
      currentEmail: '',
      currentPassword: '',
    };
  }

  validateEmail(text) {
    if (validator.isEmail(text)) {
      this.firstEmailTry = false;
      this.setState({ emailBorderColor: this.colors.green, currentEmail: text });
      this.passwordFieldFadeIn()
    } else if (!this.firstEmailTry) {
      this.setState({ emailBorderColor: this.colors.red });
    }
  }

  validatePassword(text) {
    if (text.length > 6) {
      this.setState({ passwordBorderColor: this.colors.green, currentPassword: text });
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
        duration: 500
      }
    ).start();
  }

  async login() {
    try {
      var output = await firebase.auth().signInWithEmailAndPassword(this.state.currentEmail, this.state.currentPassword);
    } catch (error) {
      this.setState({
        emailBorderColor: this.colors.red,
        passwordBorderColor: this.colors.red
      });
      console.error('Error on login: ', error);
    }
  }

  render() {
    return (
      <DissmissKeyboard>
        <View style={styles.container}>
          <KeyboardAvoidingView behavior='position' contentContainerStyle={{ width: Dimensions.get('window').width, alignItems: 'center' }}>
            <TextInput
              style={[styles.inputFields, { borderColor: this.state.emailBorderColor }]}
              placeholder="Email or phone number"
              blurOnSubmit={true}
              autoCapitalize='none'
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
              onPress={() => this.login()}
              title='Sign in'
            />
          </KeyboardAvoidingView>
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
    borderWidth: 2,
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    margin: 5
  },
  signInButton: {
    paddingTop: 100,
  }
});