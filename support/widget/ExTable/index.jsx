import React, {useState} from "react";
import {Table} from 'antd';

/**
 * @description
 * @author Freddie
 * @since 22/06/2019
 */


const ExTable = (props) => {

  const {total, list, loading = false, page, pageSize, showRowSelection, showPagination} = props;

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const pagination = {
    onShowSizeChange: this.props.onShowSizeChange.bind(this),
    total: total,
    current: page,
    pageSize: pageSize,
    showSizeChanger: true,
    showTotal: (total, range) => `总共: ${total} 条数据`
  };

  const tableParams = {
    loading,
    pagination,
    dataSource: list,
    rowKey: this.rowKey.bind(this),
    onChange: this.onTableChange.bind(this),
  };

  if (showRowSelection) {
    tableParams.rowSelection = {
      selectedRowKeys,
      onChange: (selectedRowKeys) => setSelectedRowKeys({selectedRowKeys}),
    };
  }

  return <Table {...tableParams} {...this.stepTableFields()} />;
};

ExTable.defaultProps = {
  loading: false,
  showTotal: 1,
  rowKey: (record, position) => record.id || position + '',
};

export default ExTable;
