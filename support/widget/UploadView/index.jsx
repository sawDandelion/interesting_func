/**
 * 通用上传组件
 * */

import {connect} from 'dva';
import {Button, Icon, message, Upload} from 'antd';
import React from 'react';
import {transformUploadFileValue} from "../../utils/Transform";

//  支持图片格式
const fileTypes = ['image/jpeg', 'image/png'];
const videoFileTypes = ['video/mp4'];

@connect()
export default class UploadView extends React.Component {

  uploadButton(name) {
    if (this.props.mode === 1) {
      return <Button><Icon type="upload"/>{name}</Button>
    }
    return (
      <div style={{display: 'inline-block'}}>
        <Icon type={'plus'}/>
        <div>{name}</div>
      </div>
    );
  }

  handlePreview(file) {
    const {dispatch, mode} = this.props;
    dispatch({
      type: 'common/changePreview',
      payload: {
        dataSource: transformUploadFileValue([file], 0),
        isVideo: mode === 1,
        visible: true,
      },
    });
  }

  beforeUpload(file) {

    const {mode = 0} = this.props;

    if (mode == 1) {
      const hasVideo = videoFileTypes.find(fileType => file.type == fileType);

      if (!hasVideo) {
        message.error('只允许上传MP4视频文件!');
        return Promise.reject();
      }

      const isLt200M = file.size / 1024 / 1024 < 200;
      if (!isLt200M) {
        message.error('文件大小不能超过200M!');
        return Promise.reject();
      }

      return hasVideo && isLt200M;

    } else if (mode == 0) {
      const isJPG = fileTypes.find(fileType => file.type == fileType);
      if (!isJPG) {
        message.error('只允许上传JPG/PNG图片文件!');
        return Promise.reject();
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('文件大小不能超过2M!');
        return Promise.reject();
      }
      return isJPG && isLt2M;
    }
  }

  render() {
    const {fileList, count = 1, mode = 0} = this.props;
    const hint = mode === 1 ? '选择视频' : mode === 0 ? '选择图片' : '选择文件';

    let listType;

    let accept = '';
    switch (mode) {
      case 0:
        accept = 'image/jpeg,image/png';
        listType = "picture-card";
        break;
      case 1:
        accept = 'video/mp4';
        listType = "text";
        break;
      case 2:
        //accept = 'file';
        break;
    }

    if (mode == 2) {
      return (
        <Upload.Dragger {...this.props}>
          <p className="ant-upload-drag-icon"><Icon type="inbox"/></p>
          <p className="ant-upload-text">单击或拖动文件到此区域上传</p>
          <p className="ant-upload-hint">支持单个或批量上传</p>
        </Upload.Dragger>
      )
    }

    return (
      <Upload accept={accept}
              listType={listType}
              onPreview={this.handlePreview.bind(this)}
              beforeUpload={this.beforeUpload.bind(this)}
              {...this.props}>
        {(fileList == null || fileList == false || fileList && fileList.length < count) && this.uploadButton(hint)}
      </Upload>
    );
  }

}
