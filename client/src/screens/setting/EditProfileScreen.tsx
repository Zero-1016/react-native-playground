import {Keyboard, Platform} from 'react-native';
import styled from '@emotion/native';
import useAuth from '@/hooks/queries/useAuth';
import useForm from '@/hooks/useForm';
import {validateEditProfile} from '@/utils';
import InputField from '@/components/common/InputFiled';
import useImagePicker from '@/hooks/useImagePicker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {colors} from '@/styles/theme/colors';
import EditProfileImageOption from '@/components/setting/EditProfileImageOption';
import useModal from '@/hooks/useModal';
import {StackScreenProps} from '@react-navigation/stack';
import {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import {useEffect} from 'react';
import EditProfileHeaderRight from '@/components/setting/EditProfileHeaderRight';
import Toast from 'react-native-toast-message';
import {errorMessages, settingNavigations} from '@/constants';

type EditProfileScreenProps = StackScreenProps<SettingStackParamList>;

function EditProfileScreen({navigation}: EditProfileScreenProps) {
  const {getProfileQuery, profileMutation} = useAuth();

  const {nickname, imageUri, kakaoImageUri} = getProfileQuery.data || {};

  const editProfile = useForm({
    initialValue: {nickname: nickname ?? ''},
    validate: validateEditProfile,
  });

  const imagePicker = useImagePicker({
    initialImages: imageUri ? [{uri: imageUri}] : [],
    mode: 'single',
    onSettled: () => {
      imageOption.hide();
    },
  });

  const imageOption = useModal();

  const handlePressImage = () => {
    imageOption.show();
    Keyboard.dismiss();
  };

  useEffect(() => {
    const handleSubmit = () => {
      const body = {
        ...editProfile.values,
        imageUri: imagePicker.imageUris[0].uri,
      };
      profileMutation.mutate(body, {
        onError: error =>
          Toast.show({
            type: 'error',
            text1:
              error.response?.data.message || errorMessages.UNEXPECTED_ERROR,
            position: 'bottom',
          }),
      });
    };
    navigation.setOptions({
      headerRight: () => EditProfileHeaderRight(handleSubmit),
    });
  }, [editProfile.values, imagePicker.imageUris, navigation, profileMutation]);

  return (
    <S.Container>
      <S.ProfileContainer>
        <S.ImageContainer onPress={handlePressImage}>
          {imagePicker.imageUris.length === 0 && !kakaoImageUri && (
            <Ionicons
              name="camera-outline"
              size={30}
              color={colors.Grayscale.GRAY_500}
            />
          )}
          {imagePicker.imageUris.length === 0 && kakaoImageUri && (
            <>
              <S.Image
                source={{
                  uri: `${
                    Platform.OS === 'ios'
                      ? 'http://localhost:3030/'
                      : 'http://10.0.2.2:3030/'
                  }${kakaoImageUri}`,
                }}
              />
            </>
          )}
          {imagePicker.imageUris.length > 0 && (
            <>
              <S.Image
                source={{
                  uri: `${
                    Platform.OS === 'ios'
                      ? 'http://localhost:3030/'
                      : 'http://10.0.2.2:3030/'
                  }${imagePicker.imageUris[0].uri}`,
                }}
              />
            </>
          )}
        </S.ImageContainer>
      </S.ProfileContainer>

      <InputField
        error={editProfile.errors.nickname}
        touched={editProfile.touched.nickname}
        placeholder="닉네임을 입력해주세요."
        {...editProfile.getTextInputProps('nickname')}
      />

      <S.DeleteAccountContainer
        onPress={() => navigation.navigate(settingNavigations.DELETE_ACCOUNT)}>
        <Ionicons
          name="remove-circle-outline"
          size={18}
          color={colors.System.RED_500}
        />
        <S.DeleteAccountText>회원 탈퇴</S.DeleteAccountText>
      </S.DeleteAccountContainer>

      <EditProfileImageOption
        isVisible={imageOption.isVisible}
        hideOption={imageOption.hide}
        onChangeImage={imagePicker.handleChange}
      />
    </S.Container>
  );
}

const S = {
  Container: styled.View`
    flex: 1;
    padding: 20px;
  `,
  ProfileContainer: styled.View`
    align-items: center;
    margin-top: 20px;
    margin-bottom: 40px;
  `,
  Image: styled.Image`
    width: 100%;
    height: 100%;
    border-radius: 50px;
  `,
  ImageContainer: styled.Pressable`
    width: 100px;
    height: 100px;

    justify-content: center;
    align-items: center;
    border-color: ${colors.Grayscale.GRAY_200};
    border-radius: 50px;
    border-width: 1px;
  `,
  DeleteAccountContainer: styled.Pressable`
    position: absolute;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 5px;
    right: 20px;
    bottom: 70px;
    background-color: ${colors.Grayscale.GRAY_100};
    border-radius: 10px;
    padding: 10px;
  `,
  DeleteAccountText: styled.Text`
    color: ${colors.System.RED_500};
    font-size: 15px;
  `,
};

export default EditProfileScreen;
