import { useEffect } from 'react';
import logoImage from 'figma:asset/icon.png';

export function Favicon() {
  useEffect(() => {
    // Update or create favicon link
    let link = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
    }
    link.href = logoImage;
  }, []);

  return null;
}
