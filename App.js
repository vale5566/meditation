import React from 'react';
import { StyleSheet, Text, View, Button, TouchableOpacity, Image } from 'react-native';

class MyButton extends React.Component {
  render() {
    return(
    <TouchableOpacity onPress={this.onPress}>
      <View style={{margin: 50, padding: 50, backgroundColor: 'green', alignItems: 'center', justifyContent: 'center', borderRadius: 20}}>
          <Text style={{color: 'white'}}>New Session</Text>
      </View>
    </TouchableOpacity>
    )
  }
}


export default class App extends React.Component {
  onPress() {
    console.log("bla");
  }
  render() {
    return (
      <View style={{backgroundColor: "blue", height: "100%", width: "100%"}}>
      <View style={{marginTop: 50, alignItems: 'center', justifyContent: 'center'}}>
        <Image source={require("./assets/icon.png")} />
        </View>
        <Text style={styles.text}>Meditate</Text>
        <MyButton></MyButton>
        <Text style= {styles.text1}>Session Log</Text>
         {/*<Button style={styles.button} onPress={this.onPress} title="New Session" color="#841584" />*/}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 80,
    marginTop: 50,
    textAlign: "center",
  },
  text1: {
    textDecorationLine: "underline",
    textAlign: "center",
    fontSize: 20,
  },
  button: {
    margin: 40,
    width: "40%",
  }
});
