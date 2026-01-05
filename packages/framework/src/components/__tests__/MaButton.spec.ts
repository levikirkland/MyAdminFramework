import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import MaButton from '../MaButton.vue'

describe('MaButton', () => {
  it('renders properly', () => {
    const wrapper = mount(MaButton, { slots: { default: 'Click me' } })
    expect(wrapper.text()).toContain('Click me')
  })

  it('emits click event', async () => {
    const wrapper = mount(MaButton)
    await wrapper.trigger('click')
    expect(wrapper.emitted('click')).toBeTruthy()
  })

  it('shows loading state', () => {
    const wrapper = mount(MaButton, { props: { loading: true } })
    expect(wrapper.classes()).toContain('is-loading')
    expect(wrapper.find('.ma-button-loader').exists()).toBe(true)
  })
})
