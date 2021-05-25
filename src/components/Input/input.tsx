import React, { InputHTMLAttributes } from "react";
import ClassNames from "classnames";
import Icon from "../Icon/icon";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

type InputSize = "lg" | "sm";
export interface InputProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  size?: InputSize;
  icon?: IconProp;
  /**
   * Prepend  an element, generally a label or a button.<br>
   * `prepend` attribute accepts string or a ReactElement.
   */
  prepend?: string | React.ReactElement;
  /**
   * Append  an element.<br>
   */
  append?: string | React.ReactElement;
}

/**
 * Commonly used input.<br>
 * To add icons in Input, you can simply use `icon` attributes;<br>
 * Use `prepend` or `append` to distribute elements that prepend or append to Input.
 *
 * ```javascript
 * import {Input} from "collin-ui"
 * ```
 */
export const Input: React.FC<InputProps> = (props) => {
  const {
    disabled,
    size,
    icon,
    prepend,
    append,
    className,
    ...restProps
  } = props;
  const classes = ClassNames(
    "input",
    "input-outer-wrapper",
    {
      [`input-${size}`]: size,
      "input-with-prepend": prepend,
      "input-with-icon": icon,
      "input-with-append": append,
      "input-disabled": disabled,
    },
    className
  );
  if ("value" in props) {
    delete restProps.defaultValue;
    restProps.value = restProps.value || "";
  }

  return (
    <div className={classes}>
      {prepend && <div className="prepend-wrapper">{prepend}</div>}
      <div className="input-icon-wrapper">
        <input disabled={disabled} {...restProps} />
        {icon && (
          <div className="icon-wrapper">
            <Icon icon={icon}></Icon>
          </div>
        )}
      </div>

      {append && <div className="append-wrapper">{append}</div>}
    </div>
  );
};

export default Input;
