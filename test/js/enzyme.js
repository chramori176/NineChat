const expect = require('expect');
const React = require('react');
import 'jsdom-global/register';
import { WebSocket } from './dummyWebSocket';
import App from '../../client/components/App';
import Bottombar from '../../client/components/bottombar';
import UserProfile from '../../client/components/user-profile';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';

import sinon from 'sinon';

// Enzyme is a wrapper around React test utilities which makes it easier to
// shallow render and traverse the shallow rendered tree.

describe('React unit tests', () => {
  describe('<UserProfile />', () => {
    let wrapper;
    let spy

    before(() => {
      //spy = sinon.spy();
      let user = {username: 'testname', name:'frank', photo: 'file.jpg'};
      wrapper = shallow(<UserProfile currentChat = {user} />);
    });

    it('Renders the user profile with correct data from props', () => {
      
      let pic = wrapper.childAt(0).childAt(0).text();
      let userName = wrapper.childAt(1).childAt(0).text();
      let name = wrapper.childAt(2).childAt(0).text();
      expect(wrapper.type()).toEqual('div');
      expect(wrapper.props().id).toEqual('user-profile');
      expect(pic).toEqual('file.jpg');
      expect(userName).toEqual('testname');
      expect(name).toEqual('frank');
    });


    it('Tests the App component to mount', () => {
      sinon.spy(App.prototype, 'componentDidMount');
      wrapper = mount(<App />);
      expect(App.prototype.componentDidMount.calledOnce).toEqual(true);
    });

    it('Allows us to set props', () => {
      wrapper.setState({text: 'I speak robot now'});
      let test = sinon.spy(App.prototype, 'sendClick');
      wrapper.find('#sendButton').simulate('click');
      console.log(test);
      expect(test.calledOnce).toEqual(true);
    });


  });


});
