/**
 * 用于转换 FormData 对象
 * */
import React from "react";
import moment from "moment";

function dataType(obj) {
  if (obj === null) return 'Null';
  if (obj === undefined) return 'Undefined';
  return Object.prototype.toString.call(obj).slice(8, -1);
}

function dealObjectValue(obj) {
  const param = {};
  if (obj === null || obj === undefined || obj === '' || obj == 'undefined') return param;
  for (let key in obj) {
    if (dataType(obj[key]) === 'Object') {
      param[key] = dealObjectValue(obj[key]);
    } else if (
      obj[key] !== null &&
      obj[key] !== undefined &&
      obj[key] !== '' &&
      obj[key] !== 'undefined'
    ) {
      param[key] = obj[key];
    }
  }
  return param;
}

export function parseFormData(obj) {
  const filterObj = dealObjectValue(obj);
  const formData = new FormData();
  for (let key in filterObj) {
    if (filterObj.hasOwnProperty(key) === true) formData.append(key, filterObj[key]);
  }
  return formData;
}

/**
 * 转换成URL参数
 * */
export function parseUrlData(obj) {
  if (obj == null) return '';
  let prefix = '?';
  let _result = [];
  for (let key in obj) {
    let value = obj[key];
    // 去掉为空的参数
    if (['', undefined, null].includes(value)) {
      continue;
    }
    _result.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
  }
  return _result.length ? prefix + _result.join('&') : '';
}

const DEFAULT_HINT = '--';

export function formatValue(value) {
  return value || DEFAULT_HINT;
}

export function findAttributeValue(selectedKey, array) {
  const find = array.find(item => item.key == selectedKey && selectedKey.toString());
  return find ? find.value : DEFAULT_HINT;
}

export function findRightOrWrong(value, right = '是', wrong = '否') {
  if (value == null || value == undefined) return DEFAULT_HINT;
  return value ? right : wrong;
}

export function parseMoment(value, format = "YYYY-MM-DD HH:mm:ss") {
  return value && moment(new Date(value), format) || moment();
}

export function getMomentValue(momentObj, format = "YYYY-MM-DD HH:mm:ss") {
  if (momentObj) return momentObj.format(format);
  return moment().format(format);
}

// 获取两日期之间的所有日期
export function enumerateDaysBetweenDates(startDate, endDate, type = 'DD', compareType = 'days') {
  let dates = [];
  let currDate = parseMoment(startDate);
  let lastDate = parseMoment(endDate);

  while (currDate.diff(lastDate, compareType) <= 0) {
    dates.push(getMomentValue(currDate, type));
    currDate.add(1, compareType);
  }

  return dates;
};

/**
 * 获取视频或者音频时长
 * @param file
 * @param callback
 */
export function getVideoDuration(file, callback) {
  const fileUrl = URL.createObjectURL(file);
  const audioElement = new Audio(fileUrl);
  audioElement.addEventListener("loadedmetadata", () => callback(audioElement.duration));
}

/**
 * 用于解析ANT upload上传文件
 * @param files
 * @param mode={0=字符串(复数逗号分隔), 1=字符串数组, 2=对象数组({name, url}), 3=源数据Files}
 * @returns string|Array ,如果数组长度为一择返回具体对象
 */
export function transformUploadFileValue(files, mode = 0) {
  let uploadImages = [];

  for (let file of files) {
    if (file.status === 'done') { //  上传成功
      let url;
      if (file.response && file.response.file) { //  上传结果
        url = file.response.file[0];

      } else if (file.response && file.response.vodId) {
        url = file.response.vodId;

      } else if (file.url) {
        url = file.url;
      }
      if (mode === 2) {
        uploadImages.push({
          url,
          name: file.name
        });
      } else {
        uploadImages.push(url);
      }
    }
  }

  switch (mode) {
    case 0:
      return uploadImages.join(',');
    case 1:
    case 2:
      return uploadImages;
    case 3:
      return files;
  }
}
