import React from 'react';
import firebase from 'react-native-firebase';
import LoginInputs from '../components/LoginInputs';
import HomeContent from '../components/HomeContent';

export default class HomePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      user: null
    }
    this.unsubscriber = null;
  }

  componentDidMount() {
    this.unsubscriber = firebase.auth().onAuthStateChanged((user) => {
      this.setState({ user });
    });
  }

  componentWillUnmount() {
    if (this.unsubscriber) {
      this.unsubscriber();
    }
  }

  render() {
    if (!this.state.user) {
      return <LoginInputs />;
    }

    return (
      <HomeContent />
    )
  }
}