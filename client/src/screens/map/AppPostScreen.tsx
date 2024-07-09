import {StackScreenProps} from '@react-navigation/stack';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {mapNavigations, navigations} from '@/constants';
import styled from '@emotion/native';
import InputFiled from '@/components/InputFiled';
import Octicons from 'react-native-vector-icons/Octicons';
import {colors} from '@/styles/theme/colors';
import CustomButton from '@/components/CustomButton';
import React, {useEffect} from 'react';
import useForm from '@/hooks/useForm';
import {validateAddPost} from '@/utils';
import AddPostHeaderRight from '@/components/AddPostHeaderRight';
import {useMutateCreatePost} from '@/hooks/queries/useMutateCreatePost';
import {MarkerColor} from '@/types/domain';
import {TextInput} from 'react-native';
import useGetAddress from '@/hooks/queries/useGetAddress';
import MarkerSelector from '@/components/MarkerSelector';
import ScoreInput from '@/components/ScoreInput';

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>;

function AddPostScreen({route, navigation}: AddPostScreenProps) {
  const {location} = route.params;

  const descriptionRef = React.useRef<TextInput>(null);
  const createPost = useMutateCreatePost();
  const addPost = useForm({
    initialValue: {title: '', description: ''},
    validate: validateAddPost,
  });

  const [markerColor, setMarkerColor] = React.useState<MarkerColor>('RED');
  const [score, setScore] = React.useState<number>(5);
  const address = useGetAddress(location);
  const handleSubmit = () => {
    const body = {
      title: addPost.values.title,
      date: new Date(),
      description: addPost.values.description,
      score,
      color: markerColor,
      imageUris: [],
    };
    createPost.mutate(
      {
        address,
        ...location,
        ...body,
      },
      {
        onSuccess: () => navigation.goBack(),
      },
    );
  };

  const handleSelectMarker = (color: MarkerColor) => {
    setMarkerColor(color);
  };

  const handleChangeScore = (score: number) => {
    setScore(score);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => AddPostHeaderRight(handleSubmit),
    });
  });

  return (
    <S.Container>
      <S.ScrollView>
        <S.InputContainer>
          <InputFiled
            value={address}
            disabled
            icon={
              <Octicons
                name="location"
                size={16}
                color={colors.Grayscale.GRAY_500}
              />
            }
          />
          <CustomButton label="날짜 선택" size="large" variant="outlined" />
          <InputFiled
            placeholder="제목을 입력하세요"
            error={addPost.errors.title}
            touched={addPost.touched.title}
            blurOnSubmit={false}
            returnKeyType="next"
            onSubmitEditing={() => descriptionRef.current?.focus()}
            {...addPost.getTextInputProps('title')}
          />
          <InputFiled
            ref={descriptionRef}
            placeholder="기록하고 싶은 내용을 입력하세요. (선택)"
            error={addPost.errors.description}
            touched={addPost.touched.description}
            multiline
            returnKeyType="next"
            {...addPost.getTextInputProps('description')}
          />
          <MarkerSelector
            score={score}
            markerColor={markerColor}
            onPressMarker={handleSelectMarker}
          />
          <ScoreInput score={score} onChangeScore={handleChangeScore} />
        </S.InputContainer>
      </S.ScrollView>
    </S.Container>
  );
}

const S = {
  Container: styled.SafeAreaView`
    flex: 1;
  `,
  ScrollView: styled.ScrollView`
    flex: 1;
    padding: 20px;
    margin-bottom: 20px;
  `,
  InputContainer: styled.View`
    gap: 20px;
    margin-bottom: 20px;
  `,
};

export default AddPostScreen;
