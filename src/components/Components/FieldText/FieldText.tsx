import React, { ChangeEvent, FC } from "react";
import { Field, HelperMessage } from "@atlaskit/form";
import TextField from "@atlaskit/textfield";
import { css } from "@emotion/css";

interface Props {
  label: string;
  name: string;
  placeholder?: string;
  helperMessage?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const FieldText: FC<Props> = (props) => {
  const { label, name, placeholder, helperMessage, onChange, value } = props;

  return (
    <Field name={name} label={label}>
      {({ fieldProps }) => (
        <>
          <TextField label="" placeholder={placeholder} {...fieldProps} value={value} onChange={onChange} />
          {helperMessage && <HelperMessage>{helperMessage}</HelperMessage>}
        </>
      )}
    </Field>
  );
};
export default FieldText;
