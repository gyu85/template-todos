import styled from 'styled-components';
import { useThemeState } from 'context/ThemeContext';

interface PropsTextField {
  type: 'text' | 'password';
  isLabel: boolean;
  labelText?: string;
  isError: boolean;
  fieldValue: string;
  htmlFor?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

type ThemeProps = {
  theme: {
    fontSize: string;
    borderColor: string;
  };
};

const BoxField = styled.div`
  padding: 8px;
`;

const Label = styled.label`
  font-size: ${(props: ThemeProps) => props.theme.fontSize};
`;

const TextInput = styled.input`
  display: block;
  width: 100%;
  height: 56px;
  padding: 16px;
  margin-top: 8px;
  border: 1px solid #79747e;
  border-radius: 4px;
  font-size: ${(props: ThemeProps) => props.theme.fontSize};
  color: ${(props: ThemeProps) => props.theme.borderColor};
  box-sizing: border-box;
`;

const TextField = ({
  type,
  isLabel,
  htmlFor,
  labelText,
  isError,
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
          fontSize: fontSize.body.large
        }}
        id={htmlFor}
        name={htmlFor}
        value={fieldValue}
        onChange={onChange}
      />
    </BoxField>
  );
};

export default TextField;
