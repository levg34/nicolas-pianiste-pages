import { describe, expect, it } from 'vitest'
import { getImageUrl, prepareForDisplay } from './utils'

describe('test prepareForDisplay function', () => {
    it('should prepare correctly for pair number', () => {
        const input = [1, 2, 3, 4, 5, 6, 7, 8]
        expect(prepareForDisplay(input)).toEqual([
            [1, 2],
            [3, 4],
            [5, 6],
            [7, 8]
        ])
    })
    it('should prepare correctly for impair number', () => {
        const input = [1, 2, 3, 4, 5, 6, 7]
        expect(prepareForDisplay(input)).toEqual([
            [1, 2],
            [3, 4],
            [5, 6],
            [7, null]
        ])
    })
})

describe('test getImageUrl function', () => {
    it('should work with full url', () => {
        expect(getImageUrl('https://full.url/uploads/test.png')).toBe('/api/uploads/test.png')
    })
    it('should work with complex full url', () => {
        expect(getImageUrl('https://full.url/uploads/folder/test.png')).toBe('/api/uploads/folder/test.png')
    })
    it('should work with path url', () => {
        expect(getImageUrl('/uploads/test.png')).toBe('/api/uploads/test.png')
    })
    it('should work with complex path url', () => {
        expect(getImageUrl('/uploads/folder/test.png')).toBe('/api/uploads/folder/test.png')
    })
})
