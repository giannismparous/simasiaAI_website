#!/usr/bin/env node
/**
 * Browser test for SimasiaAI contact forms (EmailJS).
 * Usage: node scripts/test_contact_forms.mjs
 */
import { chromium } from 'playwright';

const PAGES = [
  { name: 'Homepage', url: 'https://simasiaai.gr/#contact' },
  { name: 'Book Demo', url: 'https://simasiaai.gr/book-demo' },
  { name: 'Solutions', url: 'https://simasiaai.gr/solutions' },
];

async function testPage(page, { name, url }) {
  const result = { name, url, ok: false, detail: '' };
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    await page.waitForSelector('#contact form.contact-form', { timeout: 15000 });

    const section = page.locator('#contact');
    await section.scrollIntoViewIfNeeded();

    await section.locator('#firstName').fill('Test');
    await section.locator('#lastName').fill('SimasiaAI');
    await section.locator('#email').fill('test@simasiaai.gr');
    await section.locator('#organizationType').selectOption({ index: 1 });
    await section.locator('#companyName').fill('Automated test - please ignore');
    await section.locator('#description').fill(
      `[TEST] Contact form check on ${name} — ${new Date().toISOString()}`
    );

    const emailJsPromise = page.waitForResponse(
      (res) =>
        res.url().includes('api.emailjs.com/api/v1.0/email/send') &&
        res.request().method() === 'POST',
      { timeout: 30000 }
    );

    await section.locator('button[type="submit"]').click();

    const emailRes = await emailJsPromise;
    const body = await emailRes.text().catch(() => '');
    result.httpStatus = emailRes.status();

    if (emailRes.status() === 200) {
      result.ok = true;
      result.detail = 'EmailJS accepted submission (200)';
    } else {
      result.detail = `EmailJS HTTP ${emailRes.status()}: ${body.slice(0, 200)}`;
    }

    const msg = section.locator('.submit-message');
    if (await msg.count()) {
      result.uiMessage = (await msg.textContent())?.trim() || '';
      result.uiClass = (await msg.getAttribute('class')) || '';
    }
  } catch (err) {
    result.detail = err.message;
  }
  return result;
}

async function main() {
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      userAgent:
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    });
    const page = await context.newPage();

    console.log('Testing SimasiaAI contact forms (browser + EmailJS)...\n');
    const results = [];
    for (const p of PAGES) {
      console.log(`→ ${p.name} (${p.url})`);
      const r = await testPage(page, p);
      results.push(r);
      console.log(
        r.ok ? `  ✓ OK — ${r.detail}` : `  ✗ FAIL — ${r.detail}`
      );
      if (r.uiMessage) console.log(`  UI: ${r.uiMessage}`);
      console.log('');
    }

    const passed = results.filter((r) => r.ok).length;
    console.log(`Summary: ${passed}/${results.length} passed`);
    process.exit(passed === results.length ? 0 : 1);
  } catch (err) {
    if (err.message?.includes("Cannot find module 'playwright'")) {
      console.error('Install playwright first: npx playwright install chromium');
    }
    console.error(err);
    process.exit(2);
  } finally {
    if (browser) await browser.close();
  }
}

main();
