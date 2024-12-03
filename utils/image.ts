import * as Burnt from 'burnt';
import * as ImagePicker from 'expo-image-picker';

import { Logger } from '@utils/log';

export const getBase64String = (base64: string, mimeType: string = 'image/jpeg') =>
  `data:${mimeType};base64,${base64}`;

type LaunchImageProps = {
  onPickerOpen?: () => void;
  action: 'gallery' | 'camera';
};

export async function launchImage(params: LaunchImageProps) {
  const { onPickerOpen, action } = params;
  try {
    const allowed = await requestGalleryPermission();

    if (!allowed) return;

    let result = null;

    if (action === 'gallery') {
      result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        selectionLimit: 1,
        base64: true,
        quality: 0.3,
      });
    } else if (action === 'camera') {
      result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        cameraType: ImagePicker.CameraType.back,
        selectionLimit: 1,
        base64: true,
        quality: 0.3,
      });
    }

    if (!result) return;

    onPickerOpen?.();

    let data = null;

    if (!result.canceled) {
      const image = result.assets[0];
      if (!image.base64) {
        Burnt.toast({
          preset: 'error',
          title: 'Error getting image',
        });
      } else {
        data = getBase64String(image.base64, image.mimeType);
      }
    }

    return data;
  } catch (error) {
    console.error(error);
  }
}

export async function requestGalleryPermission() {
  try {
    await ImagePicker.requestMediaLibraryPermissionsAsync().then(({ status }) => {
      if (status !== 'granted') {
        ImagePicker.requestMediaLibraryPermissionsAsync().then(({ status: reqStatus }) => {
          if (reqStatus !== 'granted') {
            Burnt.toast({
              preset: 'error',
              title: 'Permission to access camera roll is required',
            });
            Logger.error('Permission to access camera roll is required!');
            throw new Error('Permission to access camera roll is required!');
          }
        });
      }
    });

    await ImagePicker.requestCameraPermissionsAsync().then(({ status }) => {
      if (status !== 'granted') {
        ImagePicker.requestCameraPermissionsAsync().then(({ status: reqStatus }) => {
          if (reqStatus !== 'granted') {
            Burnt.toast({
              preset: 'error',
              title: 'Permission to access camera is required',
            });
            Logger.error('Permission to access camera is required!');
            throw new Error('Permission to access camera is required!');
          }
        });
      }
    });
    return true;
  } catch {
    return false;
  }
}
