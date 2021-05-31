import React, { useState } from "react";
import ClassNames from "classnames";
import { CSSTransition } from "react-transition-group";
import Icon from "../Icon";
export type AlertType = "success" | "default" | "danger" | "warning";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Title of the alert
   */
  title: string;
  showInStart?: boolean;
  classNames?: string;
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
    classNames,
    transitionClass = "neu-alert",
    timeout = 0,
    showInStart = true,

    ...restProps
  } = props;
  const [closed, setClose] = useState(!showInStart);
  const classes = ClassNames("alert", classNames, {
    [`alert-${type}`]: type,
  });

  const closeButton = () => {
    return closable ? (
      <button
        onClick={() => {
          onClose && onClose();
          setClose(true);
        }}
      >
        <Icon icon="times"></Icon>
      </button>
    ) : null;
  };

  return (
    <CSSTransition
      timeout={timeout}
      in={!closed}
      classNames={transitionClass}
      unmountOnExit
    >
      <div className={classes} {...restProps}>
        <div className="content">
          <span className={description ? "bold-title" : ""}>{title}</span>
          {description ? <p className="alert-desc">{description}</p> : null}
        </div>
        {closeButton()}
      </div>
    </CSSTransition>
  );
};

Alert.defaultProps = {
  type: "default",
  closable: true,
};

export default Alert;
