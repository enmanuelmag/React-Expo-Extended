import { useActionSheet } from '@expo/react-native-action-sheet';

import { launchImage } from '@utils/image';

const options = ['Tomar foto', 'Seleccionar de la galería', 'Cancelar'];

type PickImageProps = {
  handleImage: (image: string) => void;
  onPickerOpen?: () => void;
};

export function usePickImage(props: PickImageProps) {
  const { handleImage, onPickerOpen } = props;
  const { showActionSheetWithOptions } = useActionSheet();

  function launch() {
    showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex: 2,
        destructiveButtonIndex: 2,
      },
      async (index) => {
        if (index === undefined || index === 2) {
          return;
        }

        const data = await launchImage({
          action: index === 0 ? 'camera' : 'gallery',
          onPickerOpen,
        });

        if (data) {
          handleImage(data);
        }
      },
    );
  }

  return { launch };
}
