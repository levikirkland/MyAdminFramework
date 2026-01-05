<template>
  <div class="settings-page">
    <MaBreadcrumb :items="[{ label: 'Dashboard', to: '/' }, { label: 'Settings' }]" />
    
    <div class="page-header">
      <h1>Settings</h1>
      <p>Manage your account settings and preferences.</p>
    </div>

    <MaTabs v-model="activeTab" :items="tabs" vertical>
      <div v-if="activeTab === 'general'" class="tab-content">
        <MaCard>
          <template #title>Profile Information</template>
          <MaAlert type="info" class="mb-4" v-permission="'admin'">
            You are viewing this because you have the 'admin' role.
          </MaAlert>
          
          <MaFormGroup label="Full Name" required>
            <MaInput v-model="profile.name" />
          </MaFormGroup>
          <MaFormGroup label="Email Address" required>
            <MaInput v-model="profile.email" type="email" />
          </MaFormGroup>
          <MaFormGroup label="Role">
            <MaSelect 
              v-model="profile.role" 
              :options="['Admin', 'Editor', 'Viewer']" 
            />
          </MaFormGroup>
          <MaTextarea 
            v-model="profile.bio" 
            label="Bio" 
            placeholder="Tell us about yourself"
            :rows="4"
          />
          <template #actions>
            <MaButton color="primary" @click="saveProfile" v-permission="'user.write'">Save Changes</MaButton>
            <span v-if="!hasPermission('user.write')" class="text-muted ml-2">
              (You do not have permission to save)
            </span>
          </template>
        </MaCard>
      </div>

      <div v-if="activeTab === 'notifications'" class="tab-content">
        <MaCard>
          <template #title>Preferences</template>
          <div class="settings-list">
            <div class="settings-item">
              <div class="settings-item-info">
                <div class="settings-item-title">Email Notifications</div>
                <div class="settings-item-desc">Receive emails about account activity</div>
              </div>
              <MaSwitch v-model="preferences.emailNotifications" />
            </div>
            <div class="settings-item">
              <div class="settings-item-info">
                <div class="settings-item-title">Desktop Notifications</div>
                <div class="settings-item-desc">Show browser alerts for new messages</div>
              </div>
              <MaSwitch v-model="preferences.desktopNotifications" />
            </div>
            <div class="settings-item">
              <div class="settings-item-info">
                <div class="settings-item-title">Public Profile</div>
                <div class="settings-item-desc">Make your profile visible to everyone</div>
              </div>
              <MaSwitch v-model="preferences.publicProfile" />
            </div>
            
            <div class="settings-divider"></div>
            
            <MaFormGroup label="Theme Preference">
              <div class="radio-group">
                <MaRadio v-model="preferences.theme" value="light" label="Light Mode" />
                <MaRadio v-model="preferences.theme" value="dark" label="Dark Mode" />
                <MaRadio v-model="preferences.theme" value="system" label="System Default" />
              </div>
            </MaFormGroup>

            <MaFormGroup label="Communication">
              <div class="checkbox-group">
                <MaCheckbox v-model="preferences.newsletter" label="Subscribe to newsletter" />
                <MaCheckbox v-model="preferences.marketing" label="Allow marketing emails" />
              </div>
            </MaFormGroup>
          </div>
        </MaCard>
      </div>

      <div v-if="activeTab === 'security'" class="tab-content">
        <MaCard>
          <template #title>Security Settings</template>
          
          <div class="security-section">
            <h3 class="section-title">Change Password</h3>
            <MaRow :gutter="[24, 24]">
              <MaCol :span="12">
                <MaFormGroup label="Current Password" required>
                  <MaInput v-model="security.currentPassword" type="password" placeholder="Enter current password" />
                </MaFormGroup>
              </MaCol>
              <MaCol :span="12"></MaCol>
              <MaCol :span="12">
                <MaFormGroup label="New Password" required>
                  <MaInput v-model="security.newPassword" type="password" placeholder="Enter new password" />
                </MaFormGroup>
              </MaCol>
              <MaCol :span="12">
                <MaFormGroup label="Confirm New Password" required>
                  <MaInput v-model="security.confirmPassword" type="password" placeholder="Confirm new password" />
                </MaFormGroup>
              </MaCol>
            </MaRow>
            <div class="mt-4">
              <MaButton color="primary" @click="updatePassword">Update Password</MaButton>
            </div>
          </div>

          <div class="divider"></div>

          <div class="security-section">
            <div class="flex justify-between items-center">
              <div>
                <h3 class="section-title">Two-Factor Authentication</h3>
                <p class="text-muted">Add an extra layer of security to your account.</p>
              </div>
              <MaSwitch v-model="security.twoFactor" label="Enable 2FA" />
            </div>
            <div v-if="security.twoFactor" class="mt-4 p-4 bg-secondary rounded">
              <div class="flex items-center gap-4">
                <div class="qr-placeholder">
                  <MaIcon name="QrCode" :size="64" />
                </div>
                <div>
                  <p class="font-bold">Scan this QR code</p>
                  <p class="text-sm text-muted">Use an authenticator app like Google Authenticator or Authy.</p>
                </div>
              </div>
            </div>
          </div>

          <div class="divider"></div>

          <div class="security-section">
            <h3 class="section-title">Login History</h3>
            <MaTable :columns="loginHistoryColumns" :data="loginHistory">
              <template #cell(status)="{ value }">
                <MaBadge :color="value === 'Success' ? 'success' : 'danger'" pill>{{ value }}</MaBadge>
              </template>
            </MaTable>
          </div>
        </MaCard>
      </div>
    </MaTabs>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { usePermission } from 'my-admin-framework'

