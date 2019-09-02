import Taro, { Component} from '@tarojs/taro'
import { View } from '@tarojs/components'
import {  AtSteps, AtNavBar } from 'taro-ui'
import { connect } from '@tarojs/redux';
import "taro-ui/dist/style/components/flex.scss";
// import './home.styl'

import Authentication from "./components/authentication"
import BasicInfo from "./components/basicInfo"
import EmploymentInfo from "./components/employmentInfo"

@connect(state => {
  return {...state}
})


export default class Home extends Component {
  config = {
    navigationBarTitleText: '身份验证'
  }

  onChange(current) {
    if (this.props.home.current!=0) {
      this.props.dispatch({type: 'home/onChange', payload:{current}});
    }
  }
  render() {
  console.log(this.props);
    const items = [
      { 'title': '身份验证' },
      { 'title': '基本信息' },
      { 'title': '就业信息' }
    ]
    return (
      
      <View className='index'>
        <AtNavBar color='#000' title='大学生就业登记' style='margin-bottom: 10px'/>
        <AtSteps
          items={items}
          current={this.props.home.current}
          onChange={this.onChange.bind(this)}
        />
        {this.props.home.current===0 && <Authentication ></Authentication> }
        {this.props.home.current===1 && <BasicInfo></BasicInfo>}
        {this.props.home.current===2 && <EmploymentInfo ></EmploymentInfo>}
      </View >
    )
  }
}