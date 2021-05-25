import classNames from "classnames";
import React, { FC, HTMLAttributes } from "react";

export interface CardCOntentProps extends HTMLAttributes<HTMLDivElement> {}

const CardContent: FC<CardCOntentProps> = (props) => {
  const { className, children, ...restPros } = props;
  const classes = classNames("neu-card-content", className);
  return (
    <div className={classes} {...restPros}>
      {children}
    </div>
  );
};

export default CardContent;
