import {StackScreenProps} from '@react-navigation/stack';
import {MapStackParamList} from '@/navigations/stack/MapStackNavigator';
import {mapNavigations} from '@/constants';
import styled from '@emotion/native';
import InputFiled from '@/components/common/InputFiled';
import Octicons from 'react-native-vector-icons/Octicons';
import {colors} from '@/styles/theme/colors';
import React, {useEffect} from 'react';
import useForm from '@/hooks/useForm';
import {getDateWithSeparator, validateAddPost} from '@/utils';
import AddPostHeaderRight from '@/components/post/AddPostHeaderRight';
import {MarkerColor} from '@/types/domain';
import useGetAddress from '@/hooks/queries/useGetAddress';
import MarkerSelector from '@/components/post/MarkerSelector';
import ScoreInput from '@/components/post/ScoreInput';
import DatePickerOptions from '@/components/post/DatePickerOptions';
import useModal from '@/hooks/useModal';
import ImageInput from '@/components/post/ImageInput';
import usePermission from '@/hooks/usePermission';
import useImagePicker from '@/hooks/useImagePicker';
import PreviewImageList from '@/components/common/PreviewImageList';
import {TextInput} from 'react-native';
import useMutateCreatePost from '@/hooks/queries/useMutateCreatePost';
import CustomButton from '@/components/common/CustomButton';

type AddPostScreenProps = StackScreenProps<
  MapStackParamList,
  typeof mapNavigations.ADD_POST
>;

function AddPostScreen({route, navigation}: AddPostScreenProps) {
  const {location} = route.params;

  const descriptionRef = React.useRef<TextInput>(null);
  const createPost = useMutateCreatePost();
  const [date, setDate] = React.useState(new Date());
  const {isVisible, show, hide} = useModal();
  const [isPicked, setIsPicked] = React.useState<boolean>(false);
  usePermission('PHOTO');

  const addPost = useForm({
    initialValue: {title: '', description: ''},
    validate: validateAddPost,
  });

  const imagePicker = useImagePicker({initialImages: []});

  const [markerColor, setMarkerColor] = React.useState<MarkerColor>('RED');
  const [score, setScore] = React.useState<number>(5);
  const address = useGetAddress(location);
  const handleSubmit = () => {
    const body = {
      date,
      title: addPost.values.title,
      description: addPost.values.description,
      color: markerColor,
      score,
      imageUris: imagePicker.imageUris,
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
                color={colors.Grayscale.GRAY_500}
              />
            }
          />
          <CustomButton
            label={isPicked ? getDateWithSeparator(date, '. ') : '날짜 선택'}
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

export default AddPostScreen;
