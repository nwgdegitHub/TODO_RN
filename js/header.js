import React,{Component} from 'react';
import {
	View,
	TextInput,
	StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native';

export default class Header extends Component{
  render(){
    return(
			<View style={{backgroundColor: 'rgba(220, 220, 220, 1)'}}>
				<Text style={{
							textAlign: 'center',
			        fontSize: 72,
			        color: 'rgba(175, 47, 47, 0.25)',
			        fontWeight: '100',
							marginTop: 30
					}}>todos</Text>
				<View style={styles.header}>
					<TouchableOpacity onPress={this.props.onToggleAllComplete}>
						<Text style={styles.toggleIcon}>{String.fromCharCode(10003)}</Text>
					</TouchableOpacity>
					<TextInput
						placeholder="What needs to be done?"
						blurOnSubmit={false}
						returnKeyType="done"
						style={styles.input}
						value={this.props.value}
						onChangeText={this.props.onChange}
						onSubmitEditing={this.props.onAddItem}
					/>
				</View>
			</View>

    );
  }
}
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
		backgroundColor: 'white',
		shadowColor: 'gray',
    shadowOffset: {width: 0.5,height: 0.5},
    shadowOpacity: 0.4,
    shadowRadius: 1,
    elevation: 2,//安卓中设置阴影
  },
  input: {
    flex: 1,
    height: 30,
    marginTop: 10
  },
  toggleIcon: {
    fontSize: 30,
    color: "#CCC",
    marginTop: 10
  }
});
//textinput必须要写明height，不然就默认高度为0，所以看不到
