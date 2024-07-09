import ImagePicker from 'react-native-image-crop-picker';
import {getFormDataImages} from '@/utils';
import useMutateImages from '@/hooks/queries/useMutateImages';
import React from 'react';
import {ImageUri} from '@/types/domain';
import {Alert} from 'react-native';

interface UseImagePickerProps {
  initialImages: ImageUri[];
}

function useImagePicker({initialImages = []}: UseImagePickerProps) {
  const uploadImages = useMutateImages();
  const [imageUris, setImageUris] = React.useState<ImageUri[]>(initialImages);
  const addImageUris = (uris: ImageUri[]) => {
    if (imageUris.length + uris.length > 5) {
      Alert.alert(
        '이미지 갯수를 초과하였습니다.',
        '이미지는 최대 5개까지 업로드 가능합니다.',
      );
      return;
    }
    setImageUris(prev => [...prev, ...uris]);
  };

  const deleteImageUri = (uri: ImageUri) => {
    const newImageUris = imageUris.filter(imageUri => imageUri !== uri);
    setImageUris(newImageUris);
  };

  const changeImageUrisOrder = (startIndex: number, endIndex: number) => {
    const copyImageUris = [...imageUris];
    const [removed] = copyImageUris.splice(startIndex, 1);
    copyImageUris.splice(endIndex, 0, removed);
    setImageUris(copyImageUris);
  };

  const handleChange = () => {
    ImagePicker.openPicker({
      mediaType: 'photo',
      multiple: true,
      includeBase64: true,
      maxFiles: 5,
      cropperChooseText: '완료',
      cropperCancelText: '취소',
    })
      .then(images => {
        const formData = getFormDataImages(images);
        uploadImages.mutate(formData, {
          onSuccess: data => addImageUris(data),
        });
      })
      .catch(error => {
        if (error.code !== 'E_PICKER_CANCELLED') {
          // 에러 메세지 표시
        }
      });
  };

  return {
    imageUris,
    handleChange,
    delete: deleteImageUri,
    changeOrder: changeImageUrisOrder,
  };
}

export default useImagePicker;
