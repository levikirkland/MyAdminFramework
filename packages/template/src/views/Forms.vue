<script setup lang="ts">
import { useForm, MaCard, MaFormGroup, MaInput, MaButton, MaTreeSelect, MaRow, MaCol } from 'my-admin-framework'

const departments = [
  {
    id: '1',
    label: 'Engineering',
    children: [
      { id: '1-1', label: 'Frontend' },
      { id: '1-2', label: 'Backend' },
      { id: '1-3', label: 'DevOps' },
    ],
  },
  {
    id: '2',
    label: 'HR',
    children: [
      { id: '2-1', label: 'Recruiting' },
      { id: '2-2', label: 'Employee Relations' },
    ],
  },
  {
    id: '3',
    label: 'Sales',
    children: [
      { id: '3-1', label: 'North America' },
      { id: '3-2', label: 'Europe' },
    ],
  },
]

const { form, errors, isSubmitting, handleSubmit, reset } = useForm({
  name: '',
  email: '',
  age: undefined as number | undefined,
  department: '',
  website: '',
}, {
  name: { required: true, message: 'Name is required' },
  email: { required: true, email: true, message: 'Please enter a valid email' },
  age: { required: true, min: 18, message: 'You must be at least 18 years old' },
  department: { required: true, message: 'Please select a department' },
  website: { 
    pattern: /^https?:\/\/.+/, 
    message: 'Website must start with http:// or https://' 
  }
})

const onSubmit = handleSubmit(async (values) => {
  // Simulate API call
  await new Promise(resolve => setTimeout(resolve, 1000))
  alert(JSON.stringify(values, null, 2))
})
</script>

<template>
  <div class="forms-view">
    <div class="page-header">
      <h1>Form Validation & Tree Select</h1>
      <p class="text-muted">Demonstrating the useForm composable and MaTreeSelect component</p>
    </div>

    <MaRow :gutter="20">
      <MaCol :span="12">
        <MaCard title="Registration Form">
          <form @submit.prevent="onSubmit">
            <MaFormGroup label="Full Name" :error="errors.name" required>
              <MaInput v-model="form.name" placeholder="John Doe" />
            </MaFormGroup>

            <MaFormGroup label="Email Address" :error="errors.email" required>
              <MaInput v-model="form.email" placeholder="john@example.com" />
            </MaFormGroup>

            <MaFormGroup label="Age" :error="errors.age" required>
              <MaInput v-model.number="form.age" type="number" placeholder="25" />
            </MaFormGroup>

            <MaFormGroup label="Department" :error="errors.department" required>
              <MaTreeSelect
                v-model="form.department"
                :data="departments"
                placeholder="Select Department"
              />
            </MaFormGroup>

            <MaFormGroup label="Website" :error="errors.website">
              <MaInput v-model="form.website" placeholder="https://example.com" />
            </MaFormGroup>

            <div class="form-actions">
              <MaButton type="primary" native-type="submit" :loading="isSubmitting">
                Submit Registration
              </MaButton>
              <MaButton @click="reset" :disabled="isSubmitting">
                Reset
              </MaButton>
            </div>
          </form>
        </MaCard>
      </MaCol>

      <MaCol :span="12">
        <MaCard title="Form State">
          <pre class="code-block">{{ form }}</pre>
          
          <h4 class="mt-4">Errors</h4>
          <pre class="code-block text-danger">{{ errors }}</pre>
        </MaCard>
      </MaCol>
    </MaRow>
  </div>
</template>

<style scoped>
.forms-view {
  padding: 20px;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  margin: 0 0 8px 0;
  font-size: 24px;
  font-weight: 600;
  color: var(--ma-text-primary);
}

.text-muted {
  color: var(--ma-text-secondary);
  margin: 0;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 24px;
}

.code-block {
  background-color: var(--ma-bg-secondary);
  padding: 12px;
  border-radius: 6px;
  font-family: monospace;
  font-size: 13px;
  overflow-x: auto;
}

.text-danger {
  color: var(--ma-error);
}

.mt-4 {
  margin-top: 16px;
}
</style>