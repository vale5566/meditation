import React, { Component } from "react";
import { Image, View, StyleSheet } from "react-native";
import { Constants } from "expo";
import { createStackNavigator } from "react-navigation";
import KeepAwake from "react-native-keep-awake";
import MyButton from "./MyButton.js";

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
        <Image
          source={require("./assets/meditate.gif")}
          style={{ width: 500, height: 700, position: "absolute" }}
        />
        <MyButton
          styles={styles.button}
          title="Stopp"
          onPress={this.onStopPress}
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
