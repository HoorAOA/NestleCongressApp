module.exports = {
  preset: '@react-native/jest-preset',
  transform: {
    '^.+\\.[jt]sx?$': 'babel-jest',
    '^.+\\.mjs$': 'babel-jest',
  },
  transformIgnorePatterns: [
    'node_modules/(?!((jest-)?react-native|@react-native|@react-navigation|react-native-safe-area-context|react-native-screens|react-native-localize|react-native-linear-gradient|react-native-svg|react-native-share|react-native-view-shot|react-native-qrcode-svg|react-native-webview|lucide-react-native)/)',
  ],
};
