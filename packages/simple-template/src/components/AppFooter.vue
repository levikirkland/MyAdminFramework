<template>
  <footer class="app-footer">
    <div class="footer-content">
      <div class="footer-col">
        <h3>Simple Template</h3>
        <p>A modern starting point for your next project.</p>
      </div>
      <div class="footer-col">
        <h4>Product</h4>
        <a href="#">Features</a>
        <a href="#">Pricing</a>
        <a href="#">Showcase</a>
      </div>
      <div class="footer-col">
        <h4>Resources</h4>
        <a href="#">Documentation</a>
        <a href="#">API Reference</a>
        <a href="#">Blog</a>
      </div>
      <div class="footer-col">
        <h4>Company</h4>
        <a href="#">About</a>
        <a href="#">Careers</a>
        <a href="#">Contact</a>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; 2026 Simple Template. All rights reserved.</p>
    </div>
  </footer>
</template>

<style scoped>
.app-footer {
  background-color: var(--ma-bg-header, #fff);
  border-top: 1px solid var(--ma-border, #e5e7eb);
  padding: 64px 24px 24px;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

.footer-col h3 {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 16px;
  color: var(--ma-primary);
}

.footer-col h4 {
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 16px;
  color: var(--ma-text-main);
}

.footer-col p {
  color: var(--ma-text-secondary);
  line-height: 1.6;
}

.footer-col a {
  display: block;
  color: var(--ma-text-secondary);
  margin-bottom: 12px;
  text-decoration: none;
  transition: color 0.2s;
}

.footer-col a:hover {
  color: var(--ma-primary);
}

.footer-bottom {
  max-width: 1200px;
  margin: 0 auto;
  padding-top: 24px;
  border-top: 1px solid var(--ma-border, #e5e7eb);
  text-align: center;
  color: var(--ma-text-secondary);
  font-size: 0.875rem;
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
    gap: 32px;
  }
}
</style>
