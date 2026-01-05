<template>
  <div 
    ref="container" 
    class="ma-video-thumbnail" 
    :style="containerStyle"
  >
    <!-- Loading State -->
    <div v-if="loading" class="ma-thumbnail-overlay loading">
      <span class="ma-spinner"></span>
    </div>

    <!-- Error State -->
    <div v-else-if="error" class="ma-thumbnail-overlay error">
      <span>⚠️ Failed to load</span>
    </div>

    <!-- Generated Image -->
    <img 
      v-else-if="thumbnailUrl" 
      :src="thumbnailUrl" 
      alt="Video Thumbnail" 
      class="ma-thumbnail-img"
    />

    <!-- Play Icon Overlay (Optional) -->
    <div v-if="showPlayIcon && !loading && !error" class="ma-play-icon">
      <svg viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
        <path d="M8 5v14l11-7z"/>
      </svg>
    </div>

    <!-- Hidden Video Element for Processing -->
    <video 
      ref="videoRef" 
      :src="src" 
      crossorigin="anonymous" 
      preload="metadata"
      style="display: none;"
      @loadeddata="onLoadedData"
      @seeked="onSeeked"
      @error="onError"
    ></video>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed, watch } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  time: {
    type: Number,
    default: 1 // Capture at 1 second mark
  },
  width: {
    type: String,
    default: '100%'
  },
  aspectRatio: {
    type: Number,
    default: 16 / 9
  },
  showPlayIcon: {
    type: Boolean,
    default: true
  },
  lazy: {
    type: Boolean,
    default: true
  }
})

const container = ref<HTMLElement | null>(null)
const videoRef = ref<HTMLVideoElement | null>(null)
const thumbnailUrl = ref<string | null>(null)
const loading = ref(true)
const error = ref(false)
let observer: IntersectionObserver | null = null

const containerStyle = computed(() => {
  return {
    width: props.width,
    aspectRatio: `${props.aspectRatio}`
  }
})

const generateThumbnail = () => {
  if (!videoRef.value) return
  
  loading.value = true
  error.value = false
  
  // Trigger video load
  videoRef.value.currentTime = props.time
}

const onLoadedData = () => {
  // Video metadata loaded, waiting for seek to complete
}

const onSeeked = () => {
  if (!videoRef.value) return

  try {
    const canvas = document.createElement('canvas')
    canvas.width = videoRef.value.videoWidth
    canvas.height = videoRef.value.videoHeight
    
    const ctx = canvas.getContext('2d')
    if (ctx) {
      ctx.drawImage(videoRef.value, 0, 0, canvas.width, canvas.height)
      
      canvas.toBlob((blob) => {
        if (blob) {
          if (thumbnailUrl.value) URL.revokeObjectURL(thumbnailUrl.value)
          thumbnailUrl.value = URL.createObjectURL(blob)
          loading.value = false
        } else {
          onError()
        }
      }, 'image/jpeg', 0.8)
    }
  } catch (e) {
    console.error('Thumbnail generation failed:', e)
    onError()
  }
}

const onError = () => {
  loading.value = false
  error.value = true
}

onMounted(() => {
  if (props.lazy && 'IntersectionObserver' in window) {
    observer = new IntersectionObserver((entries) => {
      if (entries[0]?.isIntersecting) {
        generateThumbnail()
        observer?.disconnect()
      }
    })
    if (container.value) observer.observe(container.value)
  } else {
    generateThumbnail()
  }
})

onUnmounted(() => {
  if (thumbnailUrl.value) URL.revokeObjectURL(thumbnailUrl.value)
  if (observer) observer.disconnect()
})

watch(() => props.src, () => {
  thumbnailUrl.value = null
  generateThumbnail()
})
</script>

<style scoped>
.ma-video-thumbnail {
  position: relative;
  background-color: #000;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.ma-thumbnail-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ma-thumbnail-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  background: rgba(0,0,0,0.5);
}

.ma-play-icon {
  position: absolute;
  color: white;
  background: rgba(0,0,0,0.4);
  border-radius: 50%;
  padding: 8px;
  backdrop-filter: blur(4px);
  transition: transform 0.2s;
  pointer-events: none;
}

.ma-video-thumbnail:hover .ma-play-icon {
  transform: scale(1.1);
  background: rgba(255,0,0,0.8);
}

.ma-spinner {
  width: 24px;
  height: 24px;
  border: 3px solid rgba(255,255,255,0.3);
  border-radius: 50%;
  border-top-color: #fff;
  animation: spin 1s ease-in-out infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
