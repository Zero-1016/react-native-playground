import {StackScreenProps} from '@react-navigation/stack';
import {FeedStackParamList} from '@/navigations/stack/FeedStackNavigator';
import {feedNavigations} from '@/constants';
import useDetailStore from '@/store/useDetailStore';
import ImageCarousel from '@/components/common/ImageCarousel';

type ImageZoomScreenProps = StackScreenProps<
  FeedStackParamList,
  typeof feedNavigations.IMAGE_ZOOM
>;

function ImageZoomScreen({route}: ImageZoomScreenProps) {
  const {detailPost} = useDetailStore();
  const index = route.params.index;

  return (
    <ImageCarousel images={detailPost?.images ?? []} pressedIndex={index} />
  );
}

export default ImageZoomScreen;
