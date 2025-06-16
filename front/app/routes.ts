import { type RouteConfig, index, layout, route } from '@react-router/dev/routes';

export default [
  layout('layouts/layout.tsx', [index('routes/page.tsx'), route('user/:id', 'routes/user/$id.tsx')]),
] satisfies RouteConfig;
