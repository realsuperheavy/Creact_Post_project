const config = {
  appName: 'HelloScribe',
  appHomeUrl: 'https://www.helloscribe.ai',
  appUrl: process.env.VUE_APP_API_URL,
  tinyMCEApiKey: process.env.VUE_APP_TINY_API_KEY,
  codoxTinyMCEApiKey: process.env.VUE_APP_CODOX_TINYMCE_API_KEY,
  intercomAppId: process.env.VUE_APP_INTERCOM_APP_ID,
  hotjarSiteId: process.env.VUE_APP_HOTJAR_SITE_ID,
  amplitudeApiKey: process.env.VUE_APP_AMPLITUDE_API_KEY,
  googleAnalyticsId: process.env.VUE_APP_GOOGLE_ANALYTICS_ID,
  googleTagManagerId: process.env.VUE_APP_GTM_ID,
};

export default config;
