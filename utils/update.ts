/* eslint-disable @typescript-eslint/no-unused-vars */
import * as Application from 'expo-application';

type ResultAppStore = {
  results?: {
    version: string;
  }[];
};

export const checkUpdateAvailable = async () => {
  const storeInfoURL = 'http://itunes.apple.com/lookup?bundleId=dev.cardor.enmanuelmag.songfy';

  try {
    const response = await fetch(storeInfoURL, {
      cache: 'no-cache',
      method: 'GET',
    });
    const data = (await response.json()) as ResultAppStore;

    if (!data.results || data.results.length === 0) {
      return false;
    }

    const [{ version: appStoreVerion }] = data.results;

    const currentVersion = Application.nativeApplicationVersion;

    if (!currentVersion) {
      return false;
    }

    return isGreaterVersion(currentVersion, appStoreVerion);
  } catch (error) {
    return false;
  }
};

function isGreaterVersion(currentVersion: string, appStoreVerion: string) {
  const currentVersionArr = currentVersion.split('.');
  const appStoreVerionArr = appStoreVerion.split('.');

  for (let i = 0; i < currentVersionArr.length; i++) {
    const current = Number(currentVersionArr[i]);
    const appStore = Number(appStoreVerionArr[i]);

    if (current > appStore) {
      return false;
    }

    if (current < appStore) {
      return true;
    }
  }

  return false;
}
