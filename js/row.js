import React,{Component} from 'react';
import {
	View,
	TextInput,
	StyleSheet,
  Switch
} from 'react-native';

export default class Row extends Component{
  render(){
    return(
      <View style={styles.container}>
        <Switch
          value={complete}
        />
      </View>
    );
  }
}