const { hasPermission } = usePermission()
const toast = inject('toast') as any
const activeTab = ref('general')

const tabs = [
  { label: 'General', value: 'general' },
  { label: 'Notifications', value: 'notifications' },
  { label: 'Security', value: 'security' },
  { label: 'Billing', value: 'billing' }
]

const profile = ref({
  name: 'Andy Admin',
  email: 'andy@example.com',
  role: 'Admin',
  bio: 'Administrator of MyAdminFramework.'
})

const preferences = ref({
  emailNotifications: true,
  desktopNotifications: false,
  publicProfile: true,
  theme: 'light',
  newsletter: true,
  marketing: false
})

const security = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  twoFactor: false
})

const loginHistoryColumns = [
  { key: 'date', label: 'Date & Time' },
  { key: 'ip', label: 'IP Address' },
  { key: 'device', label: 'Device' },
  { key: 'status', label: 'Status' }
]

const loginHistory = [
  { date: '2023-12-18 14:30', ip: '192.168.1.1', device: 'Chrome / Windows', status: 'Success' },
  { date: '2023-12-17 09:15', ip: '192.168.1.1', device: 'Chrome / Windows', status: 'Success' },
  { date: '2023-12-16 18:45', ip: '10.0.0.5', device: 'Safari / iPhone', status: 'Success' },
  { date: '2023-12-15 11:20', ip: '192.168.1.1', device: 'Firefox / Windows', status: 'Failed' },
]

const updatePassword = () => {
  if (security.value.newPassword !== security.value.confirmPassword) {
    toast({
      title: 'Error',
      message: 'Passwords do not match.',
      type: 'error'
    })
    return
  }
  
  toast({
    title: 'Password Updated',
    message: 'Your password has been changed successfully.',
    type: 'success'
  })
  security.value.currentPassword = ''
  security.value.newPassword = ''
  security.value.confirmPassword = ''
}

const saveProfile = () => {
  toast({
    title: 'Settings Saved',
    message: 'Your profile has been updated successfully.',
    type: 'success'
  })
}
</script>

<style scoped>
.page-header {
  margin-bottom: 32px;
}

.page-header h1 {
  font-size: 1.875rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: var(--ma-text-main);
}

.section-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--ma-text-main);
}

.divider {
  height: 1px;
  background-color: var(--ma-border-color);
  margin: 32px 0;
}

.security-section {
  margin-bottom: 24px;
}

.qr-placeholder {
  width: 80px;
  height: 80px;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
}

.bg-secondary {
  background-color: var(--ma-bg-secondary);
}

.rounded {
  border-radius: 8px;
}

.flex { display: flex; }
.justify-between { justify-content: space-between; }
.items-center { align-items: center; }
.gap-4 { gap: 16px; }
.mt-4 { margin-top: 16px; }
.p-4 { padding: 16px; }
.font-bold { font-weight: 700; }
.text-sm { font-size: 0.875rem; }


.page-header p {
  color: var(--ma-text-muted);
  margin: 0;
}

.tab-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
  max-width: 800px;
}

.settings-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.settings-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.settings-item-title {
  font-weight: 500;
  color: var(--ma-text-main);
  margin-bottom: 4px;
}

.settings-item-desc {
  font-size: 0.875rem;
  color: var(--ma-text-muted);
}

.settings-divider {
  height: 1px;
  background: var(--ma-border);
  margin: 24px 0;
}

.radio-group, .checkbox-group {
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
  padding: 10px 12px;
  border: 1px solid var(--ma-border);
  background: var(--ma-bg-page);
  color: var(--ma-text-main);
  border-radius: 8px;
  font-size: 0.875rem;
  outline: none;
  transition: border-color 0.2s;
  resize: vertical;
