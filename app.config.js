export default {
  expo: {
    name: "Flipp - Partners",
    slug: "flipp-partners",
    version: "1.1.0",
    orientation: "portrait",
    icon: "./src/assets/icons/logo.png",
    splash: {
      image: "./src/assets/images/splash.png",
      resizeMode: "cover"
    },
    updates: {
      fallbackToCacheTimeout: 0
    },
    assetBundlePatterns: [
      "**/*"
    ],
    ios: {
      supportsTablet: true,
      bundleIdentifier: "flipp.partners.com"
    },
    android: {
      userInterfaceStyle: "light",
      versionCode: 2,
      googleServicesFile: "./google-services.json",
      adaptiveIcon: {
        backgroundColor: "#9E0404",
        foregroundImage: "./src/assets/icons/logo.png"
      },
      package: "flipp.partners.com"
    },
    extra: {
      apiUrl: process.env.API_URL ?? 'http://192.168.15.24:3030/api/app-store'
    }
  }
}
