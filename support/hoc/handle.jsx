/**
 * 订阅数据
 * */
import React, {Component} from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import request from "../utils/request";


export const withHandle = () => WrappedComponent => {

  class Enhance extends Component {

    state = {
      isLoading: false,
      isError: false,
    };

    async onHandle(params) {
      this.setState({isLoading: true, isError: false});
      try {
        params.showMessage = true;
        const response = await request(params);
        return response;
      } catch (e) {
        return Promise.reject(e);
      } finally {
        this.setState({isLoading: false});
      }
    };

    render() {

      const {extraProps, ...restProps} = this.props;
      const {isLoading, isError} = this.state;

      let injectedProps = {
        handleStatus: isLoading ? 1 : isError ? 2 : 0,
        onHandle: this.onHandle.bind(this)
      };

      return <WrappedComponent {...restProps} {...injectedProps} />;
    }
  }

  Enhance.displayName = `withPreload(${getDisplayName(WrappedComponent)})`;

  /**
   * 自动拷贝所有非React静态方法
   * */
  hoistNonReactStatic(Enhance, WrappedComponent);

  return Enhance;
};

/**
 * 获取组件名称
 * */
const getDisplayName = WrappedComponent => {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component';
};
