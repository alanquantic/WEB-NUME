type ComingSoonConfig = {
  title: string
  description?: string
}

export const COMING_SOON_PAGES: Record<string, ComingSoonConfig> = {
  numerologia: {
    title: 'Numerología',
    description:
      'Estamos construyendo esta sección para reunir calculadoras, guías y recursos de lectura numerológica en una sola experiencia.'
  },
  vibraciondeltiempo: {
    title: 'Vibración del Tiempo'
  },
  labrujulanumerologica: {
    title: 'La Brújula Numerológica'
  },
  etapapersonal: {
    title: 'Etapa Personal'
  },
  anopersonal: {
    title: 'Año Personal'
  },
  mespersonal: {
    title: 'Mes Personal'
  },
  semanapersonal: {
    title: 'Semana Personal'
  },
  diapersonal: {
    title: 'Día Personal'
  },
  vibracionescolectivas: {
    title: 'Vibraciones Colectivas'
  },
  calculatupinaculo: {
    title: 'Calcula tu Pináculo'
  },
  significadodelosnumeros: {
    title: 'Significado de los Números'
  },
  numerologianombre: {
    title: 'Numerología Nombre'
  },
  numerodelnombre: {
    title: 'Número del Nombre'
  },
  numerodelalma: {
    title: 'Número del Alma'
  },
  numerodeexpresiondelalma: {
    title: 'Número de Expresión del Alma'
  },
  numerodelamadurez: {
    title: 'Número de la Madurez'
  },
  significadodeletras: {
    title: 'Significado de Letras'
  },
  nombreactivo: {
    title: 'Nombre Activo'
  },
  nombrehereditario: {
    title: 'Nombre Hereditario'
  },
  horoscopos: {
    title: 'Horóscopos'
  },
  revisatuhoroscopomensual2026: {
    title: 'Revisa tu horóscopo mensual 2026'
  },
  consultores: {
    title: 'Consultores'
  },
  instructores: {
    title: 'Instructores'
  },
  cursos: {
    title: 'Cursos'
  }
}

export type ComingSoonSlug = keyof typeof COMING_SOON_PAGES
