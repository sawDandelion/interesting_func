/* eslint-disable react/jsx-indent-props */
import Taro, { Component, getStorageSync } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { AtTabBar,AtNavBar  }  from 'taro-ui'
import Home from '../home/home'
import HomePage from '../homePage/homePage'
import Mine from '../mine/mine'
import { connect } from '@tarojs/redux';
import './index.styl'
// import Http from '../../utils/http'

const tabList= [
  { title: '首页', iconType: 'home'},
  { title: '我的', iconType: 'user'}
]

@connect(state => {
  return { ...state }
})

export default class Index extends Component {

  constructor () {
    super(...arguments)
    this.state = {
      current: 0,
      // isAuthorize: true
    }
  }
  handleClick (value) {
    this.setState({
      current: value
    })
  }
  // getUserInfo = (userInfo) => {
  //   let that = this
  //   if(userInfo.detail.userInfo) {  //同意
  //     Taro.setStorage({key:'userInfo',data:userInfo.detail.userInfo})
  //     this.setState({
  //       isAuthorize:true
  //     })
  //     if(!this.props.home.unionId) {
  //       Taro.getStorage({
  //         key: 'code',
  //         success: (result)=>{
  //           let code = result.data
  //           that.getUnionId(code)
  //         }
  //       });
  //     }
  //   } else{ //拒绝,保持当前页面
  //     this.setState({
  //       isAuthorize:false
  //     })
  //   }
  // };

  // getUnionId(code) {
  //   let that = this
  //   Http('getAppletUserInfo',{code: code}).then(resault => {
  //     let unionid
  //     if(resault.resultCode === 0) {
  //       unionid = resault.data.unionid
  //       that.props.dispatch({ type: 'home/handleChange', payload: { name: 'unionId', value: unionid } });
  //     } else {
  //       // Taro.showToast({ title: '请检查网络是否通畅',icon: 'none', })
  //     }
      
  //     // setTimeout(() => {
  //       Http('getUserInfoByUnionId',{unionId: unionid})
  //       .then(res1 => {
  //         if (res1.resultCode===0) {
  //           Taro.setStorage({
  //             key: 'idNumber',
  //             data: res1.data.userInfo.idNumber
  //           });
            
  //           if(res1.data.userInfo.isRegister===1) {
  //             res1.data.userInfo['disable'] = true
  //             for (const key in res1.data.userInfo) {
  //               if (res1.data.userInfo.hasOwnProperty(key)) {
  //                 let val = res1.data.userInfo[key];
  //                 that.props.dispatch({ type: 'home/handleChange', payload: { name: key, value: val } });
  //               }
  //             }
  
  //             if(res1.data.employmentInfo.salaryRange) {
  //               let salaryRange = res1.data.employmentInfo.salaryRange.split('-')
  //               that.props.dispatch({ type: 'home/handleChange', payload: { name: 'minpay', value: salaryRange[0] } });
  //               that.props.dispatch({ type: 'home/handleChange', payload: { name: 'maxpay', value: salaryRange[1] } });
  //             }
  
  //             for (const key in res1.data.employmentInfo) {
  //               if (res1.data.employmentInfo.hasOwnProperty(key) ) {
  //                 let val = res1.data.employmentInfo[key];
  //                 if(val!='null'){
  //                   that.props.dispatch({ type: 'home/handleChange', payload: { name: key, value: val } });
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       })
  //     // }, 50);

  //   })
  // }

  // componentWillMount () {
  //   let that = this
  //   // 查看用户是否授权
  //   Taro.getSetting()
  //   .then(res=>{
  //       if(res.authSetting["scope.userInfo"]){
  //         that.setState({
  //           isAuthorize:true
  //         })
  //       }else {
  //         that.setState({
  //           isAuthorize:false
  //         })
  //       }
  //   })
  //   // 检查登录状态是否过期
  //   Taro.checkSession({
  //     success() { //session_key 未过期，并且在本生命周期一直有效
  //       let code =getStorageSync('code')
  //       that.getUnionId(code)
        
  //     },
  //     fail() {  // session_key 已经失效，需要重新执行登录流程
  //       return Taro.login()
  //         .then(res=>{
  //           Taro.setStorage({key:'code',data:res.code})
  //           that.getUnionId(res.code)
  //         })
  //         .catch(err=>{
  //           Taro.showToast({
  //             title: '请求错误，请重试!',
  //             icon: 'none'
  //           })
  //         })
  //     }
  //   })
  // }

  componentDidMount () { 
    // console.log(process.env.NODE_ENV);
    console.log(process.env.TARO_ENV);
    Taro.setNavigationBarTitle({
      title: tabList[this.state.current].title
    })
  }
  componentDidUpdate(){
    Taro.setNavigationBarTitle({
        title: tabList[this.state.current].title
    })
  }

  render () {
    return (
      <View className='index'>

        {this.state.current===0 && 
          <View>
              {/* <AtNavBar color='#000' title='大学生就业登记' style='margin-bottom: 10px'/> */}
              <HomePage />
              {/* <Home /> */}
          </View>
        }
        {this.state.current===1 && <Mine />}
        
        <AtTabBar
          fixed
          tabList={tabList}
          onClick={this.handleClick.bind(this)}
          current={this.state.current}
        />

      </View>
    )
  }
}
