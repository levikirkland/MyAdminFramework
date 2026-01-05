import { describe, it, expect } from 'vitest'
import { useMaLocale } from '../index'

describe('useMaLocale', () => {
  it('translates keys correctly', () => {
    const { t } = useMaLocale()
    expect(t('table.density')).toBe('Density')
    expect(t('common.save')).toBe('Save')
  })
})
