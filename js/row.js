import React,{Component} from 'react';
import {
	View,
	TextInput,
	StyleSheet,
  Switch
} from 'react-native';

export default class Row extends Component{
  render(){
		const { complete } = this.props;
    return (
      <View style={styles.container}>
        <Switch
          value={complete}
          onValueChange={this.props.onComplete}
        />
        <View style={styles.textWrap}>
          <Text style={[styles.text, complete && styles.complete]}>{this.props.text}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	complete: {
    textDecorationLine: "line-through"
  },
})
