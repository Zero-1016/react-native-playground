import styled from '@emotion/native';
import {colors} from '@/styles/theme/colors';
import {TextInputProps} from 'react-native';

interface SearchInputProps extends TextInputProps {
  onSubmit: () => void;
}

function SearchInput({onSubmit, ...props}: SearchInputProps) {
  return (
    <S.Container>
      <S.Input
        autoCapitalize="none"
        placeholderTextColor={colors.Grayscale.GRAY_500}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
        clearButtonMode="while-editing"
        {...props}
      />
    </S.Container>
  );
}

const S = {
  Container: styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    border-width: 1px;
    border-color: ${colors.Grayscale.GRAY_200};
    padding: 8px 10px;
    border-radius: 5px;
  `,
  Input: styled.TextInput`
    flex: 1px;
    font-size: 16px;
    padding: 0;
    color: ${colors.Grayscale.BLACK};
  `,
};

export default SearchInput;
