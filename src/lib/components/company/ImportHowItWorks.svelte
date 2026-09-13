<script lang="ts">
  import { tick } from 'svelte';
  import Icon from '$components/ui/Icon.svelte';
  import { brand } from '$config/brand';

  let dialog: HTMLDialogElement;
  let trigger: HTMLButtonElement;
  let heading: HTMLHeadingElement;
  let dragStart = 0;
  let dragOffset = $state(0);
  let dragging = $state(false);
  const directionsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(brand.address)}`;

  async function openDrawer() {
    dragOffset = 0;
    dialog.showModal();
    await tick();
    heading.focus({ preventScroll: true });
  }

  function closeDrawer() {
    if (dialog?.open) dialog.close();
  }

  function handleClose() {
    dragOffset = 0;
    dragging = false;
    trigger?.isConnected && trigger.focus({ preventScroll: true });
  }

  function startPeekDrag(event: PointerEvent) {
    dragStart = event.clientY;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  }

  function endPeekDrag(event: PointerEvent) {
    if (dragStart - event.clientY > 22) {
      event.preventDefault();
      void openDrawer();
    }
    dragStart = 0;
  }

  function startSheetDrag(event: PointerEvent) {
    dragging = true;
    dragStart = event.clientY;
    (event.currentTarget as HTMLElement).setPointerCapture(event.pointerId);
  }

  function moveSheetDrag(event: PointerEvent) {
    if (!dragging) return;
    dragOffset = Math.max(0, event.clientY - dragStart);
  }

  function endSheetDrag() {
    if (!dragging) return;
    dragging = false;
    if (dragOffset > 72) closeDrawer();
    else dragOffset = 0;
  }
</script>

<div class="dn-import-info-drawer">
  <button
    class="dn-import-info-drawer__peek"
    type="button"
    bind:this={trigger}
    aria-haspopup="dialog"
    aria-label="Как протича вносът"
    onclick={openDrawer}
    onpointerdown={startPeekDrag}
    onpointerup={endPeekDrag}
  >
    <span class="dn-import-info-drawer__handle" aria-hidden="true"></span>
    <span>Как протича вносът</span>
    <Icon name="chevron-down" size={16} />
  </button>
</div>

<dialog
  class="dn-import-info-dialog"
  bind:this={dialog}
  aria-labelledby="import-info-title"
  onclose={handleClose}
  onclick={(event) => { if (event.target === event.currentTarget) closeDrawer(); }}
>
  <div class="dn-import-info-sheet" class:dragging style:transform={`translateY(${dragOffset}px)`}>
    <button
      class="dn-import-info-sheet__grabber"
      type="button"
      aria-label="Плъзни надолу, за да затвориш"
      onpointerdown={startSheetDrag}
      onpointermove={moveSheetDrag}
      onpointerup={endSheetDrag}
      onpointercancel={endSheetDrag}
    ><span></span></button>

    <header class="dn-import-info-sheet__header">
      <h2 id="import-info-title" tabindex="-1" bind:this={heading}>Как протича вносът</h2>
      <button class="dn-import-info-sheet__close" type="button" aria-label="Затвори" onclick={closeDrawer}>
        <Icon name="x" size={21} />
      </button>
    </header>

    <div class="dn-import-info-sheet__body">
      <section class="dn-import-info-group dn-import-info-prepare" aria-labelledby="import-prepare-title">
        <h3 id="import-prepare-title">Какво да подготвиш</h3>
        <div class="dn-import-info-list">
          <div><Icon name="globe" size={19} /><p><strong>Обява или модел</strong><span>Линк към обява или марка и модел.</span></p></div>
          <div><Icon name="tag" size={19} /><p><strong>Бюджет</strong><span>Ориентировъчна сума, ако имаш такава.</span></p></div>
          <div><Icon name="car" size={19} /><p><strong>Предпочитания</strong><span>Година, двигател и важни за теб екстри.</span></p></div>
        </div>
      </section>

      <section class="dn-import-info-group" aria-labelledby="import-next-title">
        <h3 id="import-next-title">Как продължаваме</h3>
        <ol class="dn-import-info-steps">
          <li><span>1</span><p><strong>Подготвяш запитването</strong><span>Преглеждаш данните, преди да ги споделиш.</span></p></li>
          <li><span>2</span><p><strong>Уточняваме търсенето</strong><span>Обсъждаме автомобила и бюджета с теб.</span></p></li>
          <li><span>3</span><p><strong>Избираме следващата стъпка</strong><span>Според автомобила и условията по сделката.</span></p></li>
        </ol>
      </section>

      <section class="dn-import-info-contact" aria-label="Контакт">
        <strong>{brand.phone}</strong>
        <span>{brand.addressLine}, {brand.city} · {brand.appointment}</span>
        <div class="dn-import-info-contact__actions">
          <a href={brand.phoneHref}><Icon name="phone" size={18} />Обади се</a>
          <a href={directionsUrl} target="_blank" rel="noreferrer"><Icon name="map-pin" size={18} />Маршрут</a>
        </div>
      </section>
    </div>
  </div>
</dialog>

<style>
  .dn-import-info-drawer { width: fit-content; margin: 16px auto 0; }
  .dn-import-info-drawer__peek {
    position: relative;
    display: inline-flex;
    min-height: 44px;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 9px 16px;
    border: 0;
    border-radius: var(--dn-radius-button);
    background: #fff;
    color: var(--dn-ink);
    font: inherit;
    font-size: 13px;
    font-weight: 700;
    cursor: pointer;
  }
  .dn-import-info-drawer__peek :global(svg) { transform: rotate(180deg); }
  .dn-import-info-drawer__peek:focus-visible { outline: 2px solid #171a1f; outline-offset: 3px; }
  .dn-import-info-drawer__handle { display: none; }

  :global(body:has(.dn-import-info-dialog[open])) { overflow: hidden; }
  :global(body:has(.dn-import-info-dialog[open]) .dn-mobile-bottom-nav) { visibility: hidden; pointer-events: none; }
  .dn-import-info-dialog {
    width: min(620px, calc(100% - 28px));
    max-width: none;
    max-height: min(640px, 74dvh);
    margin: auto;
    padding: 0;
    border: 0;
    border-radius: 24px;
    background: transparent;
    color: var(--dn-ink);
    overflow: visible;
  }
  .dn-import-info-dialog::backdrop { background: rgba(8,10,14,.52); backdrop-filter: blur(3px); }
  .dn-import-info-sheet {
    display: flex;
    max-height: min(640px, 74dvh);
    flex-direction: column;
    overflow: hidden;
    border: 0;
    border-radius: 24px;
    background: #fff;
    box-shadow: none;
    transition: transform 180ms cubic-bezier(.2,.8,.2,1);
  }
  .dn-import-info-sheet.dragging { transition: none; }
  .dn-import-info-sheet__grabber {
    display: grid;
    width: 100%;
    min-height: 24px;
    place-items: center;
    padding: 7px 0 2px;
    border: 0;
    background: #fff;
    cursor: grab;
    touch-action: none;
  }
  .dn-import-info-sheet__grabber span { width: 42px; height: 4px; border-radius: 999px; background: #737a84; }
  .dn-import-info-sheet__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px;
    padding: 4px 20px 14px;
    background: #fff;
  }
  .dn-import-info-sheet__header h2 { margin: 0; color: var(--dn-ink); font-size: 23px; font-weight: 600; line-height: 1.15; letter-spacing: -.025em; }
  .dn-import-info-sheet__header h2:focus { outline: none; }
  .dn-import-info-sheet__close {
    display: grid;
    width: 44px;
    height: 44px;
    flex: 0 0 44px;
    place-items: center;
    border: 0;
    border-radius: 50%;
    background: #f1f2f4;
    color: var(--dn-ink);
    cursor: pointer;
  }
  .dn-import-info-sheet__body {
    display: grid;
    min-height: 0;
    gap: 18px;
    padding: 0 16px 20px;
    overflow-y: auto;
    background: #fff;
    color: var(--dn-ink);
    overscroll-behavior: contain;
  }
  .dn-import-info-group { display: grid; gap: 10px; }
  .dn-import-info-group h3 { margin: 0; color: var(--dn-ink); font-size: 16px; font-weight: 600; line-height: 1.4; text-align: left; }
  .dn-import-info-list { display: grid; gap: 12px; margin: 0; padding: 0; background: transparent; }
  .dn-import-info-list > div {
    display: grid;
    grid-template-columns: 24px minmax(0,1fr);
    align-items: center;
    gap: 10px;
    min-height: 50px;
    padding: 0;
    border-radius: 0;
    background: transparent;
  }
  .dn-import-info-list > div > :global(svg) { width: 20px; height: 20px; margin: 2px 0 0; align-self: start; color: #626873; }
  .dn-import-info-list p,
  .dn-import-info-steps p { display: grid; gap: 2px; margin: 0; }
  .dn-import-info-list strong,
  .dn-import-info-steps strong { color: var(--dn-ink); font-size: 15px; font-weight: 600; line-height: 1.4; }
  .dn-import-info-list p > span,
  .dn-import-info-steps p > span { color: #626873; font-size: 14px; line-height: 1.45; }
  .dn-import-info-steps { display: grid; gap: 12px; margin: 0; padding: 0; background: transparent; list-style: none; }
  .dn-import-info-steps li { display: grid; grid-template-columns: 28px minmax(0,1fr); align-items: start; gap: 12px; min-height: 50px; padding: 0 0 12px; border-bottom: 1px solid #e7e9ed; background: transparent; }  .dn-import-info-steps li > span {
    display: grid;
    width: 28px;
    height: 28px;
    place-items: center;
    border-radius: 50%;
    background: #f1f2f4;
    color: var(--dn-ink);
    font-size: 13px;
    font-weight: 750;
  }
  .dn-import-info-contact { display: grid; gap: 5px; padding: 16px 0 0; border-top: 1px solid #e7e9ed; text-align: center; }
  .dn-import-info-contact > strong { color: var(--dn-ink); font-size: 18px; line-height: 1.3; }
  .dn-import-info-contact > span { color: #626873; font-size: 14px; line-height: 1.5; }
  .dn-import-info-contact__actions { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 9px; }
  .dn-import-info-contact__actions a {
    display: inline-flex;
    min-height: 44px;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 9px 12px;
    border-radius: var(--dn-radius-button);
    font-size: 13px;
    font-weight: 700;
    text-decoration: none;
  }
  .dn-import-info-contact__actions a:first-child { background: var(--dn-red); color: #fff; }
  .dn-import-info-contact__actions a:first-child:hover { background: var(--dn-red-hover); }
  .dn-import-info-contact__actions a:last-child:hover { background: #f1f2f4; }
  .dn-import-info-contact__actions a:last-child { border: 1px solid #dfe2e7; background: transparent; color: var(--dn-ink); }

  .dn-import-info-prepare { padding: 16px; border-radius: 16px; background: #f4f5f7; color: var(--dn-ink); gap: 14px; }
  .dn-import-info-prepare h3 { color: var(--dn-ink); }
  .dn-import-info-prepare strong { color: var(--dn-ink); }
  .dn-import-info-prepare p > span { color: #626873; }
  .dn-import-info-prepare .dn-import-info-list > div > :global(svg) { color: var(--dn-red); }
  .dn-import-info-prepare .dn-import-info-list > div + div { border-top: 1px solid #e7e9ed; padding-top: 10px; }
  .dn-import-info-steps li:last-child { border-bottom: 0; padding-bottom: 0; }
  .dn-import-info-sheet__header, .dn-import-info-sheet__grabber { flex-shrink: 0; }
  @media (max-width: 767px) {
    .dn-import-info-drawer {
      position: fixed;
      left: 50%;
      bottom: calc(var(--dn-mobile-nav-height) + env(safe-area-inset-bottom));
      z-index: 1890;
      width: min(300px, calc(100% - 48px));
      margin: 0;
      transform: translateX(-50%);
    }
    .dn-import-info-drawer__peek {
      width: 100%;
      min-height: 52px;
      padding: 14px 14px 7px;
      border-radius: 16px 16px 0 0;
      border: 1px solid #e0e3e7;
      border-bottom: 0;
      box-shadow: none;
    }
    .dn-import-info-drawer__handle {
      position: absolute;
      top: 6px;
      left: 50%;
      display: block;
      width: 34px;
      height: 3px;
      border-radius: 999px;
      background: #8b9199;
      transform: translateX(-50%);
    }
    .dn-import-info-dialog {
      inset: auto 0 0;
      width: 100%;
      max-height: calc(100dvh - max(24px, env(safe-area-inset-top)));
      margin: 0;
      border-radius: 24px 24px 0 0;
    }
    .dn-import-info-sheet {
      max-height: calc(100dvh - max(24px, env(safe-area-inset-top)));
      border-radius: 24px 24px 0 0;
    }
    .dn-import-info-sheet__header { padding: 4px 16px 12px; }
    .dn-import-info-sheet__header h2 { font-size: 21px; }
    .dn-import-info-sheet__body { gap: 18px; padding: 0 16px max(18px, env(safe-area-inset-bottom)); }
  }

  @media (max-width: 374px) {
    .dn-import-info-drawer__peek { font-size: 12px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .dn-import-info-sheet { transition: none; }
  }
</style>
