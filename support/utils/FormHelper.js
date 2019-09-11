/**
 * 设置FormItem参数
 * */
import {transformComponent} from './ViewHelper';

export function setFormItemOptions(label, labelCol, wrapperCol) {
  return {
    label,
    ...labelCol ? {labelCol: {
      xs: {span: 24},
      sm: {span: labelCol},
    }} : {},
    ...wrapperCol ? {wrapperCol: {
      xs: {span: 24},
      sm: {span: wrapperCol},
    }} : {},
  };
}

/**
 * 设置GetFieldDecorator
 * */
export function setFieldDecoratorOptions(rules, options) {
  if (Array.isArray(rules)) {
    return {rules, ...options};
  }
  return {rules: [rules], ...options};
}

/**
 * 格式化数据, 仅适用解析表单
 * */
export function transformData({
                                key,
                                value,
                                content,
                                required = false,
                                formItemOptions,
                                fieldDecoratorOptions,
                                component,
                                componentName,
                                componentChildren,
                                componentOptions,
                                transformChildren,
                                visibility = true,
                              }) {

  const tempFormItemOptions = {...setFormItemOptions(content), ...formItemOptions};

  /**
   * 简单为空限制, 默认不限制
   * */
  if (required && fieldDecoratorOptions && fieldDecoratorOptions.rules) {

    if (componentName && componentName == 'Input') {
      fieldDecoratorOptions.rules.push({
        required, whitespace: true, message: `${tempFormItemOptions.label}不允许为空`
      })
    }

  } else if (required) {

    if (componentName && componentName == 'Input') {
      fieldDecoratorOptions = {
        rules: [{required, whitespace: true, message: `${tempFormItemOptions.label}不允许为空`}],
      };
    } else {
      fieldDecoratorOptions = {
        rules: [{required, message: `${tempFormItemOptions.label}不允许为空`}],
      };
    }

  }

  return {
    key,
    formItemOptions: tempFormItemOptions,
    fieldDecoratorOptions: {
      initialValue: value != null ? value : undefined,
      ...fieldDecoratorOptions,
    },
    render:
      visibility &&
      (component ||
        transformComponent({
          content,
          componentName,
          componentChildren,
          componentOptions,
          transformChildren,
        })),
  };
}

/**
 * 上传组件所需配置FileOptions参数
 * */
export const uploadNormFile = {
  valuePropName: 'fileList',
  getValueFromEvent: e => {
    return e.fileList.filter(item => item.hasOwnProperty('status'));
  },
};

export function transformFileValue(url, index = -1) {
  return {
    uid: index,
    name: getImageName(url),
    status: 'done',
    url: url,
  };
}

export function transformFileValues(fileList) {
  return fileList.map((item, index) => transformFileValue(item, index));
}

function getImageName(url) {
  const index = url.lastIndexOf('/');
  return url.substring(index === -1 ? 0 : index);
}

export function setFormLayout({labelCol = 4, wrapperCol = 20}) {
  return {
    labelCol: {
      xs: {span: 24},
      sm: {span: labelCol},
    },
    wrapperCol: {
      xs: {span: 24},
      sm: {span: wrapperCol},
    },
  };
}
