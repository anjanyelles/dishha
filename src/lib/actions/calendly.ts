import type { ActionReturn } from 'svelte/action';

function loadCalendly() {
  return new Promise((resolve, reject) => {
    if (window.calendy) {
      return resolve(true);
    }

    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;

    script.onload = resolve;
    script.onerror = reject;

    script.async = true;
    document.body.appendChild(script);
  });
}

export const calendlyForm = (node: HTMLElement, { id }: { id: string }): ActionReturn<unknown> => {
  const init = async () => {
    node.ariaBusy = 'true';
    loadCalendly()
      .then(() => {
        window?.calendy?.forms?.create({
          target: `#calendly-form-${id}`
        });
      })
      .finally(() => {
        node.ariaBusy = 'false';
        node.dispatchEvent(new CustomEvent('complete'));
      });
  };

  init();

  return {};
};
