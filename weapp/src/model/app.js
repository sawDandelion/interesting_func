// import * as appApi from './service'
import Taro from '@tarojs/taro';
import Http from '../utils/http'
import {getQueryVariable} from '../utils/tool' 

export default {
  namespace: 'app',
  state: {
    unionid:''
  },
 
  effects: {
    * effectsDemo(_, { call, put }) {
      const { status, data } = yield call(appApi.userInfo ,{});
      if (status === 'ok') {
        yield put({ type: 'save',
          payload: {
            topData: data,
          } });
      }
    },
    *login(_,{call, put}){
      let unionid
      if (process.env.TARO_ENV === 'h5') {

        const code =getQueryVariable('code')
        if (!code) {
          Taro.showToast({title: '请使用公众号进入',})
        }
        const res = yield call(Http, 'getUserInfo',{code});
        
         unionid=res.data.unionid
    }
    // else if(process.env.TARO_ENV==='weapp'){
     
    //   const params={
    //     timeout:30000
    //   }
    //   try {
    //     const res=yield Taro.login(params)
        
    //     const code = res.code
    //     // console.log(code)
    //     Taro.setStorage({key:'code',data:code})

    //     // const resault = yield call(Http, 'getAppletUserInfo',{code});
    //     // unionid = resault.data.unionid

    //     // yield put({ type: 'home/handleChange', payload: { name: 'unionId', value: unionid } })

    //     // const res1 = yield call(Http, 'getUserInfoByUnionId',{unionId: unionid});

    //     // if (res1.resultCode===0) {
    //     //   Taro.setStorage({
    //     //     key: 'idNumber',
    //     //     data: res1.data.idNumber
    //     //   });
          
    //     //   if(res1.data.isRegister) {
    //     //     res1.data['disable'] = true
    //     //     for (const key in res1.data) {
    //     //       if (res1.data.hasOwnProperty(key)) {
                
    //     //         let val = res1.data[key];
                
    //     //         yield put({ type: 'home/handleChange', payload: { name: key, value: val } })
    //     //       }
    //     //     }
    //     //   }
    //     // }

    //   } catch (error) {
    //     return
    //   }

      
    // }
    

    yield put({type: 'save', payload: {unionid}})
  },
},
 
  reducers: {
    save(state, { payload }) {
      return { ...state, ...payload };
    },
  },
  subscriptions:{
    // setup({ dispatch,history }) {
      
    //   console.log(history)
      
    //   // return history.listen(({ pathname, search }) => {

    //   //   if(pathname == '/') {
    //   //     dispatch({type: 'login'})
    //   //   }

    //   // });
    // },
  }
 
};
