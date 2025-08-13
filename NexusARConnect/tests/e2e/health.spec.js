// @ts-check
const { test, expect } = require('@playwright/test');

test.describe('API health endpoint', () => {
  test('should return status ok', async ({ request }) => {
    const base = process.env.BASE_URL || 'http://localhost:3000';
    const res = await request.get(`${base}/api/health`);
    expect(res.ok()).toBeTruthy();
    const data = await res.json();
    expect(data.status).toBe('ok');
    expect(typeof data.timestamp).toBe('number');
  });
});
