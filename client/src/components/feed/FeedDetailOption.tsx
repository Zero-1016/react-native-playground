import {CompoundOption} from '@/components/common/CompoundOption';
import useMutateDeletePost from '@/hooks/queries/useMutateDeletePost';
import useDetailStore from '@/store/useDetailStore';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {Alert} from 'react-native';
import {alerts} from '@/constants';

interface FeedDetailOptionProps {
  isVisible: boolean;
  hideOption: () => void;
}

function FeedDetailOption({hideOption, isVisible}: FeedDetailOptionProps) {
  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();
  const deletePost = useMutateDeletePost();
  const {detailPost} = useDetailStore();

  const handleDeletePost = () => {
    if (!detailPost) {
      return;
    }
    Alert.alert(alerts.DELETE_POST.TITLE, alerts.DELETE_POST.DESCRIPTION, [
      {
        text: '삭제',
        onPress: () =>
          deletePost.mutate(detailPost.id, {
            onSuccess: () => {
              hideOption();
              navigation.goBack();
            },
          }),
        style: 'destructive',
      },
      {text: '취소', style: 'cancel'},
    ]);
  };

  const handleEditPost = () => {
    if (!detailPost) {
      return;
    }
    navigation.navigate('EditPost', {
      location: {
        latitude: detailPost.latitude,
        longitude: detailPost.longitude,
      },
    });
    hideOption();
  };

  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.BackGround>
        <CompoundOption.Container>
          <CompoundOption.Button isDanger onPress={handleDeletePost}>
            삭제하기
          </CompoundOption.Button>
          <CompoundOption.Divider />
          <CompoundOption.Button onPress={handleEditPost}>
            수정하기
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

export default FeedDetailOption;
