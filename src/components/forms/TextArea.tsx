import styled from 'styled-components';

import { useThemeState } from 'context/ThemeContext';

interface PropsTextAreaField {
  isLabel: boolean;
  labelText?: string;
  isError: boolean;
  fieldValue: string;
  htmlFor?: string;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
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

const TextAreaField = styled.textarea`
  display: block;
  width: 100%;
  height: 82px;
  padding: 16px;
  border: 1px solid ${(props: ThemeProps) => props.theme.borderColor};
  border-radius: 4px;
  font-size: ${(props: ThemeProps) => props.theme.fontSize};
  box-sizing: border-box;
  resize: none;
`;

const TextArea = ({
  isLabel,
  labelText,
  isError,
  fieldValue,
  htmlFor,
  onChange
}: PropsTextAreaField) => {
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
      <TextAreaField
        id={htmlFor}
        name={htmlFor}
        value={fieldValue}
        cols={30}
        rows={10}
        theme={{
          borderColor: colors.neutralVariant30,
          fontSize: fontSize.body.large
        }}
        onChange={onChange}
      />
    </BoxField>
  );
};

export default TextArea;
