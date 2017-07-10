//import things here
import React, { Component } from 'react';
import Chatbox from './chatbox';
import Topbar from './topbar';
import Bottombar from './bottombar';
import Userlist from './user-list.jsx';
import UserProfile from './user-profile.jsx';

const socket = new WebSocket('ws://192.168.0.71:3001/');

class App extends Component {
  constructor(props) {
    super(props);
    this.state = this.getInitialState()
  }

  componentDidMount(){
    // before executing the set state below, componentDidMount needs to reach out to
    // server via our websocket and pull down the list of messages between user and user[0].
    return socket.onopen = (event) =>{
      return this.updateMessages();
    }
  }

  updateMessages() {
      const currentChat = this.state.friendsList[0];
      socket.onmessage = (event) =>{
        const newMessages = JSON.parse(event.data);
        if (Array.isArray(newMessages)) newMessages.reverse();
        const oldMessages = this.state.messages.slice();
        newMessages = oldMessages.concat(newMessages);
        document.cookie = "username=" + this.state.me.username;
        document.cookie = "chatBro=" + currentChat.username;
        this.setState({ currentChat, newMessages });
      }
  }

  getInitialState() {
    //return data from socket.onconnect here, with the return statement below inside the callback for that. this will hold off on populating ANYTHING until that data comes through.
    //connect ajax to this?
      return {
        messages: [],
        friendsList: [{username: 'JanelleCS', name: 'Janelle', photo: 'test'},{username: 'JeffreyCS', name:'Heffe', photo: 'test.jpg'}],
        currentChat: {username: '', name:'', photo: ''},
        text: '',
        me: {username: 'GarrettCS', name:'Garrett', photo: 'test.jpg'}
      }

  }

  sendClick(event) {
      // message is sent to server via web socket,
      // message comes back as confirmed to client
      // client pushes it to messages array (SETS STATE)
      // react rerenders
      //textbox value is reset to null
      let aMessage = {
        src: this.state.me.username,
        dst: this.state.currentChat.username,
        content: this.state.text,
      }
      socket.send(JSON.stringify(aMessage));
      this.setState({text: ''});
  }

  handleKeyPress(event) {
    if (event.key === 'Enter'){
          let aMessage = {
            src: this.state.me.username,
            dst: this.state.currentChat.username,
            content: this.state.text,
          }
          socket.send(JSON.stringify(aMessage));
          this.setState({text: ''});
    }
  }

  userClick(user) {
    // update messages to reflect current user, this will require a pull from server
    // to server: send my ID, friendsID, should recieve back messages between me and friend, update state.messages to reflect the new messages.
    const chatter = this.state.friendsList[user];
    document.cookie = "chatBro=" + chatter.username;
    this.setState({
      currentChat : chatter
    });
  }

  handleChange(event){
    this.setState({text: event.target.value});
  }
  render() {
    const friendsList = this.state.friendsList.slice('');
    const list = this.state.friendsList.map((friend, i) => (
      <Userlist key = {i} userClick = {()=> this.userClick(i)} user = {i} username = {friend.username} name = {friend.name} photo = {friend.photo} />
    ));
    return (
          <div id = "main">
            <div id = "chat">
              <Topbar/>

                <Chatbox messages = {this.state.messages}/>


              <Bottombar handleChange = {(event)=>this.handleChange(event)} sendClick = {()=> this.sendClick()} handleKeyPress={(event)=>this.handleKeyPress(event)} value = {this.state.text}/>
            </div>

            <div id = "users">
              <UserProfile currentChat = {this.state.currentChat} />
              <h3>Friends</h3>
              <div className='user-list'>
                <ul>
                  {list}
                </ul>
              </div>
            </div>
          </div>
          )
  }
}

export default App;
