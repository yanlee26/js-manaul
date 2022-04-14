import {
  apiGetOSStsCredential,
  apiGetCMSStsCredential,
  apiGetCRMStsCredential,
  apiGenerateCRMPresignedUrl,
  apiGenerateOSPresignedUrl,
  apiGenerateCMSPresignedUrl
} from 'api/COS'
import { BucketPaths, BucketNames } from 'interface'
import { useFetchOnMounted } from './useAsync'

const stsCredentialAPIs = {
  [BucketNames.OS]: apiGetOSStsCredential,
  [BucketNames.CMS]: apiGetCMSStsCredential,
  [BucketNames.CRM]: apiGetCRMStsCredential
}
export function useCOSStsCredential(path: BucketPaths, bucketName: BucketNames = BucketNames.OS) {
  const api = stsCredentialAPIs[bucketName]
  const { data } = useFetchOnMounted<{ data: any }>(api, path, {})

  return data.data
}

const generatePresignedUrlAPIs = {
  [BucketNames.OS]: apiGenerateOSPresignedUrl,
  [BucketNames.CMS]: apiGenerateCMSPresignedUrl,
  [BucketNames.CRM]: apiGenerateCRMPresignedUrl
}
export function useGeneratePresignedUrl(path: BucketPaths, bucketName: BucketNames = BucketNames.OS) {
  const api = generatePresignedUrlAPIs[bucketName]
  const { data = '' } = useFetchOnMounted(api, path, '')

  return data
}
