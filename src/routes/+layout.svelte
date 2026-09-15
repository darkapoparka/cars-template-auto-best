<script lang="ts">
  import '@fontsource-variable/onest';
  import { template, canIndex } from '$config/template';
  import '../app.css';
  import { page } from '$app/state';
  import SiteShell from '$components/layout/SiteShell.svelte';
  import type { Snippet } from 'svelte';
  import { resolveContactTopic } from '$data/company';

  let { children }: { children: Snippet } = $props();
  const showFooterActions = $derived(page.url.pathname !== '/');
  const showMobileFooter = $derived(page.url.pathname === '/' || page.url.pathname === '/about-us');
  const contactTopic = $derived(page.url.pathname === '/contact' ? resolveContactTopic(page.url.searchParams.get('topic')).id : null);
  const workflowJourney = $derived(page.url.pathname === '/contact' && (contactTopic === 'trade-in' || contactTopic === 'import'));
  const shellRoute = $derived.by(() => {
    const path = page.url.pathname;
    if (path === '/') return 'home' as const;
    if (path === '/listing-grid') return 'listing' as const;
    if (path.startsWith('/listing-detail-v1/')) return 'vehicle-detail' as const;
    if (path === '/contact') return 'contact' as const;
    if (path === '/about-us') return 'about' as const;
    if (path === '/blog') return 'blog' as const;
    return 'content' as const;
  });
  $effect(() => {
    document.documentElement.classList.toggle('dn-html--workflow', workflowJourney);
    return () => document.documentElement.classList.remove('dn-html--workflow');
  });
  const indexable = canIndex();
  const canonicalUrl = $derived(template.canonicalOrigin ? `${template.canonicalOrigin}${page.url.pathname}` : null);
</script>

<svelte:body class:dn-body--workflow={workflowJourney} />
<svelte:head>
  {#if canonicalUrl}<link rel="canonical" href={canonicalUrl} />{/if}
  {#if !indexable}<meta name="robots" content="noindex, nofollow" />{/if}
</svelte:head>

<SiteShell route={shellRoute} {contactTopic} {workflowJourney} {showFooterActions} {showMobileFooter}>
  {@render children()}
</SiteShell>
