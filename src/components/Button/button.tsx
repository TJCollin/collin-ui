import React from "react";
import ClassNames from "classnames";

export type ButtonSize = "lg" | "sm";

export type ButtonType = "link" | "primary" | "default" | "danger";

interface BaseButtonProps {
  className?: string;
  size?: ButtonSize;
  disabled?: boolean;
  btnType?: ButtonType;
  colored?: boolean;
  children?: React.ReactNode;
  href?: string;
}

type NativeButtonProps = BaseButtonProps &
  React.ButtonHTMLAttributes<HTMLElement>;
type AnchorButtonProps = BaseButtonProps &
  React.AnchorHTMLAttributes<HTMLElement>;

// 需要取出其中所有的props赋给button或者a
// 如果使用 | 而不是 & 会出现无法兼容的情况，因为这样ButtonProps可以是AnchorButtonProps，但最终被赋值给button
// 源码中使用Partial<NativeButtonProps & AnchorButtonProps>，Partial将必选项均变成可选项
// 来避免两者中有必选项，但被赋值的类型可以没有该属性
// 但我发现NativeButtonProps AnchorButtonProps只有可选属性，不需要用Partial
export type ButtonProps = NativeButtonProps & AnchorButtonProps;

/**
 * Commonly used buttons.
 *
 * ```javascript
 * import {Button} from "collin-ui"
 * ```
 *
 */
export const Button: React.FC<ButtonProps> = (props) => {
  const {
    className,
    size,
    btnType = "default",
    disabled,
    children,
    colored,
    href = "",

    ...restProps
  } = props;

  const classes = ClassNames(
    "btn",
    {
      [`btn-${btnType}`]: btnType,
      [`btn-${size}`]: size,
      // link类型的按钮没有disabled属性，其他都有
      disabled: btnType === "link" && disabled,
      colored: colored,
    },
    className
  );

  if (btnType === "link" && href) {
    return (
      <a className={classes} href={href} {...restProps}>
        {children}
      </a>
    );
  } else {
    return (
      <button className={classes} disabled={disabled} {...restProps}>
        {children}
      </button>
    );
  }
};

export default Button;
