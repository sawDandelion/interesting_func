/**
 * 订阅数据
 * */
import React, {Component} from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';
import {defaultListParams, PAGE_SIZE, parseListData,} from '../config';
import {connect} from 'dva';
import {equalsObj} from "../utils/CommonHelper";

const defaultState = {
  dataSource: null,
  loadingType: -1,
  page: 1,
  pageSize: PAGE_SIZE,
  isError: false,
  searchValues: null,
};

const ACTION_REFRESH = 'common/onRefresh';

export const withRefresh = (
  mapPropsToAction,
  mapStateToProps,
  options = {automatic: true, plural: false, isPop: false},
) => WrappedComponent => {

  @connect(state => {
    if (mapStateToProps) return mapStateToProps(state);
    return {};
  })
  class Enhance extends Component {

    state = defaultState;

    componentDidMount() {
      if (options && options.automatic) this.onRefresh();
    }

    static getDerivedStateFromProps(nextProps, prevState) {
      if (!nextProps.visible && !nextProps.config && options.isPop) return defaultState;
      return null;
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
      return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
      const result = equalsObj(prevProps.selectedData, this.props.selectedData);
      if (this.props.visible && (!result || (!prevProps.config || prevProps.config.key !== this.props.config.key))) {
        this.onRefresh();
      }
    }

    componentDidCatch(error, errorInfo) {
      console.log(errorInfo);
    }

    componentWillUnmount() {
    }

    onRefresh(props) {
      let action;
      if (mapPropsToAction == null) return;
      if (typeof mapPropsToAction == 'function') {
        action = mapPropsToAction(props || this.props) || {};

      } else if (typeof mapPropsToAction == 'object') {
        action = mapPropsToAction;
      }
      let temp = {};
      if (action.type == null) {
        temp.type = ACTION_REFRESH;
        temp.payload = action.payload || action || {};
        action = temp;
      }

      if (action.type == ACTION_REFRESH && action.payload.url == null) return;

      //this.setState(this.onBeforeRefreshUpdateState(LOADING_REFRESH_TYPE));

      const {location, dispatch} = this.props;
      const {page, pageSize, searchValues} = this.state;

      const redirectPath = (location && location.pathname) || '/';
      action.payload = {...action.payload, redirectPath};

      if (options && options.plural) action.payload.body = {...defaultListParams(page, pageSize), ...action.payload.body};

      if (searchValues) action.payload.body = {...action.payload.body, ...searchValues};

      dispatch(action)
        .then(result => this.onRefreshSuccess(result))
        .catch(e => this.onRefreshError(e))
        .finally(() => {
          this.setState({loadingType: -1});
        });
    }

    resetPage({current, pageSize}, hasRefresh) {
      this.setState({page: current, pageSize}, () => {
        if (hasRefresh) this.onRefresh();
      });
    }

    onSearch(values) {
      this.setState({page: 1, searchValues: values}, () => {
        this.onRefresh();
      });
    }

    onBeforeRefreshUpdateState(loadingType) {
      return {loadingType};
    }

    onRefreshSuccess(dataSource) {
      this.setState({dataSource, loadingType: -1});
    }

    onRefreshError(e) {
      console.log(e);
      this.setState({dataSource: null, loadingType: -1});
    }

    render() {

      const {extraProps, ...restProps} = this.props;

      const {dataSource, loadingType, page, pageSize} = this.state;

      let injectedProps = {
        page,
        pageSize,
        resetPage: this.resetPage.bind(this),
        loading: loadingType === 1 || loadingType === 2,
        onRefresh: this.onRefresh.bind(this),
        onSearch: this.onSearch.bind(this),
      };

      if (options && options.plural) {
        const {total, list} = parseListData(dataSource);
        injectedProps.list = list;
        injectedProps.total = total;
      }
      injectedProps.dataSource = dataSource || {};

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
