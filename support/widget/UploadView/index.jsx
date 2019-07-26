/**
 * 通用上传组件
 * */

import {connect} from 'dva';
import {Icon, message, Upload} from 'antd';
import React from 'react';

//  支持图片格式
const fileTypes = ['image/jpeg', 'image/png'];
const videoFileTypes = ['video/mp4'];

@connect()
export default class UploadView extends React.Component {

  uploadButton(name) {
    return (
      <div>
        <Icon type={'plus'}/>
        <div>{name}</div>
      </div>
    );
  }


  handlePreview(file) {
    const {dispatch, mode} = this.props;
    dispatch({
      type: 'global/changePreview',
      payload: {
        dataSource: file.url || file.thumbUrl,
        isVideo: mode == 1,
        visible: true,
      },
    });
  }

  beforeUpload(file) {

    const {mode} = this.props;

    if (mode == 1) {
      const hasVideo = videoFileTypes.find(fileType => file.type == fileType);

      if (!hasVideo) {
        message.error('只允许上传MP4视频文件!');
        return false;
      }

      const isLt10M = file.size / 1024 / 1024 < 10;
      if (!isLt10M) {
        message.error('文件大小不能超过10M!');
        return false;
      }

      return hasVideo && isLt10M;

    } else if (mode == 0) {
      const isJPG = fileTypes.find(fileType => file.type == fileType);
      if (!isJPG) {
        message.error('只允许上传JPG/PNG图片文件!');
        return false;
      }
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!isLt2M) {
        message.error('文件大小不能超过2M!');
        return false;
      }
      return isJPG && isLt2M;
    }
  }

  onChange({fileList}) {
    console.log(fileList);
  }

  render() {
    const {fileList, count = 1, mode = 0} = this.props;

    const hint = mode == 1 ? '选择视频' : mode == 0 ? '选择图片' : '选择文件';

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
      <Upload {...this.props} listType="picture-card"
              onPreview={this.handlePreview.bind(this)}
              beforeUpload={this.beforeUpload.bind(this)}>
        {(fileList == null || fileList == false || fileList && fileList.length < count) && this.uploadButton(hint)}
      </Upload>
    );
  }

}
