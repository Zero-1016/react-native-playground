import useAuth from '@/hooks/queries/useAuth';
import styled from '@emotion/native';
import {colorHex} from '@/styles/theme/colors';
import {MarkerColor} from '@/types/domain';
import InputField from '@/components/common/InputFiled';
import useForm from '@/hooks/useForm';
import {validateCategory} from '@/utils';
import {useEffect, useRef} from 'react';
import {TextInput} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {SettingStackParamList} from '@/navigations/stack/SettingStackNavigator';
import EditCategoryHeaderRight from '@/components/setting/EditCategoryHeaderRight';

const categoryList: MarkerColor[] = [
  'RED',
  'YELLOW',
  'GREEN',
  'BLUE',
  'PURPLE',
];

const categoryPlaceHolderList = [
  'ex) 식당',
  'ex) 카페',
  'ex) 병원',
  'ex) 숙소',
  'ex) 여행',
];

type Navigation = StackScreenProps<SettingStackParamList>;

function EditCategoryScreen({navigation}: Navigation) {
  const refArray = useRef<(TextInput | null)[]>([]);
  const {getProfileQuery, categoryMutation} = useAuth();
  const {categories} = getProfileQuery.data || {};

  const category = useForm({
    initialValue: {
      RED: categories?.RED ?? '',
      YELLOW: categories?.YELLOW ?? '',
      GREEN: categories?.GREEN ?? '',
      BLUE: categories?.BLUE ?? '',
      PURPLE: categories?.PURPLE ?? '',
    },
    validate: validateCategory,
  });

  useEffect(() => {
    const handleSubmit = () => {
      categoryMutation.mutate(category.values);
    };
    navigation.setOptions({
      headerRight: () => EditCategoryHeaderRight(handleSubmit),
    });
  }, [category.values, categoryMutation, navigation]);

  return (
    <S.Container>
      <S.ContentContainer scrollIndicatorInsets={{right: 1}}>
        <S.InfoContainer>
          <S.InfoText>마커 색상의 카테고리를 설정해주세요.</S.InfoText>
          <S.InfoText>마커 필터링, 범례 표시에 설정 할 수 있습니다.</S.InfoText>
        </S.InfoContainer>
        <S.FormContainer>
          {categoryList.map((color, index) => {
            return (
              <S.CategoryContainer key={index}>
                <S.Category $backgroundColor={colorHex[color]} />
                <S.InputContainer>
                  <InputField
                    ref={() => refArray.current[index]}
                    touched={category.touched[color]}
                    error={category.errors[color]}
                    placeholder={categoryPlaceHolderList[index]}
                    autoFocus={color === 'RED'}
                    maxLength={10}
                    returnKeyType={'next'}
                    blurOnSubmit={false}
                    onSubmitEditing={() => refArray.current[index + 1]?.focus()}
                    {...category.getTextInputProps(color)}
                  />
                </S.InputContainer>
              </S.CategoryContainer>
            );
          })}
        </S.FormContainer>
      </S.ContentContainer>
    </S.Container>
  );
}

const S = {
  Container: styled.SafeAreaView`
    flex: 1;
  `,
  ContentContainer: styled.ScrollView`
    padding: 20px;
    margin-bottom: 10px;
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
  FormContainer: styled.View`
    gap: 15px;
  `,
  CategoryContainer: styled.View`
    flex-direction: row;
    align-items: center;
    gap: 20px;
  `,
  Category: styled.View<{$backgroundColor: string}>`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: ${({$backgroundColor}) => $backgroundColor};
  `,
  InputContainer: styled.View`
    flex: 1;
  `,
};

export default EditCategoryScreen;
