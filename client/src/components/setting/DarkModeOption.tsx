import {CompoundOption} from '@/components/common/CompoundOption';
import {useColorScheme} from 'react-native';
import useThemeStorage from '@/hooks/useThemeStorage';

interface DarkModeOptionProps {
  isVisible: boolean;
  hideOption: () => void;
}

function DarkModeOption({hideOption, isVisible}: DarkModeOptionProps) {
  const systemDefault = useColorScheme();
  const {setMode, theme, setSystem, isSystem} = useThemeStorage();

  const handlePressLight = async () => {
    hideOption();
    await setSystem(false);
    await setMode('light');
  };
  const handlePressDark = async () => {
    hideOption();
    await setSystem(false);
    await setMode('dark');
  };
  const handlePressSystem = async () => {
    hideOption();
    await setSystem(true);
    await setMode(systemDefault ?? 'light');
  };

  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.BackGround>
        <CompoundOption.Container>
          <CompoundOption.Button
            isChecked={!isSystem && theme === 'light'}
            onPress={handlePressLight}>
            라이트 모드
          </CompoundOption.Button>
          <CompoundOption.Divider />
          <CompoundOption.Button
            isChecked={!isSystem && theme === 'dark'}
            onPress={handlePressDark}>
            다크 모드
          </CompoundOption.Button>
          <CompoundOption.Divider />
          <CompoundOption.Button
            isChecked={isSystem}
            onPress={handlePressSystem}>
            시스템 기본값 모드
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

export default DarkModeOption;
