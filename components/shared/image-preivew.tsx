import React from 'react';
import { View } from 'tamagui';
import * as Burnt from 'burnt';
import { Image } from 'expo-image';
import * as Sharing from 'expo-sharing';
import { Share } from '@tamagui/lucide-icons';

//import DataRepo from '@api/datasource';

//import { getMimeType } from '@utils/image';
import { blurhash } from '@constants/image';

import ActionIcon from './action-icon';
import Loader from './loader';

type ImagePreviewProps = {
  url: string;
  description: string;
  paymentId: string;
};

const ImagePreview = (props: ImagePreviewProps) => {
  const { url } = props;

  const [loading, setLoading] = React.useState(false);

  return (
    <View>
      <Image
        className="cd-rounded-lg cd-w-full cd-h-[300]"
        contentFit="contain"
        placeholder={{ blurhash }}
        source={{ uri: url }}
        transition={1000}
      />
      <ActionIcon
        classes="cd-absolute cd-top-0 cd-right-0 cd-m-2 cd-rounded-full cd-bg-white cd-p-[20] cd-shadow-md"
        icon={loading ? <Loader color="#339AF0" /> : <Share color="$gray8" size="$1" />}
        size={40}
        variant="icon"
        onPress={handleShare}
      />
    </View>
  );

  async function handleShare() {
    setLoading(true);
    const isAvailable = await Sharing.isAvailableAsync();

    if (isAvailable) {
      // try {
      //   const mimeType = getMimeType(url);
      //   const uriShareable = await DataRepo.getFilefromURL({
      //     fileName: `${description}.${mimeType.replace('image/', '')}`,
      //     paymentId,
      //     mimeType,
      //   });
      //   await Sharing.shareAsync(uriShareable.uri, {
      //     dialogTitle: 'Share this image',
      //     mimeType: uriShareable.mimeType,
      //   });
      //   setLoading(false);
      // } catch (error) {
      //   setLoading(false);
      //   Burnt.toast({
      //     preset: 'error',
      //     title: 'Error sharing image',
      //   });
      // }
    } else {
      setLoading(false);

      Burnt.toast({
        preset: 'error',
        title: 'Sharing is not available on this platform',
      });
    }
  }
};

export default ImagePreview;
