import Geolocation from "@react-native-community/geolocation";
import { Alert, PermissionsAndroid, Platform } from "react-native";

export async function askForPostNotificationsPermission(): Promise<boolean> {
    if (Platform.OS !== 'android') return false;
    if (Platform.Version < 33) return false; // Only request for Android versions 13 and above

    try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS, {
            title: 'Permisão de notificação',
            message: 'Precisamos enviar notificações',
            buttonNeutral: 'Depois',
            buttonNegative: 'Cancelar',
            buttonPositive: 'OK',
        });
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            console.log('Permission Granted. You can now receive notifications.');
            return true;
        } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
            console.log('Permission Denied. Notification permission is required.');
        } else if (granted === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
            console.log('Permission Blocked. Notification permission has been blocked.');
            Alert.alert('Notification has not been granted!', 'Please long press on app icon, select App Info, select Notifications and enable all notifications.');
        }
    } catch (e) {
        console.warn('requestPostNotificationsPermission error', e);
    }
    return false;
}

export async function askForGeolocationPermission () {
    Geolocation.requestAuthorization();
    Geolocation.setRNConfiguration({
        authorizationLevel: 'always',
        enableBackgroundLocationUpdates: true,
        locationProvider: 'auto',
        skipPermissionRequests: false
    });
}
