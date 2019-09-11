import {Icon, Tooltip} from "antd";
import React from "react";

/**
 * @description
 * @author Freddie
 * @since 17/06/2019
 */

const ExTooltip = (props) => {

  const {value, maxLength = 50, mode = 0, name} = props;

  if (value == null || value === undefined) return '--';
  if (maxLength >= value.length && mode === 0) return value;

  return mode === 1
    ? (
      <Tooltip title={value}>
        <span style={{paddingRight: 8}}>{name}</span>
        <Icon type="question-circle"/>
      </Tooltip>
    )
    : (
      <Tooltip title={value}>
        <span>{value.substring(0, maxLength) + '...'}</span>
      </Tooltip>
    );
};

export default ExTooltip;
