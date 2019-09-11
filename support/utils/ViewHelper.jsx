import {
  Button,
  Cascader,
  Checkbox,
  DatePicker,
  Input,
  InputNumber,
  Popconfirm,
  Radio,
  Select,
  Switch,
  TimePicker,
  TreeSelect,
} from 'antd';
import React from 'react';
import UploadView from '../widget/UploadView';
import {uploadNormFile} from './FormHelper';
import {uploadFile} from '../config';
import SearchSelect from "../widget/SearchSelect";

const {MonthPicker, RangePicker, WeekPicker} = DatePicker;


/**
 * View对象说明:
 *
 *    key: 唯一标识
 *    value: 内容
 *    content: 内容
 *    componentName: 组件名称
 *    componentOptions: 组件参数
 *    componentChildren: 组件下的子组件集
 *    authority: 权限唯一标识
 *    visibility : 是否显示(boolean)
 *
 *
 *    扩展字段, 用于Form:
 *    formItemOptions: FormItem的Options
 *    fieldDecoratorOptions: getFieldDecorator接收参数
 *    required: false
 *
 * */

/**
 *  根据数据格式, 转换具体的View
 * */
export function transformComponent(component) {

  const {
    key,
    content,
    componentName,
    componentChildren = [],
    componentOptions,
    transformChildren = item => {
      return {key: item.key, value: item.key, text: item.value}
    },
  } = component;

  if (component.componentName) {
    switch (componentName) {
      case 'Input':
        return <Input key={key} placeholder="请输入" maxLength={50} {...componentOptions} />;

      case 'InputSearch':
        return <Input.Search key={key} placeholder="请输入"  {...componentOptions}/>

      case 'InputNumber':
        return (
          <InputNumber
            style={{width: '100%'}}
            key={key}
            placeholder="请输入"
            {...componentOptions} />
        );

      case 'Upload':
        return <UploadView key={key} {...componentOptions} />;

      case 'Select':
        return (
          <Select key={key} placeholder={'请选择'} {...componentOptions}>
            {componentChildren.map((item, index) => {
              const transformedValue = transformChildren(item, index);
              return (
                <Select.Option key={transformedValue.key} value={transformedValue.key}>
                  {transformedValue.text}
                </Select.Option>
              );
            })}
          </Select>
        );

      case 'SearchSelect':
        return <SearchSelect transformChildren={transformChildren} key={key} placeholder={'请选择'} {...componentOptions}/>

      case 'TreeSelect':
        return (
          <TreeSelect key={key} placeholder={'请选择'} {...componentOptions}>
            {componentChildren.map(item => traverseView(TreeSelect.TreeNode, item))}
          </TreeSelect>
        );

      case 'DatePicker':
        return (
          <DatePicker key={key} {...componentOptions}/>
        );

      case 'TimePicker':
        return <TimePicker key={key} {...componentOptions} />

      case 'RangePicker':
        return (
          <RangePicker key={key} {...componentOptions}/>
        );

      case 'Radio':
        return (
          <Radio.Group key={key} placeholder={'请选择'} {...componentOptions}>
            {componentChildren.map(item => (
              <Radio key={item.key} value={item.key}>
                {item.value}
              </Radio>
            ))}
          </Radio.Group>
        );

      case 'TextArea':
        return (
          <Input.TextArea
            key={key}
            placeholder=""
            autosize={{minRows: 2, maxRows: 6}}
            maxLength={100}
            {...componentOptions}
          />
        );

      case 'Button':
        return (
          <Button key={key} {...componentOptions}>
            {content}
          </Button>
        );

      case 'TextLink':
        return (
          <a key={key} {...componentOptions}>
            {content}
          </a>
        );

      case 'PopConfirm':
        return (
          <Popconfirm key={key} {...componentOptions}>
            {content}
          </Popconfirm>
        );

      case 'Cascader':
        return <Cascader key={key} placeholder={'请选择'} {...componentOptions} />;

      case 'Checkbox':
        return (
          <Checkbox.Group key={key} placeholder={'请选择'} {...componentOptions}>
            {componentChildren.map(item => (
              <Checkbox key={item.key} value={item.key}>
                {item.value}
              </Checkbox>
            ))}
          </Checkbox.Group>
        );

      case 'Switch':
        return <Switch {...componentOptions} />;
    }
  }
  return component;
}

function traverseView(ViewNode, item) {
  if (item.treeNode && item.treeNode.length > 0) {
    return (
      <ViewNode title={item.name} key={item.id} value={item.id} entity={item}>
        {item.treeNode.map(childItem => traverseView(ViewNode, childItem))}
      </ViewNode>
    );
  } else {
    return <ViewNode title={item.name} key={item.id} value={item.id} entity={item}/>;
  }
}

/**
 *
 *
 * @param params= 接收View对象
 * @param mode= {0=图片, 1=视频, 2=文件}
 * @returns {{[p: string]: *}}
 */
export function uploadTemplate({key, content, value, required = true, count = 1}, mode = 0) {

  return {
    key,
    content,
    value: value && value.length > 0 && [{uid: '-1', name: value, status: 'done', url: value}],
    componentName: 'Upload',
    componentOptions: {
      mode,
      count,
      customRequest: (param) => onUploadCover(param, mode),
    },
    fieldDecoratorOptions: {
      ...uploadNormFile,
      rules: [{required, message: `${content}不允许为空`}],
    },

  };
}

export function onUploadCover(param, mode) {
  try {
    uploadFile(param, mode);
  } catch (e) {
    param.onError(e, {}, param.file);
  }
}

/**
 *  转换复数View
 * */
export function transformViews(fields) {
  if (!fields) return;
  if (Array.isArray(fields)) {
    return fields.map(item => transformComponent(item));
  } else {
    return transformComponent(fields);
  }
}




