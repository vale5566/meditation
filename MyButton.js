import React from "react";
import { StyleSheet, Text, View, Button, TouchableOpacity } from "react-native";

export default class MyButton extends React.Component {
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
