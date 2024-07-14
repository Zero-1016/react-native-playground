import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import styled from '@emotion/native';
import {colors} from '@/styles/theme/colors';
import useAuth from '@/hooks/queries/useAuth';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {mainNavigations, settingNavigations} from '@/constants';
import {Platform} from 'react-native';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const {getProfileQuery} = useAuth();
  const {email, nickname, imageUri, kakaoImageUri} = getProfileQuery.data || {};
  const handlePressSetting = () => {
    props.navigation.navigate(mainNavigations.SETTING, {
      screen: settingNavigations.SETTING_HOME,
    });
  };

  return (
    <S.SafeAreaView>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{backgroundColor: colors.Grayscale.WHITE}}>
        <S.UserInfoContainer>
          <S.ImageView>
            {imageUri === null && !!kakaoImageUri && (
              <S.Image source={require('@/assets/user-default.png')} />
            )}
            {imageUri === null && !!kakaoImageUri && (
              <S.Image
                source={{
                  uri: `${
                    Platform.OS === 'ios'
                      ? 'http://localhost:3030/'
                      : 'http://10.0.2.2:3030/'
                  }${kakaoImageUri}`,
                }}
              />
            )}
            {imageUri !== null && (
              <S.Image
                source={{
                  uri: `${
                    Platform.OS === 'ios'
                      ? 'http://localhost:3030/'
                      : 'http://10.0.2.2:3030/'
                  }${imageUri}`,
                }}
              />
            )}
          </S.ImageView>
          <S.NameText>{nickname ?? email}</S.NameText>
        </S.UserInfoContainer>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <S.BottomContainer>
        <S.BottomMenu onPress={handlePressSetting}>
          <MaterialIcons
            name="settings"
            size={18}
            color={colors.Grayscale.GRAY_700}
          />
          <S.BottomMenuText>설정</S.BottomMenuText>
        </S.BottomMenu>
      </S.BottomContainer>
    </S.SafeAreaView>
  );
}

const S = {
  SafeAreaView: styled.SafeAreaView`
    flex: 1;
  `,
  ImageView: styled.View`
    width: 70px;
    height: 70px;
    border-radius: 35px;
    margin-bottom: 10px;
  `,
  Image: styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 35px;
  `,
  UserInfoContainer: styled.View`
    align-items: center;
    margin: 15px 15px 30px 15px;
  `,
  NameText: styled.Text`
    color: ${colors.Grayscale.BLACK};
  `,
  BottomContainer: styled.View`
    flex-direction: row;
    justify-content: flex-end;
    padding: 15px 20px;
    border-top-width: 1px;
    border-top-color: ${colors.Grayscale.GRAY_200};
  `,
  BottomMenu: styled.Pressable`
    flex-direction: row;
    align-items: center;
    gap: 5px;
  `,
  BottomMenuText: styled.Text`
    font-weight: 600;
    font-size: 15px;
    color: ${colors.Grayscale.GRAY_700};
  `,
};

export default CustomDrawerContent;
