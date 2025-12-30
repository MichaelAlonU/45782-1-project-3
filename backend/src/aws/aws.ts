import { CreateBucketCommand, S3Client } from '@aws-sdk/client-s3'
import config from 'config'

const s3Connection = JSON.parse(JSON.stringify(config.get<object>('s3.connection')))

const s3Client = new S3Client(s3Connection)

if (!config.get<boolean>(`s3.isLocalStack`)) delete s3Connection.endpoint;
export async function createAppBucketIfNotExists() {
    try {
        console.log(`Created S3 bucket!`)
        const result = await s3Client.send(
            new CreateBucketCommand({
                Bucket: config.get<string>('s3.bucket')
            })
        )
        console.log(result)
    } catch (e) {
        console.log('bucket creation failed. silenting exception, bucket probably already exists', e)        
    }
}

export default s3Client