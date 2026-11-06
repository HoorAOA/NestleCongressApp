import { Alert, Linking, Platform } from 'react-native';

export const VENUE_DESTINATION = 'World Trade Centre, Dubai, United Arab Emirates';

export const openDirections = async (destination: string = VENUE_DESTINATION) => {
    const encoded = encodeURIComponent(destination);

    const nativeUrl =
        Platform.OS === 'ios'
            ? `http://maps.apple.com/?daddr=${encoded}&dirflg=d`
            : `google.navigation:q=${encoded}`;

    const webUrl = `https://www.google.com/maps/dir/?api=1&destination=${encoded}&travelmode=driving`;

    try {
        await Linking.openURL(nativeUrl);
    } catch {
        try {
            await Linking.openURL(webUrl);
        } catch {
            Alert.alert(
                'Unable to open maps',
                'Please install a maps application and try again.',
            );
        }
    }
};