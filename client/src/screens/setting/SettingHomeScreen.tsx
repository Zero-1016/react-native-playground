import {ScrollView} from 'react-native';
import styled from '@emotion/native';
import SettingItem from '@/components/setting/SettingItem';
import {colors} from '@/styles/theme/colors';
import Octicons from 'react-native-vector-icons/Octicons';
import {StackScreenProps} from '@react-navigation/stack';
import {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import {settingNavigations} from '@/constants';
import useAuth from '@/hooks/queries/useAuth';

type SettingHomeScreenProps = StackScreenProps<SettingStackParamList>;

function SettingHomeScreen({navigation}: SettingHomeScreenProps) {
  const {logoutMutation} = useAuth();
  const handlePressEditProfile = () => {
    navigation.navigate(settingNavigations.EDIT_PROFILE);
  };

  const handlePressLogout = () => {
    logoutMutation.mutate(null);
  };

  return (
    <S.Container>
      <ScrollView>
        <S.Space />
        <SettingItem title="프로필 수정" onPress={handlePressEditProfile} />
        <SettingItem title="마커 카테고리 설정" />
        <S.Space />
        <SettingItem
          title="로그아웃"
          color={colors.System.RED_500}
          onPress={handlePressLogout}
          icon={
            <Octicons name="sign-out" color={colors.System.RED_500} size={16} />
          }
        />
      </ScrollView>
    </S.Container>
  );
}

const S = {
  Container: styled.SafeAreaView`
    flex: 1;
  `,
  Space: styled.View`
    height: 30px;
  `,
};

export default SettingHomeScreen;
