import { getDefaultConfig } from 'expo/metro-config';

module.exports = (() => {
  const config = getDefaultConfig(__dirname);

  const { transformer, resolver } = config;

  return {
    transformer: {
      ...transformer,
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
      // getTransformOptions: async () => ({
      //   transform: {
      //     experimentalImportSupport: false,
      //     inlineRequires: false,
      //   },
      // }),
    },
    resolver: {
      ...resolver,
      assetExts: resolver?.assetExts?.filter((ext) => ext !== 'svg') || [],
      sourceExts: [...(resolver?.sourceExts || []), 'svg'],
    },
  };
})();

// import { getDefaultConfig } from 'expo/metro-config';

// export default (() => {
//   const config = getDefaultConfig(__dirname);

//   const { transformer, resolver } = config;

//   config.transformer = {
//     ...transformer,
//     babelTransformerPath: require.resolve('react-native-svg-transformer'),
//   };
//   config.resolver = {
//     ...resolver,
//     assetExts: resolver.assetExts.filter((ext) => ext !== 'svg'),
//     sourceExts: [...resolver.sourceExts, 'svg'],
//   };

//   return config;
// })();
