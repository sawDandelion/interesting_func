import {Button, Card, Form} from 'antd';
import React from 'react';
import {PageHeaderWrapper} from '@ant-design/pro-layout';
import styles from './index.less';
import useHandle from '../../hooks/useHandle';
import ExModal from '../ExModal';
import ExDrawer from '../ExDrawer';
import {setFormLayout, transformData} from '../../utils/FormHelper';
import {debounce} from "lodash";

const FormItem = Form.Item;


const BasicForm = function (props) {

  const {
    onSuccessCallback,
    dateSource = [],
    form,
    config,
    onCancel,
    submitParams,
    visible,
    children,
    cardParams,
    footer,
    formLayout = {labelCol: 4, wrapperCol: 20},
    buttonParams = {text: '提交', offset: 0, span: 24, style: {width: '100%'}},
  } = props;

  const {isLoading, onHandle} = useHandle();

  const {getFieldDecorator} = form;

  const onSubmit = (event) => {
    //event.persist();
    form.validateFields((err, values) => {
      debounce(async () => {
        if (!err && props.onSubmit) {
          props.onSubmit(values, onHandle);
        } else if (!err && submitParams) {
          await onHandle(submitParams(values)).then((result) => onSuccessCallback(result));
        }
      }, 200)();
    });
  };


  const renderFormItem = (dateSource) => dateSource.map(item => transformItem(item));

  const transformItem = (item) => {
    const {key, formItemOptions, fieldDecoratorOptions, render} = transformData(item);
    if (key && render) {
      return (
        <FormItem  {...formItemOptions} {...setFormLayout(formLayout)} key={key}>
          {getFieldDecorator(key, fieldDecoratorOptions)(render)}
        </FormItem>
      );
    }
  };

  function transFormChildren(children) {
    return children.map(item => {
      if (Array.isArray(item)) {
        return transFormChildren(item);
      } else if (item && item.hasOwnProperty('componentName') || item.hasOwnProperty('component')) {
        return transformItem(item);
      } else {
        return item;
      }
    });
  }

  function initFormView() {
    return (
      <Form style={{flexGrow: 1}}>
        {
          children && Array.isArray(children)
            ? transFormChildren(children)
            : renderFormItem(dateSource)
        }
        {config && (config.mode === 3 || config.mode === 4) && (
          <FormItem>
            <Button style={buttonParams.style} loading={isLoading} onClick={onSubmit} type="primary"
                    htmlType="submit">
              {buttonParams.text}
            </Button>
          </FormItem>
        )}
      </Form>
    );
  }

  const mode = (config && config.mode) || 1;

  const container = (
    <div
      className={styles.float_body}
      style={{flexDirection: (config && config.bodyFlexDirection) || 'column'}}>
      {initFormView()}
    </div>
  );

  switch (mode) {
    case 1:
      return (
        <ExModal
          {...config}
          onCancel={onCancel}
          visible={visible}
          loading={isLoading}
          onOk={onSubmit}>
          {container}
        </ExModal>
      );
    case 2:
      return (
        <ExDrawer {...config} onCancel={onCancel} visible={visible} loading={isLoading}>
          {initFormView()}
          {
            footer != null
              ? footer({isLoading, onSubmit, onCancel})
              : (
                <div className={styles.container}>
                  <Button style={{marginRight: 8}} onClick={onCancel}>
                    取消
                  </Button>
                  <Button loading={isLoading} onClick={onSubmit} type="primary">
                    提交
                  </Button>
                </div>
              )
          }
        </ExDrawer>
      );
    case 3: {
      return (
        <PageHeaderWrapper>
          <Card bordered={false} {...cardParams}>
            {container}
          </Card>
        </PageHeaderWrapper>
      );
    }
    case 4:
      return initFormView();
  }
};

export default Form.create()(BasicForm);
