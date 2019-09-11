/**
 * @description 通用搜索选项组件
 * @author Freddie
 * @since 27/07/2019
 */
import {Select} from "antd";
import React, {PureComponent} from "react";
import {withHandle} from "../../hoc/handle";

@withHandle()
export default class SearchSelect extends PureComponent {
  /**
   * @automatic 首次自动加载
   * @handleSearch 搜索回调, 具体使用请参考以下示例:
   *
   * handleSearch: (value, onHandle, setDataSource) => {
   *  onHandle({ url, body, method}).then(res => setDataSource(res.content || []));
   * }
   *
   */

  static defaultProps = {
    automatic: true
  };

  state = {
    dataSource: []
  };

  componentDidMount() {
    const {automatic, handleSearch} = this.props;
    if (automatic) handleSearch('', this.props.onHandle, this.setDataSource.bind(this));
  }

  setDataSource(dataSource) {
    this.setState({dataSource});
  }

  render() {

    const {transformChildren, handleSearch, isLoading, ...restProps} = this.props;
    const {dataSource} = this.state;

    return (
      <Select
        showSearch
        loading={isLoading}
        onSearch={value => handleSearch(value, this.props.onHandle, this.setDataSource.bind(this))}
        defaultActiveFirstOption={false}
        filterOption={false}
        {...restProps}>
        {dataSource.map((item, index) => {
          const transformedValue = transformChildren(item, index);
          return (
            <Select.Option key={transformedValue.key} value={transformedValue.key}>
              {transformedValue.text}
            </Select.Option>
          );
        })}
      </Select>
    );
  }
}


