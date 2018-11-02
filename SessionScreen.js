import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TouchableOpacity,
  Image,
  TextInput
} from "react-native";
import DatePicker from "react-native-datepicker";

function MinutesToDuration(str) {
  array = str.split(":");
  min = parseInt(array[0]) * 60;
  sec = parseInt(array[1]);
  total = sec + min;
  return total;
}

class MyButton extends React.Component {
  render() {
    return (
      <View
        style={{
          margin: 90
        }}
      >
        <TouchableOpacity onPress={this.props.onPress}>
          <View
            style={{
              padding: 20,
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
      </View>
    );
  }
}

class InputText extends React.Component {
  constructor(props) {
    super(props);
    this.state = { text: "" };
    this.fixText = this.fixText.bind(this);
  }
  fixText(text) {
    //Removing "." "," "-" " "
    if (
      text.includes(".") ||
      text.includes(",") ||
      text.includes("-") ||
      text.includes(" ")
    ) {
      return;
    }
    //No more than 5 character and no more than 4 digit
    if (text.length > 5) {
      return;
    }

    var newText;

    //Removing the :
    if (text.length == 3 && this.state.text.length === 4) {
      newText = text.substring(0, 2);
    } else if (text.length === 3 && this.state.text.length === 2) {
      newText = this.state.text + ":" + text.charAt(2);
    } else if (text.length === 2 && this.state.text.length === 1) {
      //Adding the :
      newText = text + ":";
    } else {
      newText = text;
    }

    this.setState({ text: newText });
    this.props.onChange(MinutesToDuration(newText));
  }

  render() {
    return (
      <TextInput
        placeholder={this.props.placeholder}
        underlineColorAndroid="transparent"
        style={{ height: 40, margin: 40 }}
        value={this.state.text}
        onChangeText={this.fixText}
        keyboardType="numeric"
      />
    );
  }
}

class SessionScreen extends React.Component {
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

  onStartPress() {
    var warm_up = this.state["warm_up"] || 0;
    var session_time = this.state["session_time"] || 0;
    var gong_period = this.state["gong_period"] || 0;

    if (warm_up === 0 || session_time === 0) return;

    this.startTimer("warm_up", 0, warm_up);
    this.startTimer("session_time", warm_up, session_time, () =>
      console.log("end")
    );

    if (gong_period === 0) return;
    setTimeout(() => {
      this["gong_period_timer"] = setInterval(() => {
        console.log("gongg");

        if (this.state["session_time_remaining"] == 0) {
          clearInterval(this["gong_period_timer"]);
          //play end sound
        } else {
          //play gong sound
        }
      }, gong_period * 1000);
    }, warm_up * 1000);

    // this.setState({ secondsRemaining: newSecondsRemaining });
    //
    // this.interval = setInterval(() => {
    //   if (this.state.secondsRemaining == 0) {
    //     clearInterval(this.interval);
    //     //run what happened when timer stops
    //     return;
    //   }
    //   console.log(this.state.secondsRemaining + " of " + newSecondsRemaining);
    //
    //   this.setState({ secondsRemaining: this.state.secondsRemaining - 1 });
    // }, 1000);
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
        <Text>{JSON.stringify(this.state)}</Text>

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

/*
<Text style={styles.text}>New Session</Text>
<Text style={[styles.text1, { marginTop: 40 }]}>Warm-Up</Text>
<TextInput
  placeholder="00:30"
  underlineColorAndroid="transparent"
  style={{ height: 40, margin: 40 }}
  value={this.state.textWarmUp}
  onChangeText={this.fixText}
  keyboardType="numeric"
/>
<Text style={[styles.text1]}>Session Time</Text>
<TextInput
  placeholder="15:00"
  underlineColorAndroid="transparent"
  style={{ height: 40, margin: 40 }}
  value={this.state.textSessionTime}
  onChangeText={this.fixText}
  keyboardType="numeric"
/>
<Text style={[styles.text1]}>Gong Period</Text>
<TextInput
  placeholder="01:00"
  underlineColorAndroid="transparent"
  style={{ height: 40, margin: 40 }}
  value={this.state.textGongPeriod}
  onChangeText={this.fixText}
  keyboardType="numeric"
/>
*/

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
    top: 340
  },
  bell: {
    position: "absolute",
    width: 24,
    height: 24,
    left: 80,
    top: 485
  }
});

export default SessionScreen;
