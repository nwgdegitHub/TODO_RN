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
    );
  }
}
const styles = StyleSheet.create({
  header: {
    paddingHorizontal: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    height: 50,
    marginTop: 30
  },
  toggleIcon: {
    fontSize: 30,
    color: "#CCC",
    marginTop: 30
  }
});
//textinput必须要写明height，不然就默认高度为0，所以看不到
