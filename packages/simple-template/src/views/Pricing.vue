<template>
  <div class="pricing-page">
    <div class="page-header">
      <h1>Simple, Transparent Pricing</h1>
      <p>Choose the plan that's right for you.</p>
    </div>

    <div class="pricing-grid">
      <MaPricingCard
        title="Starter"
        price="0"
        :features="['5 Projects', 'Community Support', 'Basic Analytics', '1GB Storage']"
        buttonText="Get Started"
        @select="selectPlan('starter')"
      />

      <MaPricingCard
        title="Pro"
        price="29"
        :features="['Unlimited Projects', 'Priority Support', 'Advanced Analytics', '10GB Storage', 'Custom Domain']"
        buttonText="Start Free Trial"
        highlighted
        @select="selectPlan('pro')"
      />

      <MaPricingCard
        title="Enterprise"
        price="99"
        :features="['Unlimited Everything', '24/7 Dedicated Support', 'Custom Integrations', 'SSO & Audit Logs', 'SLA Guarantee']"
        buttonText="Contact Sales"
        @select="selectPlan('enterprise')"
      />
    </div>

    <div class="faq-section">
      <h2>Frequently Asked Questions</h2>
      <MaAccordion v-model="activeFaq">
        <MaAccordionItem name="1" title="Can I cancel anytime?">
          <p>Yes, you can cancel your subscription at any time. We'll refund the unused portion of your current billing cycle.</p>
        </MaAccordionItem>
        <MaAccordionItem name="2" title="Do you offer a free trial?">
          <p>Absolutely! All paid plans come with a 14-day free trial, no credit card required.</p>
        </MaAccordionItem>
        <MaAccordionItem name="3" title="What payment methods do you accept?">
          <p>We accept all major credit cards (Visa, Mastercard, Amex) and PayPal.</p>
        </MaAccordionItem>
        <MaAccordionItem name="4" title="Can I switch plans later?">
          <p>Yes, you can upgrade or downgrade your plan at any time from your account settings.</p>
        </MaAccordionItem>
      </MaAccordion>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeFaq = ref('1')

const selectPlan = (plan: string) => {
  console.log('Selected plan:', plan)
  // Implement checkout logic here
}
</script>

<style scoped>
.pricing-page {
  padding: 80px 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 80px;
}

.page-header h1 {
  font-size: 3rem;
  font-weight: 800;
  margin-bottom: 16px;
  color: var(--ma-text-main);
}

.page-header p {
  font-size: 1.25rem;
  color: var(--ma-text-secondary);
}

.pricing-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px;
  margin-bottom: 100px;
}

.faq-section {
  max-width: 800px;
  margin: 0 auto;
}

.faq-section h2 {
  text-align: center;
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 48px;
  color: var(--ma-text-main);
}

.faq-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.faq-item h3 {
  font-size: 1.125rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: var(--ma-text-main);
}

.faq-item p {
  color: var(--ma-text-secondary);
  line-height: 1.6;
}

@media (max-width: 992px) {
  .pricing-grid {
    grid-template-columns: 1fr;
    max-width: 500px;
    margin-left: auto;
    margin-right: auto;
  }

  .faq-grid {
    grid-template-columns: 1fr;
  }
}
</style>
