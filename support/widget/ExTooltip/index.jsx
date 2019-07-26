import {Tooltip} from "antd";
import React from "react";

/**
 * @description
 * @author Freddie
 * @since 17/06/2019
 */

export default function ExTooltip(props) {

  const {value, maxLength = 50, mode, title} = props;

  if (value == null || value == undefined) return '--';
  if (maxLength >= value.length) return value;

  return (
    <Tooltip title={value}>
      <span>{value.substring(0, maxLength) + '...'}</span>
    </Tooltip>
  );


};
