import * as FileSystem from "expo-file-system/legacy";

export class ImageService {
    static async convertImageToBase64(uri: string): Promise<string> {
        try {
            const base64 = await FileSystem.readAsStringAsync(uri, {
                encoding: FileSystem.EncodingType.Base64,
            });
            return `data:image/jpeg;base64,${base64}`;
        } catch (error) {
            console.error('Error converting image to base64:', error);
            throw new Error('Failed to convert image');
        }
    }

    static async downloadImage(url: string): Promise<string> {
        try {
            const filename = `${FileSystem.cacheDirectory}-${Date.now()}.jpg`;
            const downloadResult = await FileSystem.downloadAsync(url, filename);
            return downloadResult.uri;
        } catch (error) {
            console.error('Error downloading image: ', error);
            throw new Error('Failed to download image');
        }
    }
}
