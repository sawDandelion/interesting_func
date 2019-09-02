import Taro, { Component } from '@tarojs/taro'
import { View, Text, Picker, Radio, RadioGroup, Label, Input } from '@tarojs/components'
import { AtButton, AtInput, AtForm, AtIcon } from 'taro-ui'
import { connect } from '@tarojs/redux';

import '../../../app.styl'

@connect(state => {
    return { ...state }
})

export default class Unemployed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checked: false
        }
    }
    componentWillMount() {
        if(this.props.home.isAcceptEmployment==='是') {
            this.setState({
                checked: true
            })
        }else  {
            this.setState({
                checked: false
            })
        }
    }

   
    handleChange(name, value) {
        this.props.dispatch({ type: 'home/handleChange', payload: { name, value } });

    }
    onChangePicker(e, key, arrkey) {

        const value = arrkey ? this.props.home[arrkey][e.detail.value] : e.detail.value
        const name = key
        this.props.dispatch({ type: `home/handleChange`, payload: { name, value } });
    }

    radioChange(e){
        const value=e.detail.value
        this.props.dispatch({ type: `home/handleChange`, payload: { name: "isAcceptEmployment", value } });
        this.props.dispatch({ type: `home/handleChange`, payload: { name:'intentionalPost', value:'' } });
        this.props.dispatch({ type: `home/handleChange`, payload: { name:'minpay', value:'' } });
        this.props.dispatch({ type: `home/handleChange`, payload: { name:'maxpay', value:'' } });
    }
    changeMinpay(e){
        let value=e.detail.value
        value=value.replace(/[^\w\.\/]/ig,'')
        this.props.dispatch({ type: `home/handleChange`, payload: { name: "minpay", value } });
    }
    changeMaxpay(e){
        let value=e.detail.value
        value=value.replace(/[^\w\.\/]/ig,'')
        this.props.dispatch({ type: `home/handleChange`, payload: { name: "maxpay", value } });
    }
    render() {

        return (
            <View>
                <Picker className='bb1' mode='selector' range={this.props.home.employmentPlanArr} onChange={(e) => this.onChangePicker(e, 'employmentPlan', 'employmentPlanArr')}>
                    <View className='picker'>
                        <View className='picker-title'>就业计划</View>
                        <View className='flex-1 ac'>{this.props.home.employmentPlan || ""}</View>
                        {!this.props.home.employmentPlan && <AtIcon value='alert-circle mr10' size='16' color='#FF4949'></AtIcon>}
                    </View>
                </Picker>
                <AtInput
                    className='pl40'
                    name='remark'
                    title='备注'
                    type='text'
                    placeholder=''
                    value={this.props.home.remark}
                    onChange={this.handleChange.bind(this, 'remark')}
                />
                <View className='flex f32 pl40 flex-aic bb1 ptb20'>
                    <View className='picker-title c333'>
                        <View>是否接受</View>
                        <View>推荐就业</View>
                    </View>
                    <RadioGroup onChange={this.radioChange.bind(this)} className=''>
                        <Label key='0'>
                            <Radio color='#6190e8' value='是' checked={this.props.home.isAcceptEmployment==='是'}>是</Radio>
                        </Label>
                        <Label key='1' className='pl40'>
                            <Radio color='#6190e8' value='否' checked={this.props.home.isAcceptEmployment==='否'}>否</Radio>
                        </Label>
                        {/* <Label key='0'>
                            <Radio color='#6190e8' value='是' checked={ this.state.checked}>是</Radio>
                        </Label>
                        <Label key='1' className='pl40'>
                            <Radio color='#6190e8' value='否' checked={ !this.state.checked}>否</Radio>
                        </Label> */}
                    </RadioGroup>
                </View>

                {
                    this.props.home.isAcceptEmployment === '是' && 
                    <View>
                        <AtInput
                            className='pl40'
                            error={!this.props.home.intentionalPost}
                            name='intentionalPost'
                            title='意向岗位'
                            type='text'
                            placeholder='请输入意向岗位'
                            value={this.props.home.intentionalPost}
                            onChange={this.handleChange.bind(this, 'intentionalPost')}
                        />
                        <View className='flex f32 pl40 flex-aic ptb20'>
                            <View className='picker-title c333'>期望薪资</View>
                            <View className='flex-1 flex'>
                                <Input type='text' placeholder='最低' value={this.props.home.minpay} onChange={this.changeMinpay.bind(this)}/>
                                <Text className='f30 m20'> - </Text>
                                <Input type='text' placeholder='最高' value={this.props.home.maxpay} onChange={this.changeMaxpay.bind(this)}/>
                                {!this.props.home.minpay && <AtIcon value='alert-circle mr10' size='16' color='#FF4949'></AtIcon>}
                            </View>
                        </View>
                    </View>
                }
            </View>
        );
    }
}