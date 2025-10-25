export const languages = {
  es: 'Español',
  en: 'English',
} as const;

export type Language = keyof typeof languages;

export const defaultLang: Language = 'es';

export const translations = {
  es: {
    // Header/Navigation
    nav: {
      home: 'Inicio',
      about: 'Nosotros',
      event: 'Evento',
      timeline: 'Nuestra Historia',
    },
    // Hero Section
    hero: {
      names: 'Anais & Rayko',
      withChild: 'con nuestro amado Armandito',
      date: '8 de Noviembre, 2025',
      clickPrompt: '✨ Haz clic para hacer brillar las estrellas ✨',
    },
    // Timeline
    timeline: {
      title: 'Nuestro Viaje Juntos',
      subtitle: 'Cada momento nos ha llevado aquí, a este hermoso capítulo de nuestras vidas',
      milestones: [
        {
          year: '~ 2022',
          title: 'Acercándonos',
          description:
            'Dos estrellas moviéndose por el vasto universo, orbitando en sus senderos, gravitando lentamente una hacia la otra.',
        },
        {
          year: 'diciembre 2022',
          title: 'Nos Encontramos',
          description:
            'Nuestros caminos se cruzaron y nuestras luces se tocaron por primera vez, creando una chispa que iluminaría nuestro viaje.',
        },
        {
          year: '2023',
          title: 'Navegamos Juntos',
          description:
            'Dos estrellas viajando juntas por el cosmos, compartiendo sueños y aventuras, creando nuestro propio universo.',
        },
        {
          year: 'marzo 2024',
          title: 'Nace Una Pequeña Estrella',
          description:
            'Nuestra mayor bendición llegó, Armandito. Una nueva estrella brillante se unió a nuestra constelación, completando nuestra familia.',
        },
        {
          year: 'junio 2025',
          title: 'La Promesa',
          description:
            'Bajo las estrellas, él propuso, con un anillo tan eterno como nuestro amor, viajar juntos por el universo.',
        },
        {
          year: 'noviembre 2025',
          title: 'Nuestro Día de Boda',
          description:
            'Unimos nuestros corazones en celebración, rodeando nuestra pequeña estrella, bailando juntos hacia la infinidad.',
        },
      ],
    },
    // Family Cards
    family: {
      title: 'Nuestra Familia',
      subtitle: 'Conoce a las personas que hacen este día tan especial',
      members: [
        {
          name: 'Rayko Azcue',
          bio: 'Un compañero amoroso y padre devoto, trae alegría a cada momento que compartimos juntos.',
        },
        {
          name: 'Anais Garcia',
          bio: 'Un alma hermosa con un corazón lleno de amor, crea calidez y felicidad en nuestro hogar cada día.',
        },
        {
          name: 'Gabriel Armando',
          bio: 'Nuestra mayor bendición, llena nuestras vidas con risas, asombro y amor infinito.',
        },
      ],
    },
    // Event Details
    event: {
      title: 'Nuestro Día Especial',
      downloadInvitation: 'Descargar Invitación',
      events: [
        {
          title: 'Ceremonia Religiosa',
          date: '8 de Noviembre, 2025',
          time: '4:00 PM',
          venue: 'Iglesia de la Virgen del Carmen',
          address: 'Calle Concha entre Cármen y Montaña, Cojimar, Habana del Este',
          dateLabel: 'Fecha',
          timeLabel: 'Hora',
          venueLabel: 'Lugar',
          mapUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.1!2d-82.2951519!3d23.1633146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88cd7f3147d55e69%3A0xba0f0a685c4a306b!2zSWdsZXNpYSBkZSBsYSBWaXJnZW4gZGVsIENhcm1lbg!5e0!3m2!1ses!2scu!4v1697220000000!5m2!1ses!2scu',
        },
        {
          title: 'Banquete de Boda',
          date: '8 de Noviembre, 2025',
          time: '6:00 PM',
          venue: 'La Yola, Casa de Fiestas',
          address: 'Calle Chacón esquina Los Pinos, Cojimar, Habana del Este',
          dateLabel: 'Fecha',
          timeLabel: 'Hora',
          venueLabel: 'Lugar',
          mapUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.1!2d-82.2958631!3d23.1652661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zTGEgWW9sYQ!5e0!3m2!1ses!2scu!4v1697220000000!5m2!1ses!2scu',
        },
      ],
      rsvpButton: 'Confirmar Asistencia',
    },
    // Footer
    footer: {
      tagline: 'Celebrando el amor y la familia',
      quickLinks: 'Enlaces Rápidos',
      home: 'Inicio',
      eventDetails: 'Detalles del Evento',
      ourStory: 'Nuestra Historia',
      connectWithUs: 'Conéctate Con Nosotros',
      contact: 'contacto@ejemplo.com',
      copyright: 'Todos los derechos reservados.',
      designedWith: 'Diseñado con ❤️ para nuestro día especial',
    },
  },
  en: {
    // Header/Navigation
    nav: {
      home: 'Home',
      about: 'About',
      event: 'Event',
      timeline: 'Our Story',
    },
    // Hero Section
    hero: {
      names: 'Anais & Rayko',
      withChild: 'with our beloved Armandito',
      date: 'November 8, 2025',
      clickPrompt: '✨ Click to make the stars shine ✨',
    },
    // Timeline
    timeline: {
      title: 'Our Journey Together',
      subtitle: 'Every moment has led us here, to this beautiful chapter of our lives',
      milestones: [
        {
          year: '~ 2022',
          title: 'Getting Closer',
          description:
            'Two stars moving through the vast universe, orbiting in their paths, slowly gravitating toward each other.',
        },
        {
          year: 'December 2022',
          title: 'We Met',
          description:
            'Our paths crossed and our lights touched for the first time, creating a spark that would illuminate our journey.',
        },
        {
          year: '2023',
          title: 'Sailing Together',
          description:
            'Two stars traveling together through the cosmos, sharing dreams and adventures, creating our own universe.',
        },
        {
          year: 'March 2024',
          title: 'A Little Star is Born',
          description:
            'Our greatest blessing arrived, Armandito. A new bright star joined our constellation, completing our family.',
        },
        {
          year: 'June 2025',
          title: 'The Promise',
          description:
            'Under the stars, he proposed, with a ring as eternal as our love, to journey together through the universe.',
        },
        {
          year: 'November 2025',
          title: 'Our Wedding Day',
          description:
            'We unite our hearts in celebration, surrounding our little star, dancing together toward infinity.',
        },
      ],
    },
    // Family Cards
    family: {
      title: 'Our Family',
      subtitle: 'Meet the people who make this day so special',
      members: [
        {
          name: 'Rayko Azcue',
          bio: 'A loving partner and devoted father, brings joy to every moment we share together.',
        },
        {
          name: 'Anais Garcia',
          bio: 'A beautiful soul with a heart full of love, creates warmth and happiness in our home every day.',
        },
        {
          name: 'Gabriel Armando',
          bio: 'Our greatest blessing, fills our lives with laughter, wonder and endless love.',
        },
      ],
    },
    // Event Details
    event: {
      title: 'Our Special Day',
      downloadInvitation: 'Download Invitation',
      events: [
        {
          title: 'Religious Ceremony',
          date: 'November 8, 2025',
          time: '4:00 PM',
          venue: 'Iglesia de la Virgen del Carmen',
          address: 'Concha Street between Carmen and Montaña, Cojimar, Havana del Este',
          dateLabel: 'Date',
          timeLabel: 'Time',
          venueLabel: 'Venue',
          mapUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.1!2d-82.2951519!3d23.1633146!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88cd7f3147d55e69%3A0xba0f0a685c4a306b!2zSWdsZXNpYSBkZSBsYSBWaXJnZW4gZGVsIENhcm1lbg!5e0!3m2!1sen!2scu!4v1697220000000!5m2!1sen!2scu',
        },
        {
          title: 'Wedding Banquet',
          date: 'November 8, 2025',
          time: '6:00 PM',
          venue: 'La Yola, Casa de Fiestas',
          address: 'Chacón Street corner of Los Pinos, Cojimar, Havana del Este',
          dateLabel: 'Date',
          timeLabel: 'Time',
          venueLabel: 'Venue',
          mapUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.1!2d-82.2958631!3d23.1652661!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zTGEgWW9sYQ!5e0!3m2!1sen!2scu!4v1697220000000!5m2!1sen!2scu',
        },
      ],
      rsvpButton: 'Confirm Attendance',
    },
    // Footer
    footer: {
      tagline: 'Celebrating love and family',
      quickLinks: 'Quick Links',
      home: 'Home',
      eventDetails: 'Event Details',
      ourStory: 'Our Story',
      connectWithUs: 'Connect With Us',
      contact: 'contacto@ejemplo.com',
      copyright: 'All rights reserved.',
      designedWith: 'Designed with ❤️ for our special day',
    },
  },
} as const;
