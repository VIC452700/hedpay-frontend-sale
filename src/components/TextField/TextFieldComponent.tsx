import React, { memo } from "react";
import clsx from "clsx";
import PropTypes from "prop-types";

import styles from "./styles.module.scss";

type Props = {
  value: string;
  setValue?: Function;
  placeholder?: string;
  readonly?: boolean;
  number?: boolean;
  warned?: boolean;
};

const TextFieldComponent: React.FC<Props> = memo<Props>(
  ({ value, setValue, placeholder, readonly, number, warned }) => (
    <input
      className={clsx(styles.textFieldRoot, warned ? styles.warned : "")}
      value={value}
      onChange={(event) =>
        setValue ? setValue(number ? Number(event.target.value) : event.target.value) : ""
      }
      placeholder={placeholder}
      readOnly={readonly}
      type={number ? "number" : "text"}
    />
  )
);

TextFieldComponent.propTypes = {
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func,
  placeholder: PropTypes.string,
  readonly: PropTypes.bool,
  number: PropTypes.bool,
  warned: PropTypes.bool
};

TextFieldComponent.displayName = "TextFieldComponent";

export default TextFieldComponent;
