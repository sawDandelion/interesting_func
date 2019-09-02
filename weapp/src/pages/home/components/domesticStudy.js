import Taro, { Component } from '@tarojs/taro'
import { View,  Picker } from '@tarojs/components'
import { AtInput, AtIcon  } from 'taro-ui'
import { connect } from '@tarojs/redux';
import '../../../app.styl'

@connect(state => {
    return { ...state }
})


export default class DomesticStudy extends Component {

    componentWillMount() {}


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
    }

    render() {
        return (
            <View>
            <AtInput
              maxLength={20}
              className='pl40'
              error={!this.props.home.enterSchoolName || this.props.home.enterSchoolName==='null'}
              name='enterSchoolName'
              title='学校'
              type='text'
              placeholder='请输入学校'
              value={this.props.home.enterSchoolName}
              onChange={this.handleChange.bind(this, 'enterSchoolName')}
            />
            <Picker className='bb1' mode='selector' range={this.props.home.studyDegreeArr} onChange={(e) => this.onChangePicker(e,'studyDegree','studyDegreeArr')}>
              <View className='picker'>
                <View className="picker-title">攻读学位</View>
                <View className="flex-1 ac">{this.props.home.studyDegree || ''}</View>
                {(!this.props.home.studyDegree) && <AtIcon value='alert-circle mr14' size='16' color='#FF4949'></AtIcon>}
              </View>
            </Picker>
            <AtInput
              maxLength={20}
              className='pl40'
              name='professionalName'
              error={!this.props.home.professionalName || this.props.home.professionalName==='null'}
              title='专业'
              type='text'
              placeholder='请输入专业'
              value={this.props.home.professionalName}
              onChange={this.handleChange.bind(this, 'professionalName')}
            />
          </View>
        );
    }
}