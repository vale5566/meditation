import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Constants } from "expo";
import { createStackNavigator } from "react-navigation";
import KeepAwake from "react-native-keep-awake";
import MyButton from "./MyButton.js";
import { Video } from "expo";

const vid = require("./assets/meditate.mp4");

export default class MediationScreen extends Component {
  static navigationOptions = {
    title: "Mediation"
  };

  constructor() {
    super();
    this.onStopPress = this.onStopPress.bind(this);
  }
  onStopPress() {
    // same as "const navigation = this.props.navigation;"
    const { navigation } = this.props;
    navigation.state.params.onStopPress();
    navigation.pop();
  }
  render() {
    return (
      <View style={styles.container}>
        <View style={{ backgroundColor: "#CDE6DD", height: 40 }} />
        <Video
          source={vid}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{
            width: 400,
            height: 900,
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1
          }}
        />
        <MyButton
          styles={[
            styles.button,
            {
              zIndex: 10,
              position: "absolute",
              bottom: 10,
              left: 10,
              right: 10
            }
          ]}
          title="Stopp"
          onPress={this.onStopPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#CDE6DD",
    height: "100%",
    width: "100%"
  }
});
