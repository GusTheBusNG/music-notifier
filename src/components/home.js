import React from 'react';
import firebase from 'react-native-firebase';
import { Navigation } from 'react-native-navigation';
import {
  StyleSheet,
  View,
  ScrollView,
  SafeAreaView,
  TouchableHighlight
} from 'react-native';
import { Text } from 'react-native-elements';


export default class HomePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      text: 'First Press',
      preferredName: ''
    }

    this.setName();
  }

  async setName() {
    let value = await firebase.firestore().collection('/users/').get();
    value = value.docs.pop().data();

    console.log('Value: ', value)

    this.setState({ preferredName: 'Nick' });
  }

  pressedLiveButton = () => {
    this.setState({ text: 'Hello' });
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <Text h4>Hello, {this.state.preferredName}</Text>
          <View style={styles.container}>
            <TouchableHighlight
              onPress={this.pressedLiveButton}
              style={styles.button}
              underlayColor='#ff00ff'
            >
              <Text>{this.state.text}</Text>
            </TouchableHighlight>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10
  }
})