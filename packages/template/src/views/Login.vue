<template>
  <div class="auth-container">
    <div class="auth-card">
      <div class="auth-header">
        <div class="auth-logo">MA</div>
        <h1>Welcome Back</h1>
        <p>Please enter your details to sign in.</p>
      </div>

      <form @submit.prevent="handleLogin" class="auth-form">
        <MaInput
          v-model="email"
          label="Email Address"
          type="email"
          placeholder="name@company.com"
          required
        />
        <MaInput
          v-model="password"
          label="Password"
          type="password"
          placeholder="••••••••"
          required
        />

        <div class="auth-options">
          <label class="remember-me">
            <input type="checkbox" v-model="rememberMe" />
            <span>Remember me</span>
          </label>
          <a href="#" class="forgot-password">Forgot password?</a>
        </div>

        <MaButton type="submit" color="primary" class="auth-submit" :loading="loading">
          Sign In
        </MaButton>
      </form>

      <div class="auth-footer">
        Don't have an account? <router-link to="/register">Sign up</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, inject } from 'vue'
import { useRouter } from 'vue-router'
import { usePermission } from 'my-admin-framework'

const router = useRouter()
const toast = inject('toast') as any
const { setPermissions } = usePermission()

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)

const handleLogin = async () => {
  loading.value = true
  // Simulate API call
  setTimeout(() => {
    loading.value = false
    localStorage.setItem('auth', 'true')
    
    // Set mock permissions
    // In a real app, these would come from the API response
    setPermissions(['user.read', 'user.write', 'settings.read'], ['admin'])
    
    toast({
      title: 'Login Successful',
      message: 'Welcome back to MyAdmin!',
      type: 'success'
    })
    router.push('/')
  }, 1000)
}
</script>

<style scoped>
.auth-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--ma-bg-page);
  padding: 24px;
}

.auth-card {
  background: var(--ma-bg-card);
  border: 1px solid var(--ma-border);
  border-radius: 24px;
  padding: 48px;
  width: 100%;
  max-width: 480px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
}

.auth-header {
  text-align: center;
  margin-bottom: 32px;
}

.auth-logo {
  background: var(--ma-primary);
  color: white;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  font-weight: 800;
  font-size: 1.25rem;
  margin: 0 auto 24px;
}

.auth-header h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 8px 0;
  color: var(--ma-text-main);
}

.auth-header p {
  color: var(--ma-text-muted);
  margin: 0;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.auth-options {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
}

.remember-me {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: var(--ma-text-muted);
}

.forgot-password {
  color: var(--ma-primary);
  text-decoration: none;
  font-weight: 600;
}

.auth-submit {
  width: 100%;
  padding: 12px;
}

.auth-footer {
  margin-top: 32px;
  text-align: center;
  font-size: 0.875rem;
  color: var(--ma-text-muted);
}

.auth-footer a {
  color: var(--ma-primary);
  text-decoration: none;
  font-weight: 600;
}
</style>
