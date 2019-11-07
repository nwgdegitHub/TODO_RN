import React,{Component} from 'react';
import {
	View,
	TextInput,
	StyleSheet,
  Switch,
	Text,
	Button
} from 'react-native';

export default class Row extends Component{
  render(){
		console.log(this.props)
		const { complete } = this.props;
    return (
      <View style={styles.container}>

        <View style={{flexDirection: 'row'}}>
					<Switch
	          value={complete}
	          onValueChange={this.props.onComplete}
	        />
          <Text style={[styles.text, complete && styles.complete]}>{this.props.text}</Text>
        </View>
				<Button
					onPress = {this.props.onRemove}
				  style={{marginRight: 10}}
				  title="删除"
				  color="#841584"
				  accessibilityLabel="Learn more about this purple button"
				/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
	container:{
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	text:{
		fontSize: 18,
		marginLeft: 10,
	},
	complete: {
    textDecorationLine: "line-through"
  },
})
