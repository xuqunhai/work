import { PC_DEVICE_WIDTH } from '@/constants/index.js'
import { computed } from 'vue'
import { useWindowSize } from '@vueuse/core'

const { width } = useWindowSize()
export const isMobileTerminal = computed(() => width.value < PC_DEVICE_WIDTH)
