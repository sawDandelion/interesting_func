import Taro, { Component } from '@tarojs/taro'
import { View, Picker, Text } from '@tarojs/components'
import {  AtInput, AtTextarea, AtIcon } from 'taro-ui'
import { connect } from '@tarojs/redux';
import '../../../app.styl'

@connect(state => {
    return { ...state }
})


export default class Pioneer extends Component {

    constructor(props) {
        super(props);
        // this.state = {
        //     province: null
        // }
    }
    componentWillMount() {
        // let province = [this.props.home.provinceArr, this.props.home.cityArr]
        // this.setState({ province: province })
    }

    handleChange(name, value) {
        this.props.dispatch({ type: 'home/handleChange', payload: { name, value } });
    }
    onChangePicker(e, key, arrkey) {

        const value = arrkey ? this.props.home[arrkey][e.detail.value] : e.detail.value
        const name = key
        this.props.dispatch({ type: `home/handleChange`, payload: { name, value } });
    }
    onChangePicker1(e) {
        let value = e.detail.value
        // let putArr = []
        // this.state.province.map((ele, i) => {
        //     putArr.push(ele[value[i]])
        // })
        let parmrs = {
            pioneerProvince: value[0],
            pioneerCity: value[1],
        }
        this.props.dispatch({ type: `home/handleChange`, payload: { name: "pioneerProvince", value: parmrs.pioneerProvince } });
        this.props.dispatch({ type: `home/handleChange`, payload: { name: "pioneerCity", value: parmrs.pioneerCity} });
    }
    changeIntroduction(e){
        const value=e.detail.value
        this.props.dispatch({ type: `home/handleChange`, payload: { name: "projectIntroduction", value } });
    }
    render() {

        return (
            <View>
              <Picker className='bb1' mode='region' range={this.state.province} onChange={(e) => this.onChangePicker1(e)}>
                  <View className='picker'>
                      <View className="picker-title">创业城市</View>
                      <View className="ml20">{this.props.home.pioneerProvince || ''}</View>
                      <View className="ml20">{this.props.home.pioneerCity || ''}</View>
                      {!this.props.home.pioneerCity && <AtIcon className='icon' value='alert-circle mr10' size='16' color='#FF4949'></AtIcon>}
                  </View>
              </Picker>
              <AtInput
                className='pl40'
                name='pioneerProject'
                title='创业项目'
                type='text'
                placeholder='请输入项目'
                value={this.props.home.pioneerProject || ''}
                onChange={this.handleChange.bind(this, 'pioneerProject')}
              />      
              <View className='flex f32 pl40 flex-aic bb1 ptb20'>
                <Text className='picker-title c333 w200'>项目简介</Text>
                <View className='flex-1 al'>
                    <AtTextarea
                    style="border: 2rpx solid rgba(214,228,239,0.9);width:100%;"
                    className='al'
                    name='projectIntroduction'
                    count={false}
                    value={this.props.home.projectIntroduction || ''}
                    onChange={this.changeIntroduction.bind(this)}
                    height={80}
                    auto-height={true}
                    placeholder='请输入简介'
                    />
                </View>
              </View>
            </View>
        );
    }
}