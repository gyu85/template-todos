import styled from 'styled-components';
import { useThemeState } from 'context/ThemeContext';

interface PropsTextField {
  type: 'text' | 'password';
  isLabel: boolean;
  labelText?: string;
  isError: boolean;
  errorMessage: string;
  fieldValue: string;
  htmlFor?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

type ThemeProps = {
  theme: {
    borderColor: string;
    fontSize: string;
    color: string;
    errorColor: string;
  };
};

interface InputProps {
  isError: boolean;
  theme: {
    fontSize: string;
    borderColor: string;
    errorColor: string;
  };
}

const BoxField = styled.div`
  padding: 8px;
`;

const Label = styled.label`
  font-size: ${(props: ThemeProps) => props.theme.fontSize};
`;

const TextInput = styled.input<InputProps>`
  display: block;
  width: 100%;
  height: 56px;
  padding: 16px;
  margin-top: 8px;
  border: 1px solid
    ${(props: InputProps) =>
      props.isError ? props.theme.errorColor : props.theme.borderColor};
  border-radius: 4px;
  font-size: ${(props: ThemeProps) => props.theme.fontSize};
  color: ${(props: ThemeProps) => props.theme.borderColor};
  box-sizing: border-box;
`;

const TextError = styled.p`
  padding-top: 8px;
  font-size: ${(props: ThemeProps) => props.theme.fontSize};
  color: ${(props: ThemeProps) => props.theme.color};
`;

const TextField = ({
  type,
  isLabel,
  htmlFor,
  labelText,
  isError,
  errorMessage,
  fieldValue,
  onChange
}: PropsTextField) => {
  const { colors, fontSize } = useThemeState();

  return (
    <BoxField>
      {isLabel && (
        <Label
          htmlFor={htmlFor}
          theme={{ fontSize: fontSize.label.medium }}>
          {labelText}
        </Label>
      )}

      <TextInput
        type={type}
        theme={{
          borderColor: colors.neutralVariant30,
          fontSize: fontSize.body.large,
          errorColor: colors.error40
        }}
        id={htmlFor}
        name={htmlFor}
        value={fieldValue}
        isError={isError}
        onChange={onChange}
      />

      {isError && (
        <TextError
          theme={{ fontSize: fontSize.body.small, color: colors.error40 }}>
          {errorMessage}
        </TextError>
      )}
    </BoxField>
  );
};

export default TextField;
