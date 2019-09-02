/* eslint-disable react/jsx-indent-props */
import Taro, { Component } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import { AtButton, AtInput, AtForm, AtIcon, AtToast } from 'taro-ui'
import { connect } from '@tarojs/redux';
import HaveJob from './haveJob'
import Unemployed from './unemployed'
import DomesticStudy from './domesticStudy'
import AbroadStudy from './abroadStudy'
import Pioneer from './pioneer'
import Http from '../../../utils/http'
import { navigateTo } from '../../../utils/router'

import '../../../app.styl'

@connect(state => {
  return { ...state }
})


export default class EmploymentInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpened: false,
      toastText: '请输入内容'
    }
  }

  handleChange(name, value) {
    this.props.dispatch({ type: 'home/handleChange', payload: { name, value } });
  }
  onChangePicker(e, key, arrkey) {
    if(key==='graduationPlace') {
      this.props.dispatch({ type: `home/handleChange`, payload: { name:'isAcceptEmployment', value:'' } });
      this.props.dispatch({ type: `home/handleChange`, payload: { name:'intentionalPost', value:'' } });
      this.props.dispatch({ type: `home/handleChange`, payload: { name:'minpay', value:'' } });
      this.props.dispatch({ type: `home/handleChange`, payload: { name:'maxpay', value:'' } });
      this.props.dispatch({ type: `home/handleChange`, payload: { name:'employmentType', value:'' } });
      this.props.dispatch({ type: `home/handleChange`, payload: { name:'unitName', value:'' } });
      this.props.dispatch({ type: `home/handleChange`, payload: { name:'unitNature', value:'' } });
      this.props.dispatch({ type: `home/handleChange`, payload: { name:'province', value:'山东省' } });
      this.props.dispatch({ type: `home/handleChange`, payload: { name:'city', value:'泰安市' } });
      this.props.dispatch({ type: `home/handleChange`, payload: { name:'county', value:'泰山区' } });
      this.props.dispatch({ type: `home/handleChange`, payload: { name:'workAddress', value:'' } });
    }
    const value = arrkey ? this.props.home[arrkey][e.detail.value] : e.detail.value
    const name = key
    this.props.dispatch({ type: `home/handleChange`, payload: { name, value } });
  }
  toastClose(){
    this.setState({ isOpened: false, toastText: '' })
  }
  submit() {
    let parmas1 = {
      id: this.props.home.userId,   //存信息的时候必传
      unionId :this.props.home.unionId,
      userName: this.props.home.userName,   // 姓名
      idNumber: this.props.home.idNumber,   // 身份证号
      education: this.props.home.education,   // 学历
      gender: this.props.home.gender,   // 性别
      graduationYear: this.props.home.graduationYear,   // 毕业年度
      telephoneNumber: this.props.home.telephoneNumber,   //电话号码
      nationality: this.props.home.nationality,   // 民族
      graduatedSchool: this.props.home.graduatedSchool,   //毕业学校
      departmentName: this.props.home.departmentName,   //学院
      profession: this.props.home.profession,   //专业
      schoolSystem: this.props.home.schoolSystem,   //学制
      graduationPlace: this.props.home.graduationPlace,   //毕业去向
    }
    let parmas2 = {}

    switch(this.props.home.graduationPlace) {
      case '签劳动合同形式就业':
      case '签就业协议形式就业':
      case '其他录用方式就业':
          parmas2 = {
                employmentType: this.props.home.employmentType,   //就业方式
                unitName: this.props.home.unitName,   //单位名称
                unitNature: this.props.home.unitNature,   //单位性质
                province: this.props.home.province,   //省
                city: this.props.home.city,   //市
                county: this.props.home.county,   //区
                workAddress: this.props.home.workAddress,   //工作地址
                isAcceptEmployment: this.props.home.isAcceptEmployment,   //是否接受推荐就业
                intentionalPost: this.props.home.intentionalPost,   //意向岗位
                salaryRange: `${this.props.home.minpay}-${this.props.home.maxpay}`,   //薪酬范围
          }
          if(!parmas2.employmentType) {
            this.setState({ isOpened: true, toastText: '请选择就业方式' })
            return
          }
          if(!parmas2.unitName) {
            this.setState({ isOpened: true, toastText: '请输入就业单位' })
            return
          }
          if(!parmas2.unitNature) {
            this.setState({ isOpened: true, toastText: '请选择单位性质' })
            return
          }
          if(!parmas2.county) {
            this.setState({ isOpened: true, toastText: '请选择工作地址' })
            return
          }
          if(!parmas2.workAddress) {
            this.setState({ isOpened: true, toastText: '请输入详细地址' })
            return
          }
          if(!parmas2.isAcceptEmployment) {
            this.setState({ isOpened: true, toastText: '请选择是否接受推荐就业' })
            return
          }
          if(parmas2.isAcceptEmployment==='是') {
            if(!parmas2.intentionalPost) {
              this.setState({ isOpened: true, toastText: '请输入意向岗位' })
              return
            }
            if(!this.props.home.minpay || !this.props.home.maxpay) {
              this.setState({ isOpened: true, toastText: '请输入薪酬范围' })
              return
            }
          }
          break;
      case '待就业':
          parmas2 = {
                employmentPlan: this.props.home.employmentPlan,   // 就业计划
                remark: this.props.home.remark,   //备注
                isAcceptEmployment: this.props.home.isAcceptEmployment,   //是否接受推荐就业
                intentionalPost: this.props.home.intentionalPost,   //意向岗位
                salaryRange: `${this.props.home.minpay}-${this.props.home.maxpay}`,   //薪酬范围
          }
          if(!parmas2.employmentPlan) {
            this.setState({ isOpened: true, toastText: '请选择就业计划' })
            return
          }
          if(!parmas2.isAcceptEmployment) {
            this.setState({ isOpened: true, toastText: '请选择是否接受推荐就业' })
            return
          }
          if(parmas2.isAcceptEmployment==='是') {
            if(!parmas2.intentionalPost) {
              this.setState({ isOpened: true, toastText: '请输入意向岗位' })
              return
            }
            if(!this.props.home.minpay || !this.props.home.maxpay) {
              this.setState({ isOpened: true, toastText: '请输入薪酬范围' })
              return
            }
          }
        break;
      case '升学':
          parmas2 = {
            enterSchoolName: this.props.home.enterSchoolName, // 升学学校名称
            studyDegree: this.props.home.studyDegree,   //攻读学位
            professionalName: this.props.home.professionalName, //升学专业名称
          }
          if(!parmas2.enterSchoolName) {
            this.setState({ isOpened: true, toastText: '请选择学校名称' })
            return
          }
          if(!parmas2.studyDegree) {
            this.setState({ isOpened: true, toastText: '请选择攻读学位' })
            return
          }
          if(!parmas2.professionalName) {
            this.setState({ isOpened: true, toastText: '请输入专业名称' })
            return
          }
        break;
      case '出国、出境':
          parmas2 = {
            countryAbroad: this.props.home.countryAbroad,  //'出国国家'
            // enterSchoolName: this.props.home.enterSchoolName, // 升学学校名称
            // professionalName: this.props.home.professionalName, //升学专业名称
          }
          if(!this.props.home.countryAbroad) {
            this.setState({ isOpened: true, toastText: '请选择国家' })
            return
          }
          // if(!parmas2.enterSchoolName) {
          //   this.setState({ isOpened: true, toastText: '请选择学校名称' })
          //   return
          // }
          // if(!parmas2.professionalName) {
          //   this.setState({ isOpened: true, toastText: '请输入专业名称' })
          //   return
          // }
        break;
      case '自主创业':
          parmas2 = {
            pioneerProvince: this.props.home.pioneerProvince, // 创业省
            pioneerCity: this.props.home.pioneerCity,// 创业市
            pioneerProject: this.props.home.pioneerProject,   //创业项目
            projectIntroduction: this.props.home.projectIntroduction,   //项目介绍
          }
          if(!parmas2.pioneerCity) {
            this.setState({ isOpened: true, toastText: '请选择创业城市' })
            return
          }
        break;
      case '入伍':
          parmas2 = {
            wayEnlisting: this.props.home.wayEnlisting,   //入伍方式
          }
          if(!parmas2.wayEnlisting) {
            this.setState({ isOpened: true, toastText: '请选择入伍方式' })
            return
          }
        break;
      default:
        console.log('没选择')
    }

    if(!parmas1.graduatedSchool) {
      this.setState({ isOpened: true, toastText: '请输入毕业学校' })
      return
    }
    if(!parmas1.departmentName) {
      this.setState({ isOpened: true, toastText: '请输入学院' })
      return
    }
    if(!parmas1.profession) {
      this.setState({ isOpened: true, toastText: '请输入专业' })
      return
    }
    if(!parmas1.schoolSystem) {
      this.setState({ isOpened: true, toastText: '请输入学制' })
      return
    }
    if(!parmas1.graduationPlace) {
      this.setState({ isOpened: true, toastText: '请输入毕业去向' })
      return
    }
    
    let parmas = Object.assign({},parmas1,parmas2)
    // console.log(parmas)

    
      Http('insertRegistration',parmas)
      .then(res=>{
        if(res.data){
          this.props.dispatch({ type: `home/handleChange`, payload: { name: 'type', value: true } });
          if(this.props.home.type) {
            Taro.reLaunch({url: '/pages/submitTip/submitTip'})
          } else {
            navigateTo('submitTip/submitTip')
          }
        }else {
          Taro.showToast({title: data.message, icon: 'none',})
        }
      })
      .catch(error=>{
        if(this.props.home.type) {
          Taro.reLaunch({url: '/pages/submitTip/submitTip'})
        } else {
          navigateTo('submitTip/submitTip')
        }
      })
  }


  render() {

    return (
      <View className='employmentInfo'>
        <AtToast isOpened={this.state.isOpened} text={this.state.toastText} duration={1000} onClose={()=>this.toastClose()}></AtToast>
        <View style='padding: 100rpx 80rpx;text-align: center;'>
          <AtForm>
            <AtInput
              maxLength={20}
              className='pl40'
              error={!this.props.home.graduatedSchool}
              name='graduatedSchool'
              title='毕业学校'
              type='text'
              placeholder='请输入毕业学校'
              value={this.props.home.graduatedSchool}
              onChange={this.handleChange.bind(this, 'graduatedSchool')}
            />
            <AtInput
              maxLength={20}
              className='pl40'
              error={!this.props.home.departmentName}
              name='departmentName'
              title='学院'
              type='text'
              placeholder='请输入学院'
              value={this.props.home.departmentName}
              onChange={this.handleChange.bind(this, 'departmentName')}
            />
            <AtInput
              maxLength={20}
              className='pl40'
              error={!this.props.home.profession}
              name='profession'
              title='专业'
              type='text'
              placeholder='请输入专业'
              value={this.props.home.profession}
              onChange={this.handleChange.bind(this, 'profession')}
            />
            <AtInput
              className='pl40'
              error={!this.props.home.schoolSystem}
              name='schoolSystem'
              title='学制'
              type='text'
              placeholder='学制（年）'
              value={this.props.home.schoolSystem}
              onChange={this.handleChange.bind(this, 'schoolSystem')}
            />
            <Picker disabled className='bb1' mode='date' fields='year'>
              <View className='picker'>
                <View className="picker-title ccc">毕业年度</View>
                <View className="flex-1 ac ccc">{this.props.home.graduationYear}</View>
              </View>
            </Picker>

            <Picker disabled className='bb1' mode='selector'>
              <View className='picker'>
                <View className="picker-title ccc">学历</View>
                <View className="flex-1 ac ccc">{this.props.home.education}</View>
              </View>
            </Picker>
            <Picker className='bb1' mode='selector' range={this.props.home.graduationPlaceArr} onChange={(e) => this.onChangePicker(e, 'graduationPlace', 'graduationPlaceArr')}>
              <View className='picker'>
                <View className="picker-title">毕业去向</View>
                <View className="flex-1 ac">{this.props.home.graduationPlace || ''}</View>
                {!this.props.home.graduationPlace && <AtIcon value='alert-circle mr10' size='16' color='#FF4949'></AtIcon>}
              </View>
            </Picker>


            {this.props.home.graduationPlace === '签劳动合同形式就业' && <HaveJob />}
            {this.props.home.graduationPlace === '签就业协议形式就业'&& <HaveJob />}
            {this.props.home.graduationPlace === '其他录用方式就业' && <HaveJob />}

            {this.props.home.graduationPlace === "待就业" && <Unemployed />}

            {this.props.home.graduationPlace === '升学' && <DomesticStudy />}

            {this.props.home.graduationPlace === '出国、出境' && <AbroadStudy />}

            {this.props.home.graduationPlace === '自主创业' && <Pioneer />}

            {this.props.home.graduationPlace === '入伍' &&
              <View>
                <Picker className='' mode='selector' range={this.props.home.enlistingArr} onChange={(e) => this.onChangePicker(e, 'wayEnlisting', 'enlistingArr')}>
                  <View className='picker'>
                    <View className="picker-title">入伍方式</View>
                    <View className="flex-1 ac">{this.props.home.wayEnlisting || ''}</View>
                    {!this.props.home.wayEnlisting && <AtIcon value='alert-circle mr10' size='16' color='#FF4949'></AtIcon>}
                  </View>
                </Picker>
              </View>
            }

          </AtForm>
          <View style='padding: 20px 0px;margin-bottom: 60px;'><AtButton full type='primary' onClick={() => this.submit()}>提交</AtButton></View>
        </View>
      </View>
    )
  }
}
