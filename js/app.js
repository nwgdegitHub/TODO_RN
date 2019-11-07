import React,{Component} from 'react';
import {
	View,
	TextInput,
	StyleSheet,
  FlatList,
  Keyboard,
  Text
} from 'react-native';
import Header from './header';
import Footer from './footer';

export default class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      allComplete:false,
      value:'',
      items:[]
    }
    /* 不要忘了在constructor中bind method */
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
  }

  handleAddItem(){
    if(!this.state.value)return;
    const newItems = [
      ...this.state.items,
      {
        key:Date.now(),
        text:this.state.value,
        complete:false
      }
    ]

    this.setState({
      items:newItems,
      value:''
    })
  }

  handleToggleAllComplete() {
    const complete = !this.state.allComplete;
    const newItems = this.state.items.map((item) => ({
      ...item,
      complete
    }))
    console.table(newItems);
    this.setState({
      items: newItems,
      allComplete: complete
    })
  }

  renderItem(data){
    return (
      <View>
        <Text>{data.item.text}</Text>
      </View>
    )
  }



  render(){
    return(
      <View style = {styles.container}>
        <Header
          value={this.state.value}
          onAddItem={this.handleAddItem}
          onChange={(value) => this.setState({ value })}
        />
        <View style = {styles.content}>
          <FlatList
            style={{backgroundColor: '#FFF'}}
            data={this.state.items}
            renderItem={data=>this.renderItem(data)}
          />
        </View>
        <Footer/>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5"
  },
  content: {
    flex: 1
  }
})
