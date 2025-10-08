import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

// ✅ Initialize next-intl middleware
const intlMiddleware = createMiddleware(routing);

export default intlMiddleware;


export const config = {
    matcher: ['/((?!_next|api|trpc|.*\\..*).*)'],
  };
  