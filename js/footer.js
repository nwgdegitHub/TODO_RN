import React,{Component} from 'react';
import {
	View,
	TextInput,
	StyleSheet,
	TouchableOpacity,
	Text
} from 'react-native';

export default class Footer extends Component{

  render(){

		const {filter,isShowClearCompleted} = this.props;
    return(
			<View style={{marginLeft: 0,marginRight: 80,flexDirection: 'row'}}>

				<View style={{justifyContent: 'center',marginLeft: 5}}>
						<Text style={{fontSize: 12}}>{this.props.count} items left </Text>
				</View>


				<View style={styles.container}>
					<TouchableOpacity style={[styles.filter, filter === "ALL" && styles.selected]}
		onPress={() => this.props.onFilter("ALL")}>
						<Text>All</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.filter, filter === "ACTIVE" && styles.selected]}
		onPress={() => this.props.onFilter("ACTIVE")}>
						<Text>Active</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.filter, filter === "COMPLETED" && styles.selected]}
		onPress={() => this.props.onFilter("COMPLETED")}>
						<Text>Completed</Text>
					</TouchableOpacity>
				</View>


				<View style={{justifyContent: 'center',marginRight: 5}}>
					<TouchableOpacity onPress={()=>this.props.onClearCompleted()}>
						<Text style={{fontSize: 10,textDecorationLine: 'underline'}}>{isShowClearCompleted?'Clear Completed':''}</Text>
					</TouchableOpacity>
				</View>

			</View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  filters: {
    flexDirection: "row"
  },
  filter: {
    padding: 8,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "transparent"
  },
  selected: {
   borderColor: "rgba(175, 47, 47, .2)"
 }
})
