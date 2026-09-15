<script lang="ts">
  import { resolve } from '$app/paths';

  const actions = [
    {
      title: 'Автомобили',
      text: 'Разгледай всички',
      cta: 'Разгледай',
      href: '/listing-grid',
      tone: 'blue',
      image: '/assets/images/lead/day-night-collection-banner-v2.webp',
      width: 1200,
      height: 668
    },
    {
      title: 'Продай / Бартер',
      text: 'Бърза оценка',
      cta: 'Заяви оценка',
      href: '/contact?topic=trade-in',
      tone: 'red',
      image: '/assets/images/lead/day-night-mobile-sell-v1.webp',
      width: 1200,
      height: 438
    },
    {
      title: 'Внос по заявка',
      text: 'Европа, САЩ, Канада',
      cta: 'Заяви внос',
      href: '/contact?topic=import',
      tone: 'ice',
      image: '/assets/images/lead/day-night-mobile-import-v1.webp',
      width: 1200,
      height: 450
    },
    {
      title: 'На лизинг',
      text: 'Гъвкави условия',
      cta: 'Виж условия',
      href: '/contact?topic=leasing',
      tone: 'dark',
      image: '/assets/images/template/menu-leasing-v2.webp',
      width: 1610,
      height: 977
    }
  ] as const;
</script>

<section class="dn-mobile-core-actions" aria-label="Основни услуги">
  <div class="dn-mobile-core-actions__grid">
    {#each actions as action (action.href)}
      <a class={`dn-mobile-core-card dn-mobile-core-card--${action.tone}`} href={resolve(action.href)}>
        <span class="dn-mobile-core-card__copy">
          <strong>{action.title}</strong>
          <small>{action.text}</small>
        </span>
        <span class="dn-mobile-core-card__art" aria-hidden="true">
          <img src={action.image} alt="" width={action.width} height={action.height} loading="lazy" decoding="async" />
        </span>
      </a>
    {/each}
  </div>
</section>

<style>
  .dn-mobile-core-actions { display: none; }

  @media (max-width: 767px) {
    .dn-mobile-core-actions {
      display: block;
      padding: 8px 12px 4px;
      background: var(--dn-mobile-canvas);
    }
    .dn-mobile-core-actions__grid {
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 8px;
    }

    .dn-mobile-core-card {
      position: relative;
      display: block;
      min-height: 158px;
      overflow: hidden;
      border-radius: 14px;
      color: #fff;
      isolation: isolate;
    }

    .dn-mobile-core-card--blue { background: linear-gradient(145deg, #135da8 0%, #0d3d72 100%); }
    .dn-mobile-core-card--red { background: linear-gradient(145deg, #d00832 0%, #9b001f 100%); }
    .dn-mobile-core-card--ice { background: linear-gradient(145deg, #e8f4ff 0%, #c8e3f8 100%); color: #15202c; }
    .dn-mobile-core-card--dark { background: linear-gradient(145deg, #23262b 0%, #111317 100%); }

    .dn-mobile-core-card__copy {
      position: relative;
      z-index: 3;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      padding: 11px 10px 0;
    }

    .dn-mobile-core-card strong {
      max-width: 100%;
      font-size: var(--dn-text-lead);
      font-weight: var(--dn-weight-semibold);
      line-height: var(--dn-leading-control);
      letter-spacing: var(--dn-tracking-heading);
      white-space: nowrap;
    }

    .dn-mobile-core-card small {
      display: block;
      max-width: 100%;
      margin-top: 3px;
      overflow: hidden;
      font-size: var(--dn-text-meta);
      font-weight: var(--dn-weight-regular);
      line-height: var(--dn-leading-meta);
      letter-spacing: var(--dn-tracking-normal);
      opacity: .92;
      white-space: nowrap;
    }

    .dn-mobile-core-card__art {
      position: absolute;
      z-index: 1;
      right: 0;
      bottom: 0;
      left: 0;
      height: 86px;
      pointer-events: none;
    }

    .dn-mobile-core-card__art img {
      position: absolute;
      bottom: -2px;
      left: 50%;
      display: block;
      width: 100%;
      max-width: none;
      height: 100%;
      object-fit: contain;
      object-position: center bottom;
      filter: drop-shadow(0 10px 14px rgb(0 0 0 / .22));
      transform: translateX(-50%);
    }

    .dn-mobile-core-card--blue .dn-mobile-core-card__art img { width: 106%; }
    .dn-mobile-core-card--red .dn-mobile-core-card__art img { width: 138%; }
    .dn-mobile-core-card--ice .dn-mobile-core-card__art img { width: 136%; }
    .dn-mobile-core-card--dark .dn-mobile-core-card__art img { width: 108%; }
    .dn-mobile-core-card:focus-visible { outline: 3px solid var(--dn-focus); outline-offset: 3px; }
  }

  @media (max-width: 340px) {
    .dn-mobile-core-card__copy { padding-inline: 8px; }

    .dn-mobile-core-card strong {
      font-size: var(--dn-text-body);
      letter-spacing: var(--dn-tracking-heading);
    }

    .dn-mobile-core-card small {
      font-size: var(--dn-text-caption);
      letter-spacing: var(--dn-tracking-normal);
    }
  }
</style>
