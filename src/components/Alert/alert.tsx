import React, { useState } from "react";
import ClassNames from "classnames";

export type AlertType = "success" | "default" | "danger" | "warning";

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Title of the alert
   */
  title: string;
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
}

/**
 * Displays important alert messages.
 *
 * #Usage
 *
 * ```javascript
 * import Alert from
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
    ...restProps
  } = props;
  const [closed, setClose] = useState(false);
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
        x
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
