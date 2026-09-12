<script lang="ts">
  import { resolve } from '$app/paths';
  import ArtworkRegion from '$components/ui/ArtworkRegion.svelte';
  import { vehicleArtwork } from '$data/vehicle-artwork';
  import { featuredVehicles } from '$data/inventory';

  const vehicleCount = (count: number) => `${count} ${count === 1 ? 'автомобил' : 'автомобила'}`;

  const allArtwork = { src: '/assets/images/lead/day-night-collection-banner-v2.webp', width: 1200, height: 668, crop: [0, 96, 1200, 500] as const };

  const budgetTiles = [
    {
      label: 'До 60 000 €',
      detail: vehicleCount(featuredVehicles.filter((vehicle) => vehicle.priceEur <= 60000).length),
      href: '/listing-grid?price_max=60000',
      artwork: vehicleArtwork.graphite
    },
    {
      label: '60–70 000 €',
      detail: vehicleCount(featuredVehicles.filter((vehicle) => vehicle.priceEur > 60000 && vehicle.priceEur <= 70000).length),
      href: '/listing-grid?price_min=60000&price_max=70000',
      artwork: vehicleArtwork.silver
    },
    {
      label: 'Над 70 000 €',
      detail: vehicleCount(featuredVehicles.filter((vehicle) => vehicle.priceEur > 70000).length),
      href: '/listing-grid?price_min=70000',
      artwork: vehicleArtwork.urus
    }
  ] as const;
</script>

<section class="dn-mobile-budget" aria-labelledby="mobile-budget-title">
  <div class="dn-mobile-section-heading">
    <h2 id="mobile-budget-title">По бюджет</h2>
  </div>

  <div class="dn-mobile-budget__grid">
    {#each budgetTiles as tile (tile.href)}
      <a class="dn-mobile-budget-card" href={resolve(tile.href)}>
        <span class="dn-mobile-budget-card__media">
          <ArtworkRegion artwork={{ ...tile.artwork, crop: [0, 100, 1000, 460] }} />
        </span>
        <span class="dn-mobile-budget-card__copy">
          <strong>{tile.label}</strong>
          <small>{tile.detail}</small>
        </span>
      </a>
    {/each}
    <a class="dn-mobile-budget-card dn-mobile-budget-card--all" href={resolve('/listing-grid')}>
      <span class="dn-mobile-budget-card__media">
        <ArtworkRegion artwork={allArtwork} />
      </span>
      <span class="dn-mobile-budget-card__copy">
        <strong>Всички</strong>
        <small>{vehicleCount(featuredVehicles.length)}</small>
      </span>
    </a>
  </div>
</section>

<style>
  .dn-mobile-budget { display: none; }
  @media (max-width: 767px) {
    .dn-mobile-budget { display: grid; gap: 10px; padding: 20px 12px 4px; background: var(--dn-mobile-canvas); }
    .dn-mobile-section-heading { min-height: 38px; }
    .dn-mobile-section-heading h2 { margin: 0; color: var(--dn-ink); font-size: 22px; line-height: 1.15; letter-spacing: -.025em; }
    .dn-mobile-budget__grid { display: grid; grid-template-columns: minmax(0, 1fr); gap: 8px; }
    .dn-mobile-budget-card { display: grid; grid-template-columns: minmax(0, 1fr) 46%; min-width: 0; min-height: 102px; align-items: center; overflow: hidden; border: 1px solid #e3e6ea; border-radius: 14px; background: var(--dn-mobile-surface); color: var(--dn-ink); }
    .dn-mobile-budget-card:focus-visible { outline: 3px solid var(--dn-red); outline-offset: 3px; }
    .dn-mobile-budget-card__media { grid-column: 2; grid-row: 1; display: flex; min-width: 0; height: 102px; align-items: center; justify-content: center; padding: 6px 8px 6px 0; }
    .dn-mobile-budget-card__media :global(.dn-artwork-region) { width: 100%; }
    .dn-mobile-budget-card__copy { grid-column: 1; grid-row: 1; display: flex; min-width: 0; flex-direction: column; gap: 4px; padding: 14px 4px 14px 15px; }
    .dn-mobile-budget-card__copy strong { font-size: 16px; font-weight: 750; line-height: 1.18; }
    .dn-mobile-budget-card__copy small { font-size: 11.5px; line-height: 1.25; opacity: .72; }
    .dn-mobile-budget-card--all .dn-mobile-budget-card__media :global(.dn-artwork-region) { width: 106%; }
  }
</style>
