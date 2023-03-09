import * as uuid from 'uuid'
import * as path from 'path'

class FileServiceSamples {
    saveFile(file) {
        try {
            const fileName = uuid.v4() + '.jpg'
            const filePath = path.resolve('static/samples', fileName)
            file.mv(filePath)
            return fileName
        } catch(e) {
            console.log(e)
        }
    }
}

export default new FileServiceSamples()