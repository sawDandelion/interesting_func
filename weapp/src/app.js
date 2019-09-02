import Taro, { Component } from '@tarojs/taro';
import 'taro-ui/dist/style/index.scss';
import {Provider} from '@tarojs/redux'
import {createLogger} from 'redux-logger'
import '@tarojs/async-await'
import './app.styl';
import Index from './pages/index';
import HomePage from './pages/homePage/homePage';
import dva from './dva'
import models from './model/index'
import login from './utils/init' 


const dvaApp = dva.createApp({
  initialState: {},
  models: models,
  onAction: createLogger(),
  onError(e, dispatch) {
    console.log('发生错误 ===> ', e, dispatch)
  },
});
const store = dvaApp.getStore();


class App extends Component {

  config = {
    pages: [
      'pages/index/index',
      'pages/submitTip/submitTip',
      'pages/home/home',
      'pages/login/login',
    ],
    window: {
      backgroundTextStyle: 'light',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: 'WeChat',
      navigationBarTextStyle: 'black'
    },
    networkTimeout: {
      "request": 30000,
      "downloadFile": 30000
    },
  }
  componentWillMount() {
    login()
  }
  componentDidMount () {
    // login()
    store.dispatch({type: 'app/login'});
  }

  componentDidShow () {}

  componentDidHide () {}

  componentDidCatchError () { }

  
  // 在 App 类中的 render() 函数没有实际作用
  // 请勿修改此函数
  render () {
    return (
      <Provider store={store}>
        <HomePage />
        {/* <Index /> */}
      </Provider>
    )
  }
}

Taro.render(<App />, document.getElementById('app'))
