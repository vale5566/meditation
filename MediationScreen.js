import React, { Component } from "react";
import { Image, View, StyleSheet } from "react-native";
import { Constants } from "expo";
import { createStackNavigator } from "react-navigation";

export default class MediationScreen extends Component {
  static navigationOptions = {
    title: "Mediation"
  };
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://media.giphy.com/media/xUOxf34uHq8VolxF7y/giphy.gif"
          }}
          style={{ width: 300, height: 300 }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#000"
  }
});
