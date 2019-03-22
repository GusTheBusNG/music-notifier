import React from 'react';
import firebase from 'react-native-firebase';
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  View
} from 'react-native';
import { Text, Button } from 'react-native-elements';

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

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, }}>
          <Text h4>Hello, {this.state.preferredName}</Text>
        </ScrollView>
        <View style={styles.viewContainer}>
          <Button containerStyle={styles.buttonContainer} buttonStyle={styles.button} titleStyle={styles.buttonText} title='Local network' />
          <Button containerStyle={styles.buttonContainer} buttonStyle={styles.button} titleStyle={styles.buttonText} title='Internet' />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'flex-end'
  },
  buttonContainer: {
    padding: 15,
  },
  button: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingTop: 7,
    paddingLeft: 12,
    height: 80,
    width: 150,
    borderRadius: 10,
  },
  buttonText: {
    fontWeight: 'bold'
  }
})