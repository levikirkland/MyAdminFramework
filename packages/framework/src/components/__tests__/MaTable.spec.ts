import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import MaTable from '../MaTable.vue'

// Mock the locale composable since MaTable uses it
vi.mock('../../locale', () => ({
  useMaLocale: () => ({
    t: (key: string) => key
  })
}))

describe('MaTable', () => {
  const columns = [
    { key: 'name', label: 'Name', sortable: true, filterable: true },
    { key: 'age', label: 'Age', sortable: true },
    { key: 'role', label: 'Role' }
  ]

  const data = [
    { id: 1, name: 'Alice', age: 30, role: 'Admin' },
    { id: 2, name: 'Bob', age: 25, role: 'User' },
    { id: 3, name: 'Charlie', age: 35, role: 'Manager' }
  ]

  it('renders data correctly', () => {
    const wrapper = mount(MaTable, {
      props: { columns, data }
    })

    expect(wrapper.text()).toContain('Alice')
    expect(wrapper.text()).toContain('Bob')
    expect(wrapper.text()).toContain('Charlie')
  })

  it('sorts data when header is clicked', async () => {
    const wrapper = mount(MaTable, {
      props: { columns, data }
    })

    // Find the sortable header for 'age'
    const headers = wrapper.findAll('th')
    const ageHeader = headers[1] // Index 1 is Age
    expect(ageHeader).toBeDefined()

    // Click to sort ascending
    await ageHeader!.find('.th-content').trigger('click')
    
    // Check emitted event or internal state if we could access it. 
    // MaTable emits 'sort'.
    expect(wrapper.emitted('sort')).toBeTruthy()
    const sortEvent = wrapper.emitted('sort')?.[0]
    expect(sortEvent).toEqual([{ key: 'age', order: 'asc' }])
  })

  it('renders empty state when no data', () => {
    const wrapper = mount(MaTable, {
      props: { columns, data: [] }
    })
    
    // MaEmpty component should be present
    expect(wrapper.findComponent({ name: 'MaEmpty' }).exists()).toBe(true)
  })

  it('handles selection if selectable', async () => {
    const wrapper = mount(MaTable, {
      props: { columns, data, selectable: true }
    })

    // Find checkboxes
    const checkboxes = wrapper.findAllComponents({ name: 'MaCheckbox' })
    // First one is "select all" in header
    expect(checkboxes.length).toBeGreaterThan(1)
    
    // Click the first row checkbox (index 1, since 0 is header)
    await checkboxes[1]!.vm.$emit('update:modelValue', true)
    
    expect(wrapper.emitted('update:selected')).toBeTruthy()
  })

  it('emits ai-summarize event', async () => {
    const wrapper = mount(MaTable, {
      props: { columns, data, aiEnabled: true, densityControl: true } // densityControl needed to show toolbar
    })

    const summarizeBtn = wrapper.findAllComponents({ name: 'MaButton' }).find(b => b.text().includes('Summarize'))
    expect(summarizeBtn?.exists()).toBe(true)

    await summarizeBtn?.trigger('click')
    expect(wrapper.emitted('ai-summarize')).toBeTruthy()
    // Should emit the data
    const emitted = wrapper.emitted('ai-summarize')
    expect(emitted).toBeDefined()
    if (emitted && emitted[0]) {
      expect(emitted[0][0]).toEqual(data)
    }
  })
})
