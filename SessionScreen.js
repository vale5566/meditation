import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image, TimePickerAndroid } from 'react-native';

class SessionScreen extends React.Component {
  timepicker() {
    TimePickerAndroid.open({
        hour: 12,
        minute: 0
      }).then(({action, hour, minute}) => {
        if (action !== TimePickerAndroid.dismissedAction) {
         // handles the `hour` and `minute`
         console.log(hour, minute);
        }
      }).catch(() => {
         console.warn('Cannot open time picker. Please try it again.');
      });
  }

  render() {
    return <Button onPress={this.timepicker} title="asdf"/>
  }
}

export default SessionScreen
