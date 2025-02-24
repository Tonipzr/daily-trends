import { FetchHttp } from '../../../src/infrastructure/http/FetchHttp.ts'
import iconv from 'iconv-lite'

global.fetch = jest.fn()

jest.mock('iconv-lite', () => ({
  decode: jest.fn()
}))

describe('FetchHttp', () => {
  let fetchHttp: FetchHttp

  beforeEach(() => {
    fetchHttp = new FetchHttp()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return response text when no decode option is provided', async () => {
    const mockText = 'This is a test';

    (fetch as jest.Mock).mockResolvedValue({
      text: jest.fn().mockResolvedValue(mockText)
    })

    const result = await fetchHttp.get('http://test-url.com')

    expect(result).toBe(mockText)
    expect(fetch).toHaveBeenCalledWith('http://test-url.com')
  })

  it('should decode the response when decode option is provided', async () => {
    const mockBuffer = Buffer.from('test buffer')
    const mockDecodedText = 'Decoded text';

    (fetch as jest.Mock).mockResolvedValue({
      arrayBuffer: jest.fn().mockResolvedValue(mockBuffer)
    });

    (iconv.decode as jest.Mock).mockReturnValue(mockDecodedText)

    const result = await fetchHttp.get('http://test-url.com', { decode: 'utf-8' })

    expect(result).toBe(mockDecodedText)
    expect(fetch).toHaveBeenCalledWith('http://test-url.com')
    expect(iconv.decode).toHaveBeenCalledWith(mockBuffer, 'utf-8')
  })
})
