import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Platform,
} from 'react-native';
import {ImageUri} from '@/types/domain';
import styled from '@emotion/native';
import {getSize} from '@/utils';
import Octicons from 'react-native-vector-icons/Octicons';
import {EdgeInsets, useSafeAreaInsets} from 'react-native-safe-area-context';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import useThemeStore from '@/store/useThemeStore';
import {colors} from '@/styles/theme/colors';

interface ImageCarouselProps {
  images: ImageUri[];
  pressedIndex?: number;
}

function ImageCarousel({images, pressedIndex = 0}: ImageCarouselProps) {
  const inset = useSafeAreaInsets();
  const navigation = useNavigation();
  const [page, setPage] = useState<number>(pressedIndex);
  const [initialIndex, setInitialIndex] = useState<number>(pressedIndex);
  const {theme} = useThemeStore();
  const handleScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const newPage = Math.round(
      e.nativeEvent.contentOffset.x / getSize.screenWidth,
    );
    setPage(newPage);
  };
  return (
    <S.Container>
      <S.BackButton $inset={inset} onPress={navigation.goBack}>
        <Octicons name="arrow-left" size={30} color={colors[theme].WHITE} />
      </S.BackButton>
      <FlatList
        data={images}
        renderItem={({item}) => (
          <S.ImageContainer>
            <S.Image
              resizeMode="contain"
              source={{
                uri: `${
                  Platform.OS === 'ios'
                    ? 'http://localhost:3030'
                    : 'http://10.0.2.2:3030'
                }/${item.uri}`,
              }}
            />
          </S.ImageContainer>
        )}
        keyExtractor={item => String(item.id)}
        onScroll={handleScroll}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        initialScrollIndex={initialIndex}
        onScrollToIndexFailed={() => setInitialIndex(0)}
        getItemLayout={(_, index) => ({
          length: getSize.deviceWidth,
          offset: getSize.deviceWidth * index,
          index,
        })}
      />

      <S.PageContainer $bottom={inset.bottom + 10}>
        {Array.from({length: images.length}, (_, index) => (
          <S.PageDot key={index} $active={index === page} />
        ))}
      </S.PageContainer>
    </S.Container>
  );
}

const S = {
  Container: styled.View`
    flex: 1;
    align-items: center;
    background-color: ${props => props.theme.colors.WHITE};
  `,
  ImageContainer: styled.View`
    width: ${getSize.deviceWidth + 'px'};
  `,
  BackButton: styled.Pressable<{$inset: EdgeInsets}>`
    position: absolute;
    left: 20px;
    z-index: 1;
    background-color: ${props => props.theme.colors.PINK_700};
    height: 40px;
    width: 40px;
    border-radius: 40px;
    align-items: center;
    justify-content: center;
    margin-top: ${({$inset}) => $inset.top + 10 + 'px'};
  `,
  Image: styled.Image`
    width: 100%;
    height: 100%;
  `,
  PageContainer: styled.View<{$bottom: number}>`
    flex-direction: row;
    align-items: center;
    position: absolute;
    bottom: ${({$bottom}) => $bottom + 'px'};
  `,
  PageDot: styled.View<{$active: boolean}>`
    margin: 4px;
    background-color: ${({$active, theme}) =>
      $active ? theme.colors.PINK_700 : theme.colors.GRAY_200};
    width: 8px;
    height: 8px;
  `,
};

export default ImageCarousel;
