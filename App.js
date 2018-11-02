import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image
} from "react-native";
import SessionScreen from "./SessionScreen.js";
import MediationScreen from "./MediationScreen.js";
import { createStackNavigator } from "react-navigation";

class MyButton extends React.Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View
          style={{
            margin: 50,
            padding: 50,
            backgroundColor: "#1C9C7C",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 20
          }}
        >
          <Text style={{ color: "white", fontSize: 30 }}>
            {this.props.title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home",
    headerStyle: {
      backgroundColor: "#CDE6DD"
    },
    headerTintColor: "#fff",
    headerTitleStyle: {
      fontWeight: "bold"
    }
  };
  constructor() {
    super();
    this.onPress = this.onPress.bind(this);
  }
  onPress() {
    this.props.navigation.navigate("Session");
  }
  render() {
    return (
      <View
        style={{ backgroundColor: "#CDE6DD", height: "100%", width: "100%" }}
      >
        <View
          style={{
            marginTop: 50,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Image source={require("./assets/icon.png")} />
        </View>
        <Text style={styles.text}>Meditate</Text>
        <MyButton title="New Session" onPress={this.onPress} />
        <Text style={styles.text1}>Session Log</Text>

        {/*<Button style={styles.button} onPress={this.onPress} title="New Session" color="#841584" />*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    fontSize: 80,
    marginTop: 50,
    textAlign: "center",
    color: "#1B4C3E"
  },
  text1: {
    textDecorationLine: "underline",
    textAlign: "center",
    fontSize: 20
  },
  button: {
    margin: 40,
    width: "40%"
  }
});

const RootStack = createStackNavigator(
  {
    Home: HomeScreen,
    Session: SessionScreen,
    Mediation: MediationScreen
  },
  {
    initialRouteName: "Home"
  }
);
export default RootStack;
