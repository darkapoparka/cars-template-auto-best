<script lang="ts">
  import type { Snippet } from 'svelte';
  import type { ContactTopicId } from '$data/company';
  import { leadSite } from '$config/lead-site';
  import Header from './Header.svelte';
  import Footer from './Footer.svelte';

  type ShellRoute = 'home' | 'listing' | 'vehicle-detail' | 'contact' | 'about' | 'blog' | 'content';
  interface Props {
    children: Snippet;
    route?: ShellRoute;
    workflowJourney?: boolean;
    contactTopic?: ContactTopicId | null;
    showFooterActions?: boolean;
    showMobileFooter?: boolean;
  }

  let { children, route = 'content', workflowJourney = false, contactTopic = null, showFooterActions = true, showMobileFooter = false }: Props = $props();
  const mainLayout = $derived(['home', 'listing', 'contact', 'about', 'blog'].includes(route) ? 'flush' : 'default');
  const mobileBottom = $derived(showMobileFooter ? 'footer' : route === 'vehicle-detail' ? 'detail' : 'nav');
</script>

<div
  class="dn-app-shell"
  data-route={route}
  data-contact-topic={contactTopic ?? undefined}
  data-journey={workflowJourney ? 'workflow' : undefined}
  data-mobile-bottom={mobileBottom}
  style:--dn-red={leadSite.theme.accent}
  style:--dn-red-hover={leadSite.theme.accentHover}
  style:--dn-workflow-canvas={leadSite.theme.workflowCanvas}
  style:--dn-theme-accent-rgb={leadSite.theme.accentRgb}
  style:--dn-theme-hero-surface={leadSite.theme.heroSurface}
  style:--dn-theme-hero-surface-deep={leadSite.theme.heroSurfaceDeep}
  style:--dn-theme-hero-surface-mid={leadSite.theme.heroSurfaceMid}
  style:--dn-theme-hero-accent-deep={leadSite.theme.heroAccentDeep}
  style:--dn-theme-contact-surface={leadSite.theme.contactSurface}
  style:--dn-theme-contact-surface-end={leadSite.theme.contactSurfaceEnd}
  style:--dn-theme-campaign-surface={leadSite.theme.campaignSurface}
  style:--dn-theme-campaign-accent={leadSite.theme.campaignAccent}
  style:--dn-theme-blog-hero-surface={leadSite.theme.blogHeroSurface}
  style:--dn-theme-action-blue-start={leadSite.theme.actionTones.blue[0]}
  style:--dn-theme-action-blue-end={leadSite.theme.actionTones.blue[1]}
  style:--dn-theme-action-red-start={leadSite.theme.actionTones.red[0]}
  style:--dn-theme-action-red-end={leadSite.theme.actionTones.red[1]}
  style:--dn-theme-action-ice-start={leadSite.theme.actionTones.ice[0]}
  style:--dn-theme-action-ice-end={leadSite.theme.actionTones.ice[1]}
  style:--dn-theme-action-ice-ink={leadSite.theme.actionTones.iceInk}
  style:--dn-theme-action-dark-start={leadSite.theme.actionTones.dark[0]}
  style:--dn-theme-action-dark-end={leadSite.theme.actionTones.dark[1]}
>
  <a class="dn-skip-link" href="#main-content">Към съдържанието</a>
  <Header />
  <main id="main-content" data-layout={mainLayout} tabindex="-1">{@render children()}</main>
  <Footer showActions={showFooterActions} {showMobileFooter} />
</div>
