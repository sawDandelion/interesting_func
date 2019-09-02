// import * as homeApi from './service';
 
export default {
  namespace: 'home',
  state: {
    current: 0,
    userName: '',
    idNumber: '',
    educationArr: ['专科', '本科', '硕士', '博士'],
    education: '本科',
    graduationYear: '2019',
    telephoneNumber: '',
    genderArr: ['男','女'],
    gender: '请选择',
    nationality: '汉族',
    national: ['汉族','壮族','满族','回族','苗族','维吾尔族','土家族','彝族','蒙古族','藏族','布依族','侗族','瑶族','朝鲜族','白族','哈尼族','哈萨克族','黎族','傣族','畲族','傈僳族','仡佬族','东乡族','高山族','拉祜族','水族','佤族','纳西族','羌族','土族','仫佬族','锡伯族','柯尔克孜族','达斡尔族','景颇族','毛南族','撒拉族','布朗族','塔吉克族','阿昌族','普米族','鄂温克族','怒族','京族','基诺族','德昂族','保安族','俄罗斯族','裕固族','乌孜别克族','门巴族','鄂伦春族','独龙族','塔塔尔族','赫哲族','珞巴族'],
    graduatedSchool: '',
    departmentName: '',
    profession: '',
    schoolSystem: '',
    graduationPlaceArr: ['签劳动合同形式就业', '签就业协议形式就业', '其他录用方式就业', '待就业', '升学', '出国、出境', '自主创业', '入伍', '国家基层项目', '地方基层项目', '自由职业', '科研助理', '不就业拟升学', '其他暂不就业'],
    graduationPlace: '',
    employmentTypeArr: ['社招就业', '校招就业', '其他'], //就业方式
    employmentType: '社招就业',
    unitName: '', //就业单位
    unitNatureArr: ['国家行政企业', '公私合作企业', '中外合资企业', '社会组织机构','国际组织机构', '外资企业','私营（民营）企业', '集体企业','国防军事企业','其他'], //单位性质
    unitNature: '国家行政企业',
    province: '山东省',
    city: '泰安市',
    county: '泰山区',
    workAddress: '', //详细地址
    isAcceptEmployment: '',
    intentionalPost:'', //意向岗位
    minpay:'',
    maxpay:'',
    employmentPlanArr: ['找工作中', '暂缓就业', '其他'],
    employmentPlan: '找工作中',
    remark: '',
    enterSchoolName: '',
    professionalName: '',
    studyDegreeArr: ['本科', '硕士', '博士', '博士后'],
    studyDegree:  '',
    country: ['美国', '英国','法国', '日本','韩国', '加拿大'],
    countryAbroad: '',
    pioneerProject: '',
    projectIntroduction: '',
    pioneerProvince: '山东省',
    pioneerCity: '泰安市',
    enlistingArr: ['义务兵', '特招入伍'],
    wayEnlisting: '',
    failInfo: '验证失败',
    unionId:"",
    userId:'',
    type: false,
    disable:false
  },
  reducers: {
    onChangeCurrent(state,{payload:{current}}){
      return {...state, current};
    },
    handleChange(state,{payload: {name,value}}) {
      state[name]= value
      return {...state, value}
    },
  },
  effects:{
    *onChange({payload:{current}},{put}) {
      if (current===0) return
     yield put({type: 'onChangeCurrent', payload:{current}});
    },
    // *onChangePicker({payload:{e, key, arrkey}},{put}){
    //   const value = arrkey ? this.props.home[arrkey][e.detail.value] : e.detail.value
    //   const name = key
    //   yield put({ type:'handleChange', payload: { name, value } });
    // }
  }
}
