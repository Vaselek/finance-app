import React, { Component } from 'react';
import './App.css';
import { Button, Form, FormGroup, Label, Input, ListGroup, ListGroupItem } from 'reactstrap';

class App extends Component {

  state = {
    items:[],
    totalPrice: 0,
    currentItem: {
      title: '',
      price: ''
    }
  };

  addItem = () => {
    let items = [...this.state.items];
    let preparedCurrentItem = {...this.state.currentItem};
    preparedCurrentItem.price = preparedCurrentItem.price || 0;
    preparedCurrentItem.title = preparedCurrentItem.price || 'No title';
    items.push(preparedCurrentItem);
    const defaultCurrentItem = {title: '', price: ''};
    const totalPrice = items.reduce((a, c) => parseInt(a) + parseInt(c.price), 0);
    this.setState({items, currentItem: defaultCurrentItem, totalPrice});
  }

  removeItem = (e) => {
    const index = parseInt(e.target.id);
    let items = [...this.state.items];
    items.splice(index, 1);
    const totalPrice = items.reduce((a, c) => parseInt(a) + parseInt(c.price), 0);
    debugger;
    this.setState({items, totalPrice});
  }

  updateItemTitle = (e) => {
    let currentItem = this.state.currentItem;
    currentItem.title = e.target.value || '';
    this.setState({currentItem});
  };

  updateItemPrice = (e) => {
    let currentItem = this.state.currentItem;
    currentItem.price = e.target.value || 0;
    this.setState({currentItem});
  };

  render() {
    return (
      <div className="App">
        <Form>
          <FormGroup>
            <Label for="item">Item Title</Label>
            <Input type="text" required='required'  value={this.state.currentItem.title} name="item" id="item" onChange={(e)=>this.updateItemTitle(e)} placeholder="Enter item title..." />
          </FormGroup>
          <FormGroup>
            <Label for="cost">Cost</Label>
            <Input type="number" required='required' value={this.state.currentItem.price} name="cost" id="cost" onChange={(e)=>this.updateItemPrice(e)} placeholder="Enter price in KGS..." />
          </FormGroup>
          <Button onClick={this.addItem}>Add</Button>
        </Form>
        <br/>
        <ListGroup>
          {this.state.items.map((item, index) => {return <ListGroupItem key={index}><Button id={index} onClick={(e)=>this.removeItem(e)}>Remove</Button> {item.title} - {item.price} KGS </ListGroupItem>})}
          <ListGroupItem>Total spent: {this.state.totalPrice} KGS</ListGroupItem>
        </ListGroup>
      </div>
    );
  }
}

export default App;
