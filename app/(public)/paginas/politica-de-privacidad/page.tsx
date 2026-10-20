import { permanentRedirect } from 'next/navigation'

export default function PrivacyRedirectPage() {
  permanentRedirect('/paginas/aviso-de-privacidad')
}
