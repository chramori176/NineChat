import React, { Component } from 'react';

function Chatbox(props) {
  console.log(props.messages);
  if (props.messages.length > 0) {
    const msgs = props.messages.map((message, i) => {
      return (
        <div key={message._id} className="msgcontainer">
          <div className="msgname">{message.src}:</div>
          <div className="msg">{message.content}</div>
        </div>
      )
    });

    return (
      <div id="chatbox">
        {msgs}
      </div>
    )
  }

  const msgs = null;
  return (
    <div id="chatbox">
      {msgs}
    </div>
  )
}

export default Chatbox;
