/**
 * @description
 * @author Freddie
 * @since 25/06/2019
 */
import {Col, Row} from 'antd';
import React from "react";


const HorizontalRecord = (props) => {
  const {span, push, title, children, styles, style} = props;

  const injectedProps = {};
  if (styles) injectedProps.className = styles;
  else injectedProps.style = style;

  return (
    <Row type='flex' align='middle' justify='center' {...injectedProps}>
      <Col span={span} push={push}>{children}</Col>
      <Col span={push} pull={span}>{title}</Col>
    </Row>
  )
};

HorizontalRecord.defaultProps = {
  span: 16,
  push: 8,
  style: {width: 280, marginBottom: 8}
};

export default HorizontalRecord;
