import {CompoundOption} from '@/components/common/CompoundOption';
import {useColorScheme} from 'react-native';
import useThemeStorage from '@/hooks/useThemeStorage';
import useLegendStorage from '@/hooks/useLegendStorage';

interface MapLegendOptionProps {
  isVisible: boolean;
  hideOption: () => void;
}

function MapLegendOption({hideOption, isVisible}: MapLegendOptionProps) {
  const {isVisible: isVisibleLegend, set} = useLegendStorage();

  const handlePressShow = async () => {
    hideOption();
    await set(true);
  };
  const handlePressHide = async () => {
    hideOption();
    await set(false);
  };

  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.BackGround>
        <CompoundOption.Container>
          <CompoundOption.Button
            isChecked={isVisibleLegend}
            onPress={handlePressShow}>
            표시하기
          </CompoundOption.Button>
          <CompoundOption.Divider />
          <CompoundOption.Button
            isChecked={!isVisibleLegend}
            onPress={handlePressHide}>
            숨기기
          </CompoundOption.Button>
        </CompoundOption.Container>

        <CompoundOption.Container>
          <CompoundOption.Button onPress={hideOption}>
            취소
          </CompoundOption.Button>
        </CompoundOption.Container>
      </CompoundOption.BackGround>
    </CompoundOption>
  );
}

export default MapLegendOption;
