import {Platform, Pressable, ScrollView} from 'react-native';
import React from 'react';
import styled from '@emotion/native';
import {ImageUri} from '@/types/domain';
import {colors} from '@/styles/theme/colors';
import IonicIcons from 'react-native-vector-icons/Ionicons';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {feedNavigations} from '@/constants';

interface PreviewImageListProps {
  imageUris: ImageUri[];
  onDelete?: (uri: string) => void;
  onChangeOrder?: (startIndex: number, endIndex: number) => void;
  showOption?: boolean;
  zoomEnable?: boolean;
}

type Navigation = NavigationProp<FeedStackParamList>;

function PreviewImageList({
  imageUris,
  onDelete,
  onChangeOrder,
  showOption = false,
  zoomEnable = false,
}: PreviewImageListProps) {
  const navigation = useNavigation<Navigation>();

  const handlePressImage = (index: number) => {
    if (zoomEnable) {
      navigation.navigate(feedNavigations.IMAGE_ZOOM, {
        index,
      });
    }
  };
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <S.Container>
        {imageUris.map(({uri}, index) => (
          <S.ImageContainer key={index}>
            <Pressable onPress={() => handlePressImage(index)}>
              <S.Image
                resizeMode="cover"
                source={{
                  uri: `${
                    Platform.OS === 'ios'
                      ? 'http://localhost:3030'
                      : 'http://10.0.2.2:3030'
                  }/${uri}`,
                }}
              />
              {showOption && (
                <>
                  <B.DeleteButton onPress={() => onDelete && onDelete(uri)}>
                    <IonicIcons
                      name="close"
                      size={16}
                      color={colors.Grayscale.WHITE}
                    />
                  </B.DeleteButton>
                  {index > 0 && (
                    <B.LeftButton
                      onPress={() =>
                        onChangeOrder && onChangeOrder(index, index - 1)
                      }>
                      <IonicIcons
                        name="arrow-back-outline"
                        size={16}
                        color={colors.Grayscale.WHITE}
                      />
                    </B.LeftButton>
                  )}
                  {index < imageUris.length - 1 && (
                    <B.RightButton
                      onPress={() =>
                        onChangeOrder && onChangeOrder(index, index + 1)
                      }>
                      <IonicIcons
                        name="arrow-forward-outline"
                        size={16}
                        color={colors.Grayscale.WHITE}
                      />
                    </B.RightButton>
                  )}
                </>
              )}
            </Pressable>
          </S.ImageContainer>
        ))}
      </S.Container>
    </ScrollView>
  );
}

const S = {
  Image: styled.Image`
    width: 100%;
    height: 100%;
  `,
  Container: styled.View`
    flex-direction: row;
    padding: 0 20px;
    gap: 15px;
  `,
  ImageContainer: styled.Pressable`
    width: 70px;
    height: 70px;
  `,
  ImageButton: styled.Pressable`
    position: absolute;
    background-color: ${colors.Grayscale.BLACK};
    z-index: 1;
  `,
};

const B = {
  DeleteButton: styled(S.ImageButton)`
    top: 0;
    right: 0;
  `,
  LeftButton: styled(S.ImageButton)`
    bottom: 0;
    left: 0;
  `,
  RightButton: styled(S.ImageButton)`
    bottom: 0;
    right: 0;
  `,
};

export default PreviewImageList;
