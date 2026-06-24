type ComingSoonConfig = {
  title: string
  description?: string
}

export const COMING_SOON_PAGES: Record<string, ComingSoonConfig> = {
  numerologia: {
    title: 'Numerologia',
    description:
      'Estamos construyendo esta seccion para reunir calculadoras, guias y recursos de lectura numerologica en una sola experiencia.'
  },
  vibraciondeltiempo: {
    title: 'Vibracion del Tiempo'
  },
  labrujulanumerologica: {
    title: 'La Brujula Numerologica'
  },
  etapapersonal: {
    title: 'Etapa Personal'
  },
  anopersonal: {
    title: 'Ano Personal'
  },
  mespersonal: {
    title: 'Mes Personal'
  },
  semanapersonal: {
    title: 'Semana Personal'
  },
  diapersonal: {
    title: 'Dia Personal'
  },
  vibracionescolectivas: {
    title: 'Vibraciones Colectivas'
  },
  calculatupinaculo: {
    title: 'Calcula tu Pinaculo'
  },
  significadodelosnumeros: {
    title: 'Significado de los Numeros'
  },
  numerologianombre: {
    title: 'Numerologia Nombre'
  },
  numerodelnombre: {
    title: 'Numero del Nombre'
  },
  numerodelalma: {
    title: 'Numero del Alma'
  },
  numerodeexpresiondelalma: {
    title: 'Numero de Expresion del Alma'
  },
  numerodelamadurez: {
    title: 'Numero de la Madurez'
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
    title: 'Horoscopos'
  },
  revisatuhoroscopomensual2026: {
    title: 'Revisa Tu Horoscopo Mensual 2026'
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
