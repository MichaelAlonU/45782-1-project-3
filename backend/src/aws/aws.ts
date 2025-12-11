import { CreateBucketCommand, S3Client, GetObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import config from 'config'

const s3Connection = JSON.parse(JSON.stringify(config.get<object>('s3.connection')))
if (!config.get<boolean>(`s3.isLocalStack`)) delete s3Connection.endpoint;

const s3Client = new S3Client(s3Connection)

export async function createAppBucketIfNotExists() {
    try {
        const result = await s3Client.send(
            new CreateBucketCommand({
                Bucket: config.get<string>('s3.bucket')
            })
        )
        console.log(`Created S3 bucket! ==>`)
        console.log(result)
    } catch (e) {
        console.log('bucket creation failed. silenting exception, bucket probably already exists', e)        
    }
}

/**
 * Generate a signed URL for reading a private S3 object.
 * @param key - The object key (path) in the S3 bucket
 * @param expiresIn - URL expiration time in seconds (default: 3600 = 1 hour)
 */
export async function getSignedImageUrl(key: string, expiresIn: number = 360000): Promise<string> {
    try {
        const command = new GetObjectCommand({
            Bucket: config.get<string>('s3.bucket'),
            Key: key
        })
        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn })
        return signedUrl
    } catch (e) {
        console.error('Failed to generate signed URL:', e)
        throw e
    }
}

export default s3Client