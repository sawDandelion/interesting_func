import React from 'react';
import {Tree} from 'antd';

const {TreeNode} = Tree;

import styles from './index.less';

/**
 * @description
 * @author Freddie
 * @since 31/07/2019
 */


export default class SubMenu extends React.PureComponent {

  renderFormItem(item) {
    if (item.children && item.children.length > 0) {
      return (
        <TreeNode title={item.name} key={item.id} entity={item}>
          {item.children.map(childItem => this.renderFormItem(childItem))}
        </TreeNode>
      );
    } else {
      return (
        <TreeNode title={item.name} key={item.id} entity={item}/>
      );
    }
  }

  saveCheckedKeys(selectedKeys, e) {
    this.props.saveCheckedKeys(selectedKeys, e.node.props.entity);
  }

  render() {
    const {selectedKeys = [], list = [], expandedKeys = []} = this.props;
    return (
      <div className={styles.container}>
        <Tree.DirectoryTree
          showIcon={false}
          expandAction={'doubleClick'}
          selectedKeys={selectedKeys}
          defaultExpandedKeys={expandedKeys}
          onSelect={this.saveCheckedKeys.bind(this)}>
          {list.map(item => this.renderFormItem(item))}
        </Tree.DirectoryTree>
      </div>
    );
  }

}
