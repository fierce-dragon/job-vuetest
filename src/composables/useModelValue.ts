import { computed } from 'vue'

export default function <T>(
  props: { modelValue: T },
  emit: (_event: 'update:modelValue', ..._arg: T[]) => void
) {
  return computed({
    get: () => props.modelValue,
    set: (value) => emit('update:modelValue', value)
  })
}
