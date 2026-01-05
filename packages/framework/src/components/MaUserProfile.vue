<template>
  <div class="ma-user-profile">
    <div class="ma-profile-cover" :style="{ backgroundImage: `url(${cover || defaultCover})` }"></div>
    
    <div class="ma-profile-info">
      <div class="ma-profile-avatar">
        <img :src="avatar" :alt="name" />
      </div>
      
      <div class="ma-profile-details">
        <h3 class="ma-profile-name">{{ name }}</h3>
        <div class="ma-profile-role">{{ role }}</div>
        <div class="ma-profile-email">{{ email }}</div>
      </div>
      
      <div class="ma-profile-actions">
        <slot name="actions">
          <button class="ma-btn-primary" @click="$emit('edit')">Edit Profile</button>
        </slot>
      </div>
    </div>

    <div v-if="$slots.stats" class="ma-profile-stats">
      <slot name="stats" />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  name: string
  role: string
  email: string
  avatar: string
  cover?: string
}>(), {
  cover: ''
})

const defaultCover = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2IiAvPjwvc3ZnPg=='

defineEmits(['edit'])
</script>

<style scoped>
.ma-user-profile {
  background: var(--ma-bg-card);
  border-radius: 12px;
  border: 1px solid var(--ma-border);
  overflow: hidden;
}

.ma-profile-cover {
  height: 120px;
  background-size: cover;
  background-position: center;
  background-color: #f3f4f6;
}

.ma-profile-info {
  padding: 0 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: -40px;
}

.ma-profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  border: 4px solid var(--ma-bg-card);
  overflow: hidden;
  background: white;
  margin-bottom: 12px;
}

.ma-profile-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.ma-profile-name {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 4px;
  color: var(--ma-text-main);
}

.ma-profile-role {
  font-size: 14px;
  color: var(--ma-primary);
  font-weight: 500;
  margin-bottom: 4px;
}

.ma-profile-email {
  font-size: 13px;
  color: var(--ma-text-secondary);
  margin-bottom: 16px;
}

.ma-profile-actions {
  width: 100%;
}

.ma-btn-primary {
  width: 100%;
  padding: 8px 16px;
  background: var(--ma-primary);
  color: white;
  border: none;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
}

.ma-btn-primary:hover {
  background: var(--ma-primary-hover);
}

.ma-profile-stats {
  border-top: 1px solid var(--ma-border);
  padding: 16px 24px;
  display: flex;
  justify-content: space-around;
}
</style>
