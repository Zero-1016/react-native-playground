import Slider from '@react-native-community/slider';
import styled from '@emotion/native';
import {colors, lightColors} from '@/styles/theme/colors';
import useThemeStore from '@/store/useThemeStore';

interface ScoreInputProps {
  score: number;
  onChangeScore: (score: number) => void;
}

function ScoreInput({score, onChangeScore}: ScoreInputProps) {
  const {theme} = useThemeStore();
  return (
    <S.Container>
      <S.LabelContainer>
        <S.LabelText>평점</S.LabelText>
        <S.LabelText>{score}점</S.LabelText>
      </S.LabelContainer>
      <Slider
        value={score}
        onValueChange={onChangeScore}
        step={1}
        minimumValue={1}
        maximumValue={5}
        minimumTrackTintColor={lightColors.PINK_700}
        maximumTrackTintColor={colors[theme].GRAY_300}
        thumbTintColor={colors[theme].GRAY_100}
      />
    </S.Container>
  );
}

const S = {
  Container: styled.View`
    flex: 1;
    padding: 15px;
    border-width: 1px;
    border-color: ${props => props.theme.colors.GRAY_200};
  `,
  LabelContainer: styled.View`
    flex-direction: row;
    justify-content: space-between;
  `,
  LabelText: styled.Text`
    color: ${props => props.theme.colors.GRAY_700};
  `,
};

export default ScoreInput;
