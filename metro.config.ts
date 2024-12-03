import { getDefaultConfig } from 'expo/metro-config';

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  return {
    transformer: {
      ...transformer,
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      ...resolver,
      assetExts: resolver?.assetExts?.filter((ext) => ext !== 'svg') || [],
      sourceExts: [...(resolver?.sourceExts || []), 'svg'],
    },
  };
})();
