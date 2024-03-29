import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView
} from "react-native";
import { createStackNavigator } from "react-navigation";
import MediationScreen from "./MediationScreen.js";
import MyButton from "./MyButton.js";

import InputText from "./InputText.js";

export function MinutesToDuration(str) {
  array = str.split(":");
  min = parseInt(array[0]) * 60;
  sec = parseInt(array[1]);
  total = sec + min;
  return total;
}

class SessionScreen extends React.Component {
  static navigationOptions = {
    title: "Session"
  };
  constructor(props) {
    super(props);
    this.state = {};
    // key: seconds
    // key_remaining: seconds

    this.onStartPress = this.onStartPress.bind(this);
    this.onStopPress = this.onStopPress.bind(this);
  }

  startTimer(key, delay, duration, onEnd) {
    this.setState({ [key + "_remaining"]: delay + duration });

    this[key + "_timer"] = setInterval(() => {
      var value = this.state[key + "_remaining"];

      if (value == 0) {
        clearInterval(this[key + "_timer"]);
        //run what happened when timer stops
        onEnd && onEnd();
        return;
      }

      this.setState({ [key + "_remaining"]: value - 1 });
    }, 1000);
  }

  onStopPress() {
    clearInterval(this["warm_up_timer"]);
    clearInterval(this["session_time_timer"]);
    clearInterval(this["gong_period_timer"]);

    this.setState({
      session_time_remaining: undefined,
      warm_up_remaining: undefined
    });
  }

  async onStartPress() {
    var warm_up = this.state["warm_up"] || 0;
    var session_time = this.state["session_time"] || 0;
    var gong_period = this.state["gong_period"] || 0;

    if (warm_up === 0 || session_time === 0) return;

    const onEnd = async () => {
      const soundObject = new Expo.Audio.Sound();
      try {
        await soundObject.loadAsync(require("./assets/finishgong.wav"));
        await soundObject.playAsync();
        // Your sound is plasetPositionAsyncying!
      } catch (error) {
        console.error("play sound error", error);
      }

      this.props.navigation.pop();
    };

    this.startTimer("warm_up", 0, warm_up);
    this.startTimer("session_time", warm_up, session_time, onEnd);

    const gongSound = new Expo.Audio.Sound();
    await gongSound.loadAsync(require("./assets/gong.mp3"));

    const onGong = async () => {
      if (this.state["session_time_remaining"] === 0) {
        clearInterval(this["gong_period_timer"]);
        return;
      }

      try {
        console.log("play");
        await gongSound.setPositionAsync(0);
        await gongSound.playAsync();

        // Your sound is playing!
      } catch (error) {
        console.error("play gong error", error);
      }
    };
    if (gong_period === 0) return;
    setTimeout(() => {
      this["gong_period_timer"] = setInterval(onGong, gong_period * 1000);
    }, warm_up * 1000);

    this.props.navigation.navigate("Mediation", {
      onStopPress: this.onStopPress
    });
  }

  render() {
    var types = [
      {
        key: "warm_up",
        name: "Warm Up",
        placeholder: "00:30"
      },
      {
        key: "session_time",
        name: "Session Time",
        placeholder: "15:00"
      },
      {
        key: "gong_period",
        name: "Gong Period",
        placeholder: "01:00"
      }
    ];

    return (
      <View
        style={{
          backgroundColor: "#CDE6DD",
          height: "100%",
          width: "100%"
        }}
      >
        <View style={{ backgroundColor: "#CDE6DD", height: 40 }} />
        <View style={{ alignItems: "center" }}>
          <View style={[styles.lineStyle, { top: 220 }]} />
        </View>
        <View style={{ alignItems: "center" }}>
          <View style={[styles.lineStyle, { top: 380 }]} />
        </View>

        <Text style={styles.text}>New Session</Text>
        {types.map(type => {
          return (
            <View key={type.key}>
              <Text style={[styles.text1]}>{type.name}</Text>
              <InputText
                placeholder={type.placeholder}
                onChange={seconds => {
                  this.setState({ [type.key]: seconds });
                }}
              />
            </View>
          );
        })}

        <Image
          style={styles.sandclock}
          source={require("./assets/sandclock.png")}
        />
        <Image style={styles.clock} source={require("./assets/clock.png")} />
        <Image style={styles.bell} source={require("./assets/bell.png")} />

        {/*here start the Button*/}
        <View style={styles.bottom}>
          {this.state["session_time_remaining"] === undefined ||
          this.state["session_time_remaining"] === 0 ? (
            <MyButton
              styles={styles.button}
              title="GO!"
              onPress={this.onStartPress}
            />
          ) : (
            <MyButton
              styles={styles.button}
              title="Stopp"
              onPress={this.onStopPress}
            />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  bottom: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  text: {
    textAlign: "center",
    color: "#1B4C3E",
    fontSize: 50
  },
  text1: {
    textAlign: "center",
    color: "#1B4C3E",
    fontSize: 30
  },
  sandclock: {
    position: "absolute",
    width: 24,
    height: 24,
    left: 80,
    top: 155
  },
  clock: {
    position: "absolute",
    width: 24,
    height: 24,
    left: 80,
    top: 320
  },
  bell: {
    position: "absolute",
    width: 24,
    height: 24,
    left: 80,
    top: 485
  },
  lineStyle: {
    borderWidth: 2,
    borderColor: "#1B4C3E",
    width: 200
  }
});

export default SessionScreen;
