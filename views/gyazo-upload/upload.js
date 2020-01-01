import fs from 'fs'
import path from 'path'
import test from 'ava'
import fetchMock from 'fetch-mock'
import uploadClient from '../../libs/uploadClient'

const imagedata = fs.readFileSync(path.resolve(__dirname, base), { encoding: 'utf-8' }).trim()

fetchMock
  .post('https://upload.gyazo.com/api/upload/easy_auth', {
    'get_image_url' : 'https://gyazo.com/api/upload/062c5b89c0071595b9a931638e026413733d9a91ecec84c5087d2440c56e5ef0',
    'expires_at' : 1401178164
  })

test('call easy_auth api', (t) => {
  const client = new uploadClient('SAMPLECLIENTID')
  return client.easyAuth(imagedata).then((result) => {
    t.is(result, 'https://gyazo.com/api/upload/062c5b89c0071595b9a931638e026413733d9a91ecec84c5087d2440c56e5ef0')
  })
})
