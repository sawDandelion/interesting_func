import Taro, { Component } from '@tarojs/taro'
import { View, Picker } from '@tarojs/components'
import {  AtInput, AtIcon } from 'taro-ui'
import { connect } from '@tarojs/redux';
import Http from '../../../utils/http'
import '../../../app.styl'

@connect(state => {
    return { ...state }
})


export default class AbroadStudy extends Component {

    componentWillMount() {
        Http('getCountry')
        .then(res => {
          console.log(res.data)
          let country = []

          res.data.map((ele, i) => {
            country.push(ele.cn)
          })
          this.props.dispatch({ type: 'home/handleChange', payload: { name: 'country', value: country } });
        })
    }


    handleChange(name, value) {
        this.props.dispatch({ type: 'home/handleChange', payload: { name, value } });
    }
    onChangePicker(e, key, arrkey) {

        const value = arrkey ? this.props.home[arrkey][e.detail.value] : e.detail.value
        const name = key
        this.props.dispatch({ type: `home/handleChange`, payload: { name, value } });
    }
    render() {

        return (
        <View>
            <Picker className='bb1' mode='selector' range={this.props.home.country} onChange={(e) => this.onChangePicker(e,'countryAbroad','country')}>
                <View className='picker'>
                    <View className="picker-title">国家</View>
                    <View className="flex-1 ac">{this.props.home.countryAbroad || ''}</View>
                    {!this.props.home.countryAbroad && <AtIcon value='alert-circle mr10' size='16' color='#FF4949'></AtIcon>}
                </View>
            </Picker>
            {/* <AtInput
                maxLength={20}
                className='pl40'
                error={!this.props.home.enterSchoolName}
                name='enterSchoolName'
                title='学校'
                type='text'
                placeholder='请输入学校'
                value={this.props.home.enterSchoolName}
                onChange={this.handleChange.bind(this, 'enterSchoolName')}
            />
            <AtInput
                maxLength={20}
                className='pl40'
                error={!this.props.home.professionalName}
                name='professionalName'
                title='专业'
                type='text'
                placeholder='请输入专业'
                value={this.props.home.professionalName}
                onChange={this.handleChange.bind(this, 'professionalName')}
            /> */}
        </View>
        );
    }
}