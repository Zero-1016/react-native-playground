import {useEffect} from 'react';
import {
  check,
  Permission,
  PERMISSIONS,
  request,
  RESULTS,
} from 'react-native-permissions';
import {Alert, Linking, Platform} from 'react-native';
import {alerts} from '@/constants';

type PermissionType = 'LOCATION' | 'PHOTO';

type PermissionOS = {
  [key in PermissionType]: Permission;
};

const androidPermission: PermissionOS = {
  LOCATION: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
  PHOTO: PERMISSIONS.ANDROID.READ_MEDIA_IMAGES,
};

const iosPermission: PermissionOS = {
  LOCATION: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
  PHOTO: PERMISSIONS.IOS.PHOTO_LIBRARY,
};

function usePermission(type: PermissionType) {
  useEffect(() => {
    (async () => {
      const isAndroid = Platform.OS === 'android';
      const permissionOS = isAndroid
        ? androidPermission[type]
        : iosPermission[type];
      const checked = await check(permissionOS);

      const showPerMissionAlert = () => {
        Alert.alert(
          alerts[`${type}_PERMISSION`].TITLE,
          alerts[`${type}_PERMISSION`].DESCRIPTION,
          [
            {
              text: '설정하기',
              onPress: () => Linking.openSettings(),
            },
            {
              text: '취소',
              style: 'cancel',
            },
          ],
        );
      };
      switch (checked) {
        case RESULTS.DENIED:
          if (isAndroid) {
            showPerMissionAlert();
            return;
          }
          await request(permissionOS);
          break;
        case RESULTS.LIMITED:
        case RESULTS.BLOCKED:
          showPerMissionAlert();
          break;
        default:
          break;
      }
    })();
  }, []);
}

export default usePermission;
