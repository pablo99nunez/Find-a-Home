import { GoogleSignin } from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
  scopes: ['santy.garcia19996g@gmail.com'], // what API you want to access on behalf of the user, default is email and profile
  webClientId:
    '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', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
})