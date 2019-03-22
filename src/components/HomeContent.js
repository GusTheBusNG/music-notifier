import React from 'react';
import firebase from 'react-native-firebase';
import {
  ScrollView,
  SafeAreaView,
  View
} from 'react-native';
import { Text, Button, ListItem } from 'react-native-elements';
import button from '../styles/buttons'

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
    const list = [
      {
        title: 'Appointments',
        icon: 'av-timer'
      },
      {
        title: 'Trips',
        icon: 'flight-takeoff'
      }
    ]
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1, }}>
          <Text h4>Hello, {this.state.preferredName}</Text>
          {
            list.map((item, i) => (
              <ListItem
                key={i}
                title={item.title}
                leftIcon={{ name: item.icon }}
                chevron={true}
                checkmark={true}
              />
            ))
          }
        </ScrollView>
        <View style={button.viewContainer}>
          <Button containerStyle={button.buttonContainer} buttonStyle={button.button} titleStyle={button.buttonText} title='Internet' />
        </View>
      </SafeAreaView>
    )
  }
}