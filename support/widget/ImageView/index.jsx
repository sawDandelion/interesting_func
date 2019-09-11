import React from 'react';
import {connect} from 'dva';
import current from './index.less';

@connect()
export default class ImageView extends React.PureComponent {

  onClick() {
    const {dispatch, src} = this.props;
    dispatch({
      type: 'common/changePreview',
      payload: {dataSource: src, visible: true},
    });
  }

  render() {
    const {src, dispatch, ...restProps} = this.props;

    if (src) {
      return <img {...restProps} src={src} onClick={this.onClick.bind(this)} alt={''}/>;
    }
    // return <div {...restProps}><span className={current.text}>暂无内容</span></div>
  }
}
