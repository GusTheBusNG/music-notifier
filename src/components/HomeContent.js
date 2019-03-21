import React from 'react';
import firebase from 'react-native-firebase';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { Text } from 'react-native-elements';

export default class HomeContent extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      preferredName: ''
    }
  }

  async componentDidMount() {
    const currentUsersEmail = await firebase.auth().currentUser.email;
    this.setState({ preferredName: currentUsersEmail })
  }

  pressedLiveButton = () => {
    this.setState({ text: 'Hello' });
  }

  render() {
    return (
      <SafeAreaView>
        <ScrollView>
          <Text h4>Hello, {this.state.preferredName}</Text>
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