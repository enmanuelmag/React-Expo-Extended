import * as Burnt from 'burnt';
import * as Sharing from 'expo-sharing';
import { Logger } from './log';

export const share = async (uri: string) => {
  const isAvailable = await Sharing.isAvailableAsync();

  if (!isAvailable) {
    Burnt.toast({
      preset: 'error',
      title: 'No se puede compartir',
    });
    return;
  }

  try {
    await Sharing.shareAsync(uri, {
      dialogTitle: 'Share this image',
      mimeType: 'application/pdf',
    });
  } catch (error) {
    const e = error as Error;
    const message = e.message ?? String(error);

    Logger.error('Error sharing image', error);

    Burnt.toast({
      preset: 'error',
      title: 'Error compartiendo imagen',
    });

    setTimeout(() => {
      Burnt.dismissAllAlerts();

      Burnt.toast({
        preset: 'error',
        title: message,
      });
    }, 1500);
  }
};
