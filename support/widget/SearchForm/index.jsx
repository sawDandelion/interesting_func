import React, {PureComponent} from 'react';
import {Button, Form, Icon} from 'antd';
import {transformData} from '../../utils/FormHelper';

const FormItem = Form.Item;

@Form.create()
export default class SearchForm extends PureComponent {

  state = {
    expand: false,
  };

  handleSearch = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      this.props.onSubmit(values);
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  toggle = () => {
    const {expand} = this.state;
    this.setState({expand: !expand});
  };

  renderButton() {
    return (
      <>
        <Button type="primary" htmlType="submit">
          查询
        </Button>
        <Button style={{marginLeft: 8}} onClick={this.handleReset}>
          清空
        </Button>
        {this.props.expand && (
          <a style={{marginLeft: 8, fontSize: 12}} onClick={this.toggle}>
            {this.state.expand ? '收起' : '展开'} <Icon type={this.state.expand ? 'up' : 'down'}/>
          </a>
        )}
      </>
    );
  }

  initFormParams() {
    return {
      hideRequiredMark: true,
      onSubmit: this.handleSearch.bind(this),
      layout: 'inline',
      style: {marginBottom: 8}
    };
  }

  render() {
    const {dataSource = [], form} = this.props;
    const {getFieldDecorator} = form;
    return (
      <Form {...this.initFormParams()}>
        {dataSource.map((item, position) => {
          const defaultStyle = {width: 200};
          if (!item.componentOptions) {
            item.componentOptions = {style: defaultStyle};

          } else if (!item.componentOptions.style) {
            item.componentOptions.style = defaultStyle;
          }
          const {key, formItemOptions, fieldDecoratorOptions, render} = transformData(item);
          if (key && render) {
            if (!item.hasOwnProperty('expand') || (item.expand && this.state.expand)) {
              return (
                <FormItem {...formItemOptions} key={key} labelCol={null} wrapperCol={null}>
                  {getFieldDecorator(key, fieldDecoratorOptions)(render)}
                </FormItem>
              );
            }
          }
        })}
        <FormItem>{this.renderButton()}</FormItem>
      </Form>
    );
  }


}
