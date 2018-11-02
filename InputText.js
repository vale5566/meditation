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

import { MinutesToDuration } from "./SessionScreen";

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
        textAlign={"center"}
        placeholder={this.props.placeholder}
        underlineColorAndroid="transparent"
        style={{ height: 40, margin: 40, fontSize: 30 }}
        value={this.state.text}
        onChangeText={this.fixText}
        keyboardType="numeric"
      />
    );
  }
}

export default InputText;
