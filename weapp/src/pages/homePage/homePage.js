/* eslint-disable react/jsx-indent-props */
import Taro, { Component, getStorageSync } from '@tarojs/taro'
import { View } from '@tarojs/components'
import { connect } from '@tarojs/redux';
import Http from '../../utils/http'
import './homePage.styl'


@connect(state => {
  return { ...state }
})

export default class Index extends Component {
    config = {
        navigationBarTitleText: '首页'
    }

  constructor () {
    super(...arguments)
    this.state = {
      isAuthorize: true
    }
  }
 
  getUserInfo = (userInfo) => {
    let that = this
    if(userInfo.detail.userInfo) {  //同意
      Taro.setStorage({key:'userInfo',data:userInfo.detail.userInfo})
      this.setState({
        isAuthorize:true
      })
      if(!this.props.home.unionId) {
        Taro.getStorage({
          key: 'code',
          success: (result)=>{
            let code = result.data
            that.getUnionId(code)
          }
        });
      }
      Taro.navigateTo({
        url: '../home/home',
      })
      
    } else{ //拒绝,保持当前页面
      this.setState({
        isAuthorize:false
      })
    }
  };
  getUserInfoByUnionId=(unionid)=>{
    let that = this
    Http('getUserInfoByUnionId',{unionId: unionid})
    .then(res1 => {
      if (res1.resultCode===0) {
        Taro.setStorage({
          key: 'idNumber',
          data: res1.data.userInfo.idNumber
        });
        
        if(res1.data.userInfo.isRegister===1) {
          res1.data.userInfo['disable'] = true
          for (const key in res1.data.userInfo) {
            if (res1.data.userInfo.hasOwnProperty(key)) {
              let val = res1.data.userInfo[key];
              that.props.dispatch({ type: 'home/handleChange', payload: { name: key, value: val } });
            }
          }
  
          if(res1.data.employmentInfo.salaryRange) {
            let salaryRange = res1.data.employmentInfo.salaryRange.split('~')
            that.props.dispatch({ type: 'home/handleChange', payload: { name: 'minpay', value: salaryRange[0] } });
            that.props.dispatch({ type: 'home/handleChange', payload: { name: 'maxpay', value: salaryRange[1] } });
          }
  
          for (const key in res1.data.employmentInfo) {
            if (res1.data.employmentInfo.hasOwnProperty(key) ) {
              let val = res1.data.employmentInfo[key];
              if(val!='null'){
                that.props.dispatch({ type: 'home/handleChange', payload: { name: key, value: val } });
              }
            }
          }
        }
      }
    })
  }
  getUnionId(code) {
    let that = this
    Taro.getUserInfo({withCredentials:true}).then(res=>{
        let params={
          code:code,
          encryptedData:res.encryptedData,
          iv:res.iv
        }
        Http('getAppletUserInfo',params).then(resault => {
          let unionid
          if(resault.resultCode === 0) {
            unionid = resault.data.unionId
            that.props.dispatch({ type: 'home/handleChange', payload: { name: 'unionId', value: unionid } });
            this.getUserInfoByUnionId(unionid)
            // Http('getUserInfoByUnionId',{unionId: unionid})
            // .then(res1 => {
            //   if (res1.resultCode===0) {
            //     Taro.setStorage({
            //       key: 'idNumber',
            //       data: res1.data.userInfo.idNumber
            //     });
                
            //     if(res1.data.userInfo.isRegister===1) {
            //       res1.data.userInfo['disable'] = true
            //       for (const key in res1.data.userInfo) {
            //         if (res1.data.userInfo.hasOwnProperty(key)) {
            //           let val = res1.data.userInfo[key];
            //           that.props.dispatch({ type: 'home/handleChange', payload: { name: key, value: val } });
            //         }
            //       }
      
            //       if(res1.data.employmentInfo.salaryRange) {
            //         let salaryRange = res1.data.employmentInfo.salaryRange.split('~')
            //         that.props.dispatch({ type: 'home/handleChange', payload: { name: 'minpay', value: salaryRange[0] } });
            //         that.props.dispatch({ type: 'home/handleChange', payload: { name: 'maxpay', value: salaryRange[1] } });
            //       }
      
            //       for (const key in res1.data.employmentInfo) {
            //         if (res1.data.employmentInfo.hasOwnProperty(key) ) {
            //           let val = res1.data.employmentInfo[key];
            //           if(val!='null'){
            //             that.props.dispatch({ type: 'home/handleChange', payload: { name: key, value: val } });
            //           }
            //         }
            //       }
            //     }
            //   }
            // })
          }
        })
      }
    )
   
  }
  
  componentWillMount () {
    this.props.dispatch({ type: 'home/handleChange', payload: { name:'current',value: 0 } });
    let that = this
    // 查看用户是否授权
    Taro.getSetting()
    .then(res=>{
        if(res.authSetting["scope.userInfo"]){
          that.setState({
            isAuthorize:true
          })
        }else {
          that.setState({
            isAuthorize:false
          })
        }
    })
    // 检查登录状态是否过期
    Taro.checkSession({
      success() { //session_key 未过期，并且在本生命周期一直有效
        let code =getStorageSync('code')
        that.getUnionId(code)
      },
      fail() {  // session_key 已经失效，需要重新执行登录流程
        return Taro.login()
          .then(res=>{
            Taro.setStorage({key:'code',data:res.code})

            that.getUnionId(res.code)
          })
          .catch(err=>{
            Taro.showToast({
              title: '请求错误，请重试!',
              icon: 'none'
            })
          })
      }
    })
  }

  componentDidMount() {
    // console.log(this.props.home.unionId,5555)
    // if(this.props.home.unionId) {
    //   this.getUserInfoByUnionId(this.props.home.unionId)
    // }
  }
  componentDidHide() {
    console.log(this.props.home.unionId,66666)
    if(this.props.home.unionId) {
      this.getUserInfoByUnionId(this.props.home.unionId)
    }
  }


  render () {
    return (
      <View className='index'>
        <Image src='https://file-storage-main.ssiid.com/6,5d5d2c35d15e' className='homeImg'/>
        {/* <Image src='https://file-storage-main.ssiid.com/6,5d5d2c35d15e' className='homeImg' mode='widthFix'/> */}

        {!this.state.isAuthorize && 
          <View className='authorize'>
              <Button className='btn' openType='getUserInfo' onGetUserInfo={this.getUserInfo} type='primary' lang='zh_CN'>授权</Button>
          </View>
        }

        <Navigator url="/pages/home/home" hover-class="none" className='navigator' />


      </View>
    )
  }
}
