import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import styled from '@emotion/native';
import {colors} from '@/styles/theme/colors';
import useAuth from '@/hooks/queries/useAuth';
import {Text} from 'react-native';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const {getProfileQuery} = useAuth();
  const {email, nickname, imageUri, kakaoImageUri} = getProfileQuery.data || {};
  const {logoutMutation} = useAuth();
  const handleLogout = () => {
    logoutMutation.mutate(null);
  };

  return (
    <S.SafeAreaView>
      <DrawerContentScrollView
        {...props}
        scrollEnabled={false}
        contentContainerStyle={{backgroundColor: colors.Grayscale.WHITE}}>
        <S.UserInfoContainer>
          <S.ImageView>
            {imageUri === null && kakaoImageUri === null && (
              <S.Image source={require('@/assets/user-default.png')} />
            )}
            {imageUri === null && !!kakaoImageUri && (
              <S.Image source={{uri: kakaoImageUri}} />
            )}
            {imageUri !== null && <S.Image source={{uri: imageUri}} />}
          </S.ImageView>
          <S.NameText>{nickname ?? email}</S.NameText>
        </S.UserInfoContainer>
        <DrawerItemList {...props} />
        <S.LogoutButton onPress={handleLogout}>
          <Text>로그아웃</Text>
        </S.LogoutButton>
      </DrawerContentScrollView>
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
  LogoutButton: styled.Pressable`
    align-items: flex-end;
    padding: 10px;
  `,
};

export default CustomDrawerContent;
