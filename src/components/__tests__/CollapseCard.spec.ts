import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import CollapseCard from '@/components/CollapseCard.vue'

describe('CollapseCard.vue', () => {
  const icon = 'https://via.placeholder.com/20'
  const label = 'Test Label'

  it('renders label and icon', () => {
    const wrapper = mount(CollapseCard, {
      props: { icon, label }
    })

    expect(wrapper.find('img').attributes('src')).toBe(icon)
    expect(wrapper.text()).toContain(label)
  })

  it('shows only expand icon initially', () => {
    const wrapper = mount(CollapseCard, {
      props: { icon, label }
    })

    const expandIcon = wrapper.find('img[alt="Toggle"]:not(.hidden)')
    expect(expandIcon.exists()).toBe(true)
    expect(expandIcon.attributes('src')).toContain('expand')
  })

  it('toggles content and icon on click', async () => {
    const wrapper = mount(CollapseCard, {
      props: { icon, label },
      slots: {
        default: '<div class="slot-content">Expanded Content</div>',
      },
    })

    // Initially, slot content should not be present
    expect(wrapper.find('.slot-content').exists()).toBe(false)

    // Click to open
    await wrapper.find('[data-test="header"]').trigger('click')
    expect(wrapper.find('.slot-content').exists()).toBe(true)

    // Click again to close
    await wrapper.find('[data-test="header"]').trigger('click')
    expect(wrapper.find('.slot-content').exists()).toBe(false)
  })
})
