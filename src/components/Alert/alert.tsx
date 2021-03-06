import React, { useState } from "react";
import ClassNames from "classnames";
import Icon from "../Icon";
export type AlertType = "success" | "default" | "danger" | "warning";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Title of the alert
   */
  title: string;
  showInStart?: boolean;
  className?: string;
  /**
   * Different types
   */
  type?: AlertType;
  /**
   * Fires when alert is closed
   */
  onClose?: () => void;
  /**
   * If closable or not
   */
  closable?: boolean;
  /**
   * Descriptive text.
   */
  description?: string;
  /**
   * The duration of the transition.
   */
  timeout?: number;
  /**
   * Class for transtion.
   */
  transitionClass?: string;
}

/**
 * Displays important alert messages.
 *
 * #Usage
 *
 * ```javascript
 * import Alert from "collin-ui"
 * ```
 */
export const Alert: React.FC<AlertProps> = (props) => {
  const {
    title,
    type,
    onClose,
    closable,
    description,
    className,
    ...restProps
  } = props;
  const [closed, setClose] = useState(false);
  const classes = ClassNames("alert", className, {
    [`alert-${type}`]: type,
  });

  const closeButton = () => {
    return closable ? (
      <button
        onClick={() => {
          setClose(true);
          onClose && onClose();
        }}
      >
        <Icon icon="times"></Icon>
      </button>
    ) : null;
  };

  return closed ? null : (
    <div className={classes} {...restProps}>
      <div className="content">
        <span className={description ? "bold-title" : ""}>{title}</span>
        {description ? <p className="alert-desc">{description}</p> : null}
      </div>
      {closeButton()}
    </div>
  );
};

Alert.defaultProps = {
  type: "default",
  closable: true,
};

export default Alert;
