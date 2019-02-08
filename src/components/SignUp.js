import React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet
} from 'react-native';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.viewContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.headings}>
            Name
        </Text>
        </View>
        <TextInput
          style={styles.inputs}
          placeholder='First Name'
        />
        <TextInput
          style={styles.inputs}
          placeholder='Last Name'
        />
        <TextInput
          style={styles.inputs}
          placeholder='Preferred Name'
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headingContainer: {
    width: '70%',
    justifyContent: 'flex-start'
  },
  headings: {
    fontSize: 24,
    color: '#565656'
  },
  inputs: {
    height: 45,
    width: '75%',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#a5adb0',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    margin: 5
  }
})
