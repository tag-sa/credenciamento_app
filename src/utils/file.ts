import * as FileSystem from 'expo-file-system'
import { shareAsync } from 'expo-sharing'
import { Platform } from 'react-native'

export class File {
  constructor(private readonly url: any) {}

  async download() {
    const filename = this.url.split('/').pop()

    const result = await FileSystem.downloadAsync(this.url, FileSystem.documentDirectory + filename)

    this.save(result.uri, filename, result.headers['Content-Type'])
  }

  private async save(uri: string, filename: string, mimetype: string) {
    if (Platform.OS === 'android') this.androidSave(uri, filename, mimetype)
    else this.iosSave(uri)
  }

  private async iosSave(uri: string) {
    shareAsync(uri)
  }

  private async androidSave(uri: string, filename: string, mimetype: string) {
    const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync()
    if (permissions.granted) {
      const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 })
      await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
        .then(async (uri) => {
          await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 })
        })
        .catch((e) => console.log(e))
    } else {
      shareAsync(uri)
    }
  }
}
