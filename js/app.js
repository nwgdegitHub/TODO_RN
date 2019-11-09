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
import AsyncStorage from '@react-native-community/async-storage';

const TODO_SAVE_KEY = 'todoStoreKey';

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
			allItems:[],
			activeItems:[],
			completeItems:[],
			filter: "ALL",
		}
		this.getStoreData();
    /* 不要忘了在constructor中bind method */
    this.handleAddItem = this.handleAddItem.bind(this);
    this.handleToggleAllComplete = this.handleToggleAllComplete.bind(this);
		this.handleRemoveItem = this.handleRemoveItem.bind(this);
		this.handleToggleComplete = this.handleToggleComplete.bind(this);
  }

	//取存储中的数据 同时刷新界面
	getStoreData(){
		tmpItems = [];
		tmpAllItems = [];
		tmpActiveItems = [];
		tmpCompleteItems = [];
		AsyncStorage.getItem(TODO_SAVE_KEY, (error, result) => {
				if (!error) {
						tmpItems = JSON.parse(result) || [];
						for(j = 0,len = tmpItems.length; j < len; j++) {
							tmpAllItems.push(tmpItems[j]);

					  	if(!tmpItems[j].complete){
								tmpActiveItems.push(tmpItems[j]);
							}
							else
							{
								tmpCompleteItems.push(tmpItems[j]);
							}
						}
						this.setState({
							...this.state,
							items:tmpItems,
							allItems:tmpAllItems,
							activeItems:tmpActiveItems,
							completeItems:tmpCompleteItems
						})
				}
		});
	}

	//存数据 同时刷新界面
	saveStoreData(newItems){

				//存储到本地
				AsyncStorage.setItem(TODO_SAVE_KEY, JSON.stringify(newItems), (error, result) => {
						if (!error) {

						}
				});

	}

// 点击了底部的切换按钮
	handleFilter(filter) {
		if(filter === 'ALL'){
			this.setState({
	 		 items:this.state.allItems,
	 		 filter:filter
	 	 })
		}
		else if (filter === 'ACTIVE') {
			this.setState({
	 		 items:this.state.activeItems,
	 		 filter:filter
	 	 })
		}
		else if (filter === 'COMPLETED') {
			this.setState({
	 		 items:this.state.completeItems,
	 		 filter:filter
	 	 })
		}

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
		this.saveStoreData(newItems);

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

		this.saveStoreData(newItems);

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

		this.saveStoreData(newItems);

		tmpActiveItems = [];
		tmpCompleteItems = [];
		for(j = 0,len = newItems.length; j < len; j++) {

			if(!newItems[j].complete){
				tmpActiveItems.push(newItems[j]);
			}
			else
			{
				tmpCompleteItems.push(newItems[j]);
			}
		}

    this.setState({
			items:newItems,
			allItems:newItems,
			activeItems:tmpActiveItems,
			completeItems:tmpCompleteItems
		});
  }

//点击item开关
	handleToggleComplete(key, complete) {

    const newItems = this.state.items.map((item) => {
      if (item.key !== key) return item;
      return {
        ...item,
        complete
      }
    })

		//存储到本地
		AsyncStorage.setItem(TODO_SAVE_KEY, JSON.stringify(newItems), (error, result) => {
				if (!error) {
					this.getStoreData();
				}
		});

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

	//清除已经完成的
	handClearCompleted(items){
		//取出active 的items
		tmpActiveItems = [];
		tmpCompleteItems = [];
		for(j = 0,len = items.length; j < len; j++) {

			if(!items[j].complete){
				tmpActiveItems.push(items[j]);
			}
			else
			{
				tmpCompleteItems.push(items[j]);
			}
		}
		const arrs = items.filter(item=>!item.complete);//false的留下来

		this.saveStoreData(arrs);

		this.setState({
			items:arrs,
			activeItems:tmpActiveItems,
			completeItems:tmpCompleteItems
		})

		this.getStoreData();
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
					onClearCompleted={()=>this.handClearCompleted(this.state.items)}
				/>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
		marginLeft: 20,
		marginTop: 100,
		marginRight: 20,
		marginBottom: 100
  },
  content: {
    
  }
})
