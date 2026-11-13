import { useEffect } from 'react';

const activeLocks = new Set<string>();
let originalHtmlOverflow = '';
let originalBodyOverflow = '';
let originalHtmlOverscroll = '';
let originalBodyOverscroll = '';
let originalBodyPaddingRight = '';
let isLocked = false;

function applyLock() {
  if (isLocked || typeof document === 'undefined') return;

  const html = document.documentElement;
  const body = document.body;

  originalHtmlOverflow = html.style.overflow;
  originalBodyOverflow = body.style.overflow;
  originalHtmlOverscroll = html.style.overscrollBehavior;
  originalBodyOverscroll = body.style.overscrollBehavior;
  originalBodyPaddingRight = body.style.paddingRight;

  const scrollbarWidth = window.innerWidth - html.clientWidth;

  html.style.overflow = 'hidden';
  html.style.overscrollBehavior = 'none';
  body.style.overflow = 'hidden';
  body.style.overscrollBehavior = 'none';

  if (scrollbarWidth > 0) {
    const computedPadding = parseFloat(window.getComputedStyle(body).paddingRight) || 0;
    body.style.paddingRight = `${computedPadding + scrollbarWidth}px`;
  }

  isLocked = true;
}

function releaseLock() {
  if (!isLocked || typeof document === 'undefined') return;

  const html = document.documentElement;
  const body = document.body;

  html.style.overflow = originalHtmlOverflow;
  html.style.overscrollBehavior = originalHtmlOverscroll;
  body.style.overflow = originalBodyOverflow;
  body.style.overscrollBehavior = originalBodyOverscroll;
  body.style.paddingRight = originalBodyPaddingRight;

  isLocked = false;
}

export function lockScroll(id: string) {
  activeLocks.add(id);
  if (activeLocks.size > 0) {
    applyLock();
  }
}

export function unlockScroll(id: string) {
  activeLocks.delete(id);
  if (activeLocks.size === 0) {
    releaseLock();
  }
}

export function useScrollLock(id: string, active: boolean) {
  useEffect(() => {
    if (active) {
      lockScroll(id);
      return () => unlockScroll(id);
    }
    return undefined;
  }, [id, active]);
}
