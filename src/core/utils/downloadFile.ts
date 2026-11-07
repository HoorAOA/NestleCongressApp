import { Platform, ToastAndroid } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Share from 'react-native-share';

export interface DownloadableFile {
    url: string;
    fileName: string;
    mime: string;
}

export const downloadFile = async ({
    url,
    fileName,
    mime,
}: DownloadableFile): Promise<void> => {
    const { dirs } = ReactNativeBlobUtil.fs;

    if (Platform.OS === 'android') {
        const response = await ReactNativeBlobUtil.config({
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                title: fileName,
                description: 'NESTLÉ Congress resource',
                mime,
                mediaScannable: true,
                path: `${dirs.DownloadDir}/${fileName}`,
            },
        }).fetch('GET', url);

        const status = response.info().status;
        if (status >= 400) {
            throw new Error(`Download failed with status ${status}`);
        }

        ToastAndroid.show(`${fileName} saved to Downloads`, ToastAndroid.LONG);
        return;
    }

    const response = await ReactNativeBlobUtil.config({
        fileCache: true,
        path: `${dirs.DocumentDir}/${fileName}`,
    }).fetch('GET', url);

    const status = response.info().status;
    if (status >= 400) {
        throw new Error(`Download failed with status ${status}`);
    }

    await Share.open({
        url: `file://${response.path()}`,
        type: mime,
        filename: fileName,
        failOnCancel: false,
    });
};
