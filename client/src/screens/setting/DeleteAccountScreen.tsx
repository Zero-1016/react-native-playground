import useAuth from '@/hooks/queries/useAuth';
import styled from '@emotion/native';
import CustomButton from '@/components/common/CustomButton';
import {Alert} from 'react-native';
import {alerts} from '@/constants';
import Toast from 'react-native-toast-message';

function DeleteAccountScreen() {
  const {deleteAccountMutation} = useAuth();

  const handlePressDeleteAccount = () => {
    Alert.alert(
      alerts.DELETE_ACCOUNT.TITLE,
      alerts.DELETE_ACCOUNT.DESCRIPTION,
      [
        {
          text: '탈퇴',
          onPress: () =>
            deleteAccountMutation.mutate(null, {
              onSuccess: () => {
                Toast.show({
                  type: 'success',
                  text1: '회원탈퇴가 완료되었습니다',
                  position: 'bottom',
                });
              },
              onError: () => {
                Toast.show({
                  type: 'error',
                  text1: '회원탈퇴에 실패했습니다',
                  position: 'bottom',
                });
              },
            }),
        },
        {
          text: '취소',
          style: 'cancel',
        },
      ],
    );
  };
  return (
    <S.Container>
      <S.InfoContainer>
        <S.InfoText>
          저장된 데이터를 모두 삭제해야 회원탈퇴가 가능해요.
        </S.InfoText>
        <S.InfoText>저장된 장소가 남아있다면 삭제해주세요</S.InfoText>
      </S.InfoContainer>
      <CustomButton label="회원탈퇴" onPress={handlePressDeleteAccount} />
    </S.Container>
  );
}

const S = {
  Container: styled.View`
    flex: 1;
    padding: 20px;
    margin-bottom: 20px;
  `,
  InfoContainer: styled.View`
    align-items: center;
    margin-top: 10px;
    margin-bottom: 30px;
    border-width: 1px;
    border-color: ${props => props.theme.colors.PINK_700};
    border-radius: 3px;
    padding: 10px;
    gap: 10px;
  `,
  InfoText: styled.Text`
    color: ${props => props.theme.colors.PINK_700};
    font-size: 15px;
    font-weight: 600;
  `,
};

export default DeleteAccountScreen;
