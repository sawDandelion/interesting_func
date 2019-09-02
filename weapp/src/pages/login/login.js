import Taro, { Component } from '@tarojs/taro'
import { View, Text ,Button} from '@tarojs/components'
import './login.styl'
import { AtButton, AtModal, AtModalHeader, AtModalContent, AtModalAction,AtInput  }  from 'taro-ui'

export default class Index extends Component {

  config = {
    navigationBarTitleText: '登录页面',
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTextStyle: 'black'
  }
  constructor () {
    super(...arguments)
    this.state = {
      phone:'18675544060',
      passWord:'55398194C2A6A7E7D605898A29367DC665D411F0D0813AFDDDCE98619ECBBA82054A28777EB0EF7E198F3B69BE5389445E5DE5484A9068FC8FB046D5CF0C7779CB5E6C0A9225EBCB451862B5D5DF2D31F42598FC08B5AECA558984FF13929CC174E220C19D82DD65FF0EF526469853647DBC83D2262F54D7B5F9D9FB06E7D19F'
    }
  }
  handleChange (value) {
    this.setState({
      value
    })
    return value
  }
  componentWillMount () { }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }
  comeBack(){
    Taro.navigateBack({ delta: 1 })
  }
  login(){
      const smsserver=Taro.getStorageSync('society-app-server')
      Taro.request({
        method: 'POST',
        url: smsserver+'/foundation/v1.1/mobile/public/api/user/login_phone_pwd',
        data: {
          phoneNumber:this.state.phone,
          userPwd:this.state.passWord,
        },
        header: {
            'content-type': 'application/json',
        }
    }).then(res=>{
        Taro.setStorageSync('token',res.data.data)
        this.comeBack()
    })
  }
  render () {
    return (
      <View className='login'>
        <AtModal isOpened>
        <AtModalHeader>登录</AtModalHeader>
        <AtModalContent>
        <AtInput
          name='value6'
          border={false}
          title='手机号码'
          type='phone'
          placeholder='手机号码'
          value={this.state.phone}
          onChange={this.handleChange.bind(this)}
        />
        <AtInput
          name='value3'
          title='密码'
          type='password'
          placeholder='密码不能少于10位数'
          value={this.state.passWord}
          onChange={this.handleChange.bind(this)}
        />
        </AtModalContent>
        <AtModalAction> 
          <Button onClick={()=>this.comeBack()}>取消</Button> 
          <Button onClick={()=>this.login()}>确定</Button>
        </AtModalAction>
      </AtModal>
      </View>
    )
  }
}
