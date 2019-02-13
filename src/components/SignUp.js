import React from 'react';
import {
  Button,
  View,
  Text,
  TextInput,
  StyleSheet,
  Dimensions,
  Picker,
  ScrollView,
  SafeAreaView
} from 'react-native';

import firebase from 'react-native-firebase';

export default class SignUp extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      firstName: 'Test First Name',
      lastName: 'Test Last Name',
      preferredName: '',
      email: 'test1@test.com',
      password: 'qwerty1!',
      role: 'member',
      section: 'trumpet'
    };
  }

  onSubmit() {
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
      .then((res) => {
        firebase.database().ref('users/' + res.user.uid).set({
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          preferredName: this.state.preferredName,
          role: this.state.role,
          section: this.state.section
        });
      });
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.viewContainer}>
            <View style={styles.subjectContainer}>
              <View style={styles.headingContainer}>
                <Text style={styles.headings}>
                  Email
                </Text>
              </View>
              <TextInput
                style={styles.inputs}
                placeholder='Email'
                onChangeText={(text) => this.setState({ email: text })}
              />
            </View>
            <View style={styles.subjectContainer}>
              <View style={styles.headingContainer}>
                <Text style={styles.headings}>
                  Password
                </Text>
              </View>
              <TextInput
                style={styles.inputs}
                placeholder='Password'
                onChangeText={(text) => this.setState({ password: text })}
              />
            </View>
            <View style={styles.subjectContainer}>
              <View style={styles.headingContainer}>
                <Text style={styles.headings}>
                  Name
                </Text>
              </View>
              <TextInput
                style={styles.inputs}
                placeholder='First Name'
                onChangeText={(text) => this.setState({ firstName: text })}
              />
              <TextInput
                style={styles.inputs}
                placeholder='Last Name'
                onChangeText={(text) => this.setState({ lastName: text })}
              />
              <TextInput
                style={styles.inputs}
                placeholder='Preferred Name'
                onChangeText={(text) => this.setState({ preferredName: text })}
              />
            </View>
            <View style={styles.subjectContainer}>
              <View style={styles.headingContainer}>
                <Text style={styles.headings}>
                  Role
                </Text>
              </View>
              <Picker
                selectedValue={this.state.role}
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue) =>
                  this.setState({ role: itemValue })
                }
                style={styles.picker}
              >
                <Picker.Item label="Member" value="member" />
                <Picker.Item label="Leadership" value="leadership" />
                <Picker.Item label="Staff" value="staff" />
                <Picker.Item label="Director" value="director" />
              </Picker>
            </View>
            <View style={styles.subjectContainer}>
              <View style={styles.headingContainer}>
                <Text style={styles.headings}>
                  Section
            </Text>
              </View>
              <Picker
                selectedValue={this.state.section}
                style={{ height: 50, width: 100 }}
                onValueChange={(itemValue) =>
                  this.setState({ section: itemValue })
                }
                style={styles.picker}
              >
                <Picker.Item label="Trumpet" value="trumpet" />
                <Picker.Item label="Trombone" value="trombone" />
                <Picker.Item label="Mellophone" value="mellophone" />
                <Picker.Item label="Sousaphone" value="sousaphone" />
              </Picker>
            </View>
            <Button
              title='Submit'
              onPress={() => this.onSubmit()}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  viewContainer: {
    flex: 1,
    alignItems: 'center'
  },
  subjectContainer: {
    width: Dimensions.get('window').width,
    marginBottom: 10,
    alignItems: 'center'
  },
  headingContainer: {
    width: '75%',
    justifyContent: 'flex-start'
  },
  headings: {
    fontSize: 24,
    color: '#565656'
  },
  inputs: {
    height: 45,
    width: '80%',
    borderStyle: 'solid',
    borderWidth: 2,
    borderColor: '#a5adb0',
    padding: 5,
    paddingLeft: 10,
    paddingRight: 10,
    borderRadius: 10,
    margin: 5
  },
  picker: {
    height: '30%',
    width: '75%'
  },
})
