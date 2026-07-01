const WA_NUMBER = "919500192418";
const WA_MESSAGE = "Thank you for choosing Sri Aishwarya Sarees. How may we help you today?";

export function WhatsAppFloat() {
  const href = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(WA_MESSAGE)}`;
  return (
    <a
      className="h-wa-float"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <span className="h-wa-pulse" aria-hidden="true" />
      <svg viewBox="0 0 32 32" width="30" height="30" aria-hidden="true">
        <path
          fill="#fff"
          d="M19.11 17.55c-.28-.14-1.65-.81-1.9-.9-.26-.1-.44-.14-.63.14-.19.28-.72.9-.88 1.09-.16.19-.32.21-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.66-1.55-1.94-.16-.28-.02-.44.12-.58.13-.13.28-.32.42-.49.14-.16.19-.28.28-.47.09-.19.05-.35-.02-.49-.07-.14-.63-1.52-.86-2.08-.23-.55-.46-.47-.63-.48l-.53-.01c-.19 0-.5.07-.76.35-.26.28-1 1-1 2.43s1.03 2.83 1.17 3.02c.14.19 2.02 3.08 4.89 4.31.68.29 1.22.47 1.63.6.69.22 1.31.19 1.8.11.55-.08 1.65-.68 1.88-1.33.23-.65.23-1.21.16-1.33-.07-.12-.25-.19-.53-.33ZM16.01 4c-6.63 0-12 5.37-12 12 0 2.11.55 4.16 1.6 5.97L4 28l6.19-1.62A11.94 11.94 0 0 0 16.01 28c6.63 0 12-5.37 12-12s-5.37-12-12-12Z"
        />
      </svg>
    </a>
  );
}
