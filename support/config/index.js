import router from 'umi/router';
import {message} from 'antd';
import {getPersistenceData} from "../utils/Persistence";
import {SL_TOKEN} from "../../utils/constants";
import {getFileUrl, PATH_FILE_UPLOAD, PROJECT_FILE} from "../../services/constants";
import request from "../utils/request";
import {PROJECT_RAW} from "../../services";

/**
 *
 * Created by Freddie on 2018/09/04
 * Description: 全局配置
 */

// table page size, default value=10
export const PAGE_SIZE = 10;

export const LOADING_REFRESH_TYPE = 1;
export const DEFAULT_LOADING_HANDLE_TYPE = 4;

const ERROR_CODES = [
  {code: 131073, value: '密码错误'},
  {code: 131074, value: '没有这个账号'},
  {code: 65616, value: '用户名长度必需在3到30位之间'},
];

/**
 * 开启全局自动查询请求
 */
export const DEFAULT_AUTOMATIC = true;

/**
 * 全局请求数据格式, 支持类型: json, form-data
 * 可根据requestPost({dataWay : 'json' })方法, 动态调整数据格式
 * */
export const DEFAULT_DATA_WAY = 'json';

/**
 * 全局权限校验方法, 请根据自身需求重写该方法
 * */
export function checkAuthority(authorities) {
  return true;
}

/**
 * withFetch触发componentWillReceiveProps函数时, 通过该方法判断是否刷新
 * */
export function updatePropsWhetherToRefresh(nextProps, oldProps) {
  if (nextProps.selectedData && oldProps.selectedData) {
    return oldProps.selectedData.id != nextProps.selectedData.id;
  } else {
    return nextProps && nextProps.selectedData && nextProps.visible;
  }
}

/**
 * withFetch触发componentWillReceiveProps函数时, 通过该方法判断是否清空state数据
 * */
export function updatePropsWhetherToClearState(prevProps, nextProps) {
  const prevSelectData = prevProps.selectedData;
  const nextSelectData = nextProps.selectedData;

  return (
    nextProps.visible &&
    (nextSelectData == null || (prevSelectData && nextSelectData.id != prevSelectData.id))
  );
}

/**
 * 全局请求请求默认携带参数
 * */
export function defaultRequestParams(params = {}) {
  //  do something...
  return params;
}

/**
 * 全局列表请求请求默认携带参数
 * */
export function defaultListParams(page = 1, pageSize) {
  return {page: page - 1, size: pageSize};
}

export function checkLoginPermissions() {
  const token = getPersistenceData(SL_TOKEN);
  return token != undefined || token != null;
}

export function defaultRequestHeaders() {
  const headers = {Accept: 'application/json, text/plain, */*'};
  const token = getPersistenceData(SL_TOKEN);
  if (token) headers['Authorization'] = token;
  return headers;
}

/**
 * 全局请求回调
 * */
export function handleResponse(res, showMessage, msg) {
  const {data, resultCode} = res;
  let messageValue = msg || res.message;

  if (resultCode === 0 || resultCode === '0' || resultCode === 200) {
    if (showMessage && messageValue) message.success(messageValue);
    return data;
  } else {
    const find = ERROR_CODES.find(item => item.code == resultCode);
    messageValue = find ? find.value : res.message;
    if (showMessage) message.error(messageValue);
  }
  return Promise.reject(messageValue);
}

export function handleResponseFailure(e, url) {
  const status = e && e.name || 404;
  if (status === 401) {
    window.g_app._store.dispatch({type: 'login/logout'});
  } else if (status === 403) {
    router.push('/exception-403');
  } else if (status <= 504 && status >= 500) {
    router.push('/exception-500');
  } else if (status >= 404 && status < 422) {
    if (url.indexOf('/users') > -1) {
      router.push('/exception-404');
    }
  }
}

/**
 * 解析Response List数据, 返回ListData
 * return {
 *     list: Array,
 *     total : Integer
 * }
 * */
export function parseListData(data) {
  let list = [];
  let total = 0;
  if (data && Array.isArray(data) && data.length > 0) {
    list = data;
    total = data.length;
  } else if (data && data.content && data.content.length > 0) {
    list = data.content;
  } else if (data && data.list && data.list.length > 0) {
    list = data.list;
  }

  if (data && data.totalElements) {
    total = data.totalElements;
  }
  return {list, total};
}

/**
 * 解析Response数据, 返回Message
 * */
export function getResponseMessage(response) {
  return response.message;
}

/**
 * 判断是否还有加载更多数据
 * */
export function hasLoadMore(data) {
  return false;
}


/**
 *
 * @param file
 * @param mode = {0=图片, 1=视频, 2=文件}
 * @returns {*}
 */
export function uploadFile(file, mode) {
  const fileName = mode === 1 ? 'videos' : mode === 0 ? 'images' : 'files';
  return request({
    url: getFileUrl(PATH_FILE_UPLOAD, PROJECT_FILE, window[PROJECT_RAW]),
    method: 'POST',
    bodyType: 'FORM_DATA',
    body: {id: 'source', id_number: 'hr-hadoop-service', name: fileName, file: file},
  });
}
