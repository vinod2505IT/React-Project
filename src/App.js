import React, { Component } from 'react';
import './App.css';
import ListItem from "./ListItem";
import { library } from '@fortawesome/fontawesome-svg-core';
import {faTrash} from '@fortawesome/free-solid-svg-icons';


library.add(faTrash);
class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      items:[],
      currentItem:{
        text:"",
        key:""
      }
    }
    //this keyword does not point to the class directly so we need to bind explictly
    this.handleInput = this.handleInput.bind(this);
    this.addItem = this.addItem.bind(this);
    this.deleteitem = this.deleteitem.bind(this);
    this.setUpdate = this.setUpdate.bind(this);



  }
  handleInput(e){
    this.setState({
      currentItem:{
        text:e.target.value,
        key:Date.now()
      }
    })
  }
  addItem(e){
    e.preventDefault();
    const newItem = this.state.currentItem;
    console.log(newItem);
    if(newItem.text!==""){
      const newItems = [...this.state.items, newItem];
      this.setState({
        items:newItems,
        currentItem:{
          text:"",
          key:""
        }
      })
      
    }

  }
  deleteitem(key){
    const filterdItem = this.state.items.filter(item => item.key!==key);
    this.setState({
      items:filterdItem
    })
  }
  setUpdate(text,key){
    const items = this.state.items;
    // eslint-disable-next-line array-callback-return
    items.map(item => {
      if(item.key === key){
        item.text = text;
      }
    })
    this.setState({
      items:items
    })
  }
  render(){
     return(
       <div className="App">
        <header>
            <form id="to-do-form" onSubmit={this.addItem}>
              <input type="text" placeholder="Enter a  text"
              value={this.state.currentItem.text}
              onChange={this.handleInput}/>
              <button type="submit">Add</button>
            </form>
        </header>
            <ListItem items ={this.state.items} 
            deleteitem = {this.deleteitem}
            setUpdate = {this.setUpdate}></ListItem>
       </div>
     );
  };
};

export default App;
