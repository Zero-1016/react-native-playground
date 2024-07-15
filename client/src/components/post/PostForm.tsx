import React, {useEffect, useRef, useState} from 'react';
import {TextInput} from 'react-native';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';
import useModal from '@/hooks/useModal';
import usePermission from '@/hooks/usePermission';
import useForm from '@/hooks/useForm';
import {getDateWithSeparator, validateAddPost} from '@/utils';
import useImagePicker from '@/hooks/useImagePicker';
import {MarkerColor} from '@/types/domain';
import useGetAddress from '@/hooks/queries/useGetAddress';
import AddPostHeaderRight from '@/components/post/AddPostHeaderRight';
import InputFiled from '@/components/common/InputFiled';
import Octicons from 'react-native-vector-icons/Octicons';
import CustomButton from '@/components/common/CustomButton';
import MarkerSelector from '@/components/post/MarkerSelector';
import ScoreInput from '@/components/post/ScoreInput';
import ImageInput from '@/components/post/ImageInput';
import PreviewImageList from '@/components/common/PreviewImageList';
import DatePickerOptions from '@/components/post/DatePickerOptions';
import styled from '@emotion/native';
import {LatLng} from 'react-native-maps';
import {useNavigation} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import useDetailStore from '@/store/useDetailStore';
import useMutateUpdatePost from '@/hooks/queries/useMutateUpdatePost';
import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/styles/theme/colors';

interface PostFormProps {
  location: LatLng;
  isEdit?: boolean;
}

function PostForm({location, isEdit = false}: PostFormProps) {
  const navigation = useNavigation<StackNavigationProp<FeedStackParamList>>();
  const descriptionRef = useRef<TextInput>(null);
  const createPost = useMutateCreatePost();
  const updatePost = useMutateUpdatePost();
  const {isVisible, show, hide} = useModal();
  const [isPicked, setIsPicked] = useState<boolean>(false);
  const {detailPost} = useDetailStore();
  const isEditMode = isEdit && detailPost;
  usePermission('PHOTO');
  const addPost = useForm({
    initialValue: {
      title: isEditMode ? detailPost?.title : '',
      description: isEditMode ? detailPost?.description : '',
    },
    validate: validateAddPost,
  });

  const [date, setDate] = useState(() =>
    isEditMode ? new Date(detailPost?.date) : new Date(),
  );

  const [score, setScore] = useState<number>(() =>
    isEditMode ? detailPost?.score : 5,
  );

  const imagePicker = useImagePicker({
    initialImages: isEditMode ? detailPost?.images : [],
  });
  const [markerColor, setMarkerColor] = useState<MarkerColor>('RED');
  const address = useGetAddress(location);
  const {theme} = useThemeStore();

  const handleSubmit = () => {
    const body = {
      date,
      title: addPost.values.title,
      description: addPost.values.description,
      color: markerColor,
      score,
      imageUris: imagePicker.imageUris,
    };

    if (isEditMode) {
      updatePost.mutate(
        {
          id: detailPost?.id,
          body,
        },
        {
          onSuccess: () => navigation.goBack(),
        },
      );
      return;
    }

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

  const handleChangeScore = (newScore: number) => {
    setScore(newScore);
  };

  const handleChangeDate = (newDate: Date) => {
    setDate(newDate);
  };

  const handleConfirmDate = () => {
    setIsPicked(true);
    hide();
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
                color={colors[theme].GRAY_500}
              />
            }
          />
          <CustomButton
            label={
              isPicked || isEdit
                ? getDateWithSeparator(date, '. ')
                : '날짜 선택'
            }
            size="large"
            variant="outlined"
            onPress={show}
          />
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
          <S.ImagesViewer>
            <ImageInput onChange={imagePicker.handleChange} />
            <PreviewImageList
              showOption={true}
              imageUris={imagePicker.imageUris}
              onDelete={imagePicker.delete}
              onChangeOrder={imagePicker.changeOrder}
            />
          </S.ImagesViewer>
          <DatePickerOptions
            isVisible={isVisible}
            date={date}
            onChangeDate={handleChangeDate}
            onConfirmDate={handleConfirmDate}
          />
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
  ImagesViewer: styled.View`
    flex-direction: row;
  `,
};

export default PostForm;
