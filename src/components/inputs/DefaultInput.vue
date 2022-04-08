<template>
  <div class="flex flex-col space-y-2">
    <span>{{ label }}</span>
    <input
      v-model="value"
      class="w-full h-8 px-2 bg-app-input-bg outline-app-btn-default placeholder-app-text-default transition-all"
      :type="type"
      :placeholder="placeholder"
      maxlength="255"
      autocomplete="off"
      spellcheck="false"
    />
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue'
import useModelValue from '../../composables/useModelValue'
const props = defineProps({
  type: {
    type: String,
    default: 'text'
  },
  placeholder: {
    type: String,
    default: ''
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
const value = useModelValue<string>(props, emit)
</script>
