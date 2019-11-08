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
import Row from './row';

const filterItems = (filter, items) => {
  return items.filter((item) => {
    if (filter === "ALL") return true;
    if (filter === "ACTIVE") return !item.complete;
    if (filter === "COMPLETED") return item.complete;
  })
}

export default class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      allComplete:false,
      value:'',
      items:[],
			filter: "ALL",
    }
    /* 不要忘了在constructor中bind method */
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
		this.handleRemoveItem = this.handleRemoveItem.bind(this);
		this.handleToggleComplete = this.handleToggleComplete.bind(this);
  }

// 点击了底部的切换按钮
	handleFilter(filter) {
	 this.setState({
		 items:filterItems(filter, this.state.items),
		 filter:filter
	 })
 }

//添加一条数据
  handleAddItem(filter){
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

//选择所有
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
		console.log(data)
		if(!data)return;

    return (
			<Row
				key={data.item.key}
	      onRemove={() => this.handleRemoveItem(data.item.key)}
       	onComplete={(complete) => this.handleToggleComplete(data.item.key, complete)}
        {...data.item}

      />
    )
  }

	//删除一条item
	handleRemoveItem(key) {

    const newItems = this.state.items.filter((item) => {
      return item.key !== key
    })
    this.setState({
			items:newItems
		});
  }

//点击item开关
	handleToggleComplete(key, complete) {
		debugger
    const newItems = this.state.items.map((item) => {
      if (item.key !== key) return item;
      return {
        ...item,
        complete
      }
    })
    this.setState({
			...this.state,
			items: newItems,

		})
  }

	//计算剩余的items
	handleLeftItems(items){

		const arrs = items.filter( item => !item.complete);
		return arrs.length;
	}

	//计算已完成的items
	handleCompletedItems(items){

		const arrs = items.filter( item => item.complete);
		if(arrs.length === 0){
			return false;
		}
		else
		{
			return true;
		}

	}

  render(){
		const filter = this.state.filter;
    return(
      <View style = {styles.container}>
        <Header
          value={this.state.value}
          onAddItem={(filter)=>this.handleAddItem(filter)}
          onChange={(value) => this.setState({ value })}
					onToggleAllComplete={()=>this.handleToggleAllComplete()}
        />
        <View style = {styles.content}>
          <FlatList
						keyExtractor={item=>""+item.key}
            style={{backgroundColor: '#FFF'}}
            data={this.state.items}
            renderItem={data=>this.renderItem(data)}
          />
        </View>
				<Footer
					count={this.handleLeftItems(this.state.items)}
          onFilter={(filter)=>this.handleFilter(filter)}
          filter={this.state.filter}
					isShowClearCompleted={this.handleCompletedItems(this.state.items)}
				/>
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
