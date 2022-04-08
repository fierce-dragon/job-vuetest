<template>
  <div class="flex flex-col space-y-2">
    <span>{{ label }}</span>
    <div class="flex">
      <slot></slot>
      <select
        v-model="value"
        class="w-full h-8 px-2 bg-app-input-bg outline-app-btn-default placeholder-app-text-default transition-all"
      >
        <option
          v-for="(option, index) in options"
          :key="index"
          :value="option.value"
        >
          {{ option.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits, PropType } from 'vue'
import useModelValue from '../../composables/useModelValue'

type OptionValue = string | number | boolean | object

interface SelectOption {
  name: string
  value: OptionValue
}

const props = defineProps({
  options: {
    type: Array as PropType<SelectOption[]>,
    default: () => []
  },
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue'])
const value = useModelValue<OptionValue>(props, emit)
</script>
