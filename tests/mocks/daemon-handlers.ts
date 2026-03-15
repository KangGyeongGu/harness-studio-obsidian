// MSW request handlers for daemon HTTP API — populated when implementing API layer tests
import { http, HttpResponse } from 'msw';

export const handlers = [
  // Example: http.get('/api/v1/ssot/contracts/annotations', () => HttpResponse.json({ ... })),
  http.all('*', () => {
    return HttpResponse.json({ status: 'not_implemented' }, { status: 501 });
  }),
];
