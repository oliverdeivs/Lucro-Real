'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Locale = 'pt' | 'es'

interface LocaleConfig {
  locale: string
  currency: string
  symbol: string
}

export const localeConfig: Record<Locale, LocaleConfig> = {
  pt: { locale: 'pt-BR', currency: 'BRL', symbol: 'R$' },
  es: { locale: 'es-MX', currency: 'MXN', symbol: 'MX$' },
}

const dict: Record<Locale, Record<string, string>> = {
  pt: {
    // NAV + HEADER
    'nav.calculadora': 'Calculadora',
    'nav.dashboard': 'Dashboard',
    'nav.comprar': 'Comprar {price}',

    // FOOTER
    'footer.desc': 'A ferramenta mais simples para motoristas de aplicativo descobrirem seu lucro real por corrida.',
    'footer.produto': 'Produto',
    'footer.funcionalidades': 'Funcionalidades',
    'footer.preco': 'Preço',
    'footer.suporte': 'Suporte',
    'footer.termos': 'Termos de Uso',
    'footer.privacidade': 'Privacidade',
    'footer.fale': 'Fale Conosco',
    'footer.copyright': '© 2026 LucroReal. Todos os direitos reservados.',

    // HERO
    'hero.nav_calc': 'Calculadora',
    'hero.nav_dep': 'Depoimentos',
    'hero.comprar_btn': 'Comprar',
    'hero.badge': '+1.500 motoristas já usam',
    'hero.title1': 'Você sabe quanto',
    'hero.title2': 'realmente lucra',
    'hero.title3': 'por corrida?',
    'hero.text1': 'A maioria dos motoristas',
    'hero.text2': 'acha que está lucrando',
    'hero.text3': 'mas depois de combustível, manutenção e desgaste,',
    'hero.text4': 'está perdendo dinheiro',
    'hero.text5': 'sem saber.',
    'hero.text6': 'Descubra em',
    'hero.text7': '5 segundos',
    'hero.cta': 'Calcular Meu Lucro Agora',
    'hero.como': 'Como Funciona',
    'hero.demo.calc': 'Calculadora',
    'hero.demo.live': 'Ao vivo • Demo',
    'hero.demo.valor': 'Valor recebido',
    'hero.demo.km': 'KM rodados',
    'hero.demo.comb': 'Combustível',
    'hero.demo.lucro': 'Lucro real',
    'hero.demo.f_msg': 'Prejuízo! Essa corrida está te custando dinheiro.',
    'hero.demo.d_msg': 'Margem muito baixa. Quase no prejuízo.',
    'hero.demo.c_msg': 'Margem razoável. Dá pra melhorar.',
    'hero.demo.b_msg': 'Boa corrida! Vale a pena.',
    'hero.stat1': 'Motoristas no Brasil',
    'hero.stat2': 'Estão endividados',
    'hero.stat3': 'Por dia dirigindo',
    'hero.stat4': 'Dependem só do app',
    'hero.sabia': 'Você sabia?',
    'hero.sabia_msg': '70% dos motoristas não controlam seus gastos e 67% estão endividados.',

    // BENEFITS
    'benefits.badge': 'FUNCIONALIDADES',
    'benefits.title': 'Por que todo motorista precisa disso?',
    'benefits.sub': 'Você pode estar trabalhando de graça e nem sabe. O LucroReal te mostra a verdade em segundos.',
    'benefits.1.title': 'Resultado em Segundos',
    'benefits.1.desc': 'Informe valor, KM e combustível. O cálculo aparece na hora. Sem planilhas, sem complicação.',
    'benefits.2.title': 'Dashboard Completo',
    'benefits.2.desc': 'Veja seu lucro por dia, semana e mês. Gráficos bonitos e dados claros sobre sua performance.',
    'benefits.3.title': '100% Offline',
    'benefits.3.desc': 'Seus dados ficam salvos no celular. Pode usar sem internet, sem cadastro, sem complicação.',
    'benefits.4.title': 'Score A até F',
    'benefits.4.desc': 'Cada corrida ganha uma nota. Saiba na hora se foi boa, mediana ou prejuízo. Sem achismos.',
    'benefits.5.title': 'Custo por KM Real',
    'benefits.5.desc': 'Descubra exatamente quanto cada quilômetro rodado está custando. Base para decisões inteligentes.',
    'benefits.6.title': 'Relatório Exportável',
    'benefits.6.desc': 'Gere relatórios profissionais em PDF com todos os seus dados. Perfeito para planejar metas.',

    // PRICING
    'pricing.badge': 'PREÇO ÚNICO',
    'pricing.title': 'Menos que um tanque de gasolina',
    'pricing.sub': 'Mais que um mês de prejuízo. Invista em informação e pare de perder dinheiro.',
    'pricing.best': '🔥 MAIS VENDIDO',
    'pricing.tag': 'pagamento único • acesso vitalício',
    'pricing.feat1': 'Calculadora de lucro ilimitada',
    'pricing.feat2': 'Dashboard com gráficos e históricos',
    'pricing.feat3': 'Score por corrida (A até F)',
    'pricing.feat4': 'Custo por KM automático',
    'pricing.feat5': 'Relatório semanal completo',
    'pricing.feat6': 'Exportação em PDF profissional',
    'pricing.feat7': 'Dicas personalizadas de economia',
    'pricing.feat8': 'Atualizações vitalícias grátis',
    'pricing.cta': 'QUERO MEU LUCRO REAL',
    'pricing.cta_sub': 'Compra segura • Acesso imediato',
    'pricing.segura': 'Compra Segura',
    'pricing.garantia': 'Garantia 7 Dias',
    'pricing.suporte': 'Suporte WhatsApp',

    // SOCIAL PROOF
    'social.badge': 'DEPOIMENTOS',
    'social.title': 'O que os motoristas estão dizendo',
    'social.sub': 'Mais de 1.500 motoristas já descobriram seu lucro real',
    'social.rating': '{rating} de média • {count}+ avaliações',
    'social.test1.name': 'Carlos M.',
    'social.test1.role': 'Motorista Uber • SP',
    'social.test1.text': 'Descobri que estava perdendo dinheiro em 40% das corridas. Achava que tirava R$200/dia, mas na verdade era R$80. O LucroReal mudou minha forma de trabalhar.',
    'social.test2.name': 'Ana P.',
    'social.test2.role': 'Motorista 99 • RJ',
    'social.test2.text': 'Já baixei planilha, app, tudo. Nunca mantive por mais de 2 dias. O LucroReal é tão simples que usei desde o primeiro dia. Virei referência no grupo dos motoristas aqui da região.',
    'social.test3.name': 'Rafael S.',
    'social.test3.role': 'Motorista iFood • MG',
    'social.test3.text': 'O relatório semanal me mostrou que eu trabalhava 60h por semana e ganhava menos que um salário mínimo líquido. Depois que vi os números, mudei completamente minha estratégia.',

    // FAQ
    'faq.badge': 'FAQ',
    'faq.title': 'Perguntas Frequentes',
    'faq.sub': 'Tire suas dúvidas sobre o LucroReal',
    'faq.q1': 'Como funciona o cálculo de lucro?',
    'faq.a1': 'Você informa o valor que recebeu na corrida, quantos KM rodou e quanto gastou de combustível. O sistema calcula automaticamente seu lucro real, custo por KM e dá uma nota de A a F para a corrida. Tudo em segundos, sem complicação.',
    'faq.q2': 'Preciso baixar algum aplicativo?',
    'faq.a2': 'Não! O LucroReal funciona direto no navegador do seu celular. Acesse pelo link, use e salve seus dados. Sem instalação, sem ocupar espaço, sem precisar de iPhone ou Android específico.',
    'faq.q3': 'Funciona para Uber, 99, iFood e outros?',
    'faq.a3': 'Sim! Funciona para qualquer aplicativo de transporte ou entrega. O cálculo é baseado no valor recebido, KM rodado e combustível gasto — independente da plataforma.',
    'faq.q4': 'Funciona offline?',
    'faq.a4': 'Sim! Depois que você acessa o site e carrega a página, pode usar offline. Seus dados ficam salvos no próprio celular (localStorage). Perfeito para quem não tem internet estável.',
    'faq.q5': 'O que vem no relatório em PDF?',
    'faq.a5': 'Um relatório profissional completo com: total de corridas, lucro total por período, faturamento bruto, gasto com combustível, KM rodados, média de lucro por corrida e tabela detalhada dia a dia. Ideal para imprimir ou enviar.',
    'faq.q6': 'Tem garantia?',
    'faq.a6': 'Sim! Você tem 7 dias de garantia incondicional. Se o LucroReal não transformar sua forma de enxergar seus ganhos, devolvemos 100% do seu dinheiro. Sem burocracia, sem perguntas.',

    // PAGE
    'page.calc_badge': 'CALCULADORA',
    'page.calc_title1': 'Quanto você',
    'page.calc_title2': 'realmente ganhou',
    'page.calc_title3': 'hoje?',
    'page.calc_sub': 'Preencha os dados da sua última corrida e veja o resultado na hora',

    // RIDE FORM
    'form.valor': 'Valor recebido na corrida ({symbol})',
    'form.valor_ph': 'Ex: 25.50',
    'form.km': 'KM rodados',
    'form.km_ph': 'Ex: 12.5',
    'form.comb': 'Gasto com combustível na corrida ({symbol})',
    'form.comb_ph': 'Ex: 8.50',
    'form.calcular': 'Calcular Lucro',

    // RESULT CARD
    'result.titulo': 'Resultado',
    'result.valor_bruto': 'Valor bruto',
    'result.margem': 'Margem',
    'result.custo_total': 'Custo total',
    'result.custo_km': 'Custo por KM',
    'result.score_a': 'Excelente',
    'result.score_b': 'Boa',
    'result.score_c': 'Razoável',
    'result.score_d': 'Baixa',
    'result.score_f': 'Prejuízo',
    'result.nota': 'Nota {score} — {label}',
    'result.msg_a': 'Corrida excelente! Continue assim.',
    'result.msg_b': 'Boa corrida! Vale a pena.',
    'result.msg_c': 'Margem razoável, mas pode melhorar.',
    'result.msg_d': 'Margem muito baixa. Quase no prejuízo.',
    'result.msg_f': 'Essa corrida deu prejuízo. Evite corridas assim!',
    'result.saved': '✓ Corrida Salva',
    'result.save': 'Salvar no Histórico',

    // DASHBOARD
    'dash.title': 'Dashboard',
    'dash.corridas_count': '{count} corrida|{count} corridas',
    'dash.registered': 'registrada|registradas',
    'dash.limpar_tudo': 'Limpar Tudo',
    'dash.cancelar': 'Cancelar',
    'dash.limpar_dados': 'Limpar Dados',
    'dash.historico': 'Histórico de Corridas',

    // DASHBOARD STATS
    'stats.corridas': 'Corridas',
    'stats.lucro_total': 'Lucro Total',
    'stats.faturamento': 'Faturamento',
    'stats.combustivel': 'Combustível',
    'stats.km': 'KM Rodados',
    'stats.media': 'Média/Corrida',

    // WEEKLY CHART
    'chart.titulo': 'Lucro por Dia',
    'chart.tooltip': 'Lucro',

    // RIDE HISTORY
    'history.empty_title': 'Nenhuma corrida registrada',
    'history.empty_desc': 'Adicione corridas na calculadora para acompanhar seus resultados',
    'history.sim': 'Sim',
    'history.nao': 'Não',
    'history.excluir': 'Excluir',
    'history.mostrando': 'Mostrando as 50 corridas mais recentes de {total} no total',

    // EXPORT
    'export.exportar': 'Exportar Relatório em PDF',
    'export.desbloquear': '🔒 Desbloquear Exportação PDF',
    'export.relatorio': '📊 Relatório LucroReal',
    'export.periodo': 'Período: {days} dia(s) — Gerado em {date}',
    'export.data': 'Data',
    'export.corridas': 'Corridas',
    'export.faturamento': 'Faturamento',
    'export.combustivel': 'Combustível',
    'export.km': 'KM',
    'export.lucro': 'Lucro',
    'export.lucro_total': 'Lucro Total',
    'export.km_rodados': 'KM Rodados',
    'export.dias': 'Dias',
    'export.rodape': 'Relatório gerado por LucroReal — lucroreal.app',

    // OBRIGADO
    'obrigado.title': 'Compra Confirmada! 🎉',
    'obrigado.desc': 'Seu acesso ao LucroReal foi liberado com sucesso. Você já pode usar todas as funcionalidades premium.',
    'obrigado.redirect': 'Redirecionando para seu dashboard em {countdown} segundos...',
    'obrigado.cta': 'Ir para o Dashboard Agora',
  },

  es: {
    'nav.calculadora': 'Calculadora',
    'nav.dashboard': 'Dashboard',
    'nav.comprar': 'Comprar {price}',

    'footer.desc': 'La herramienta más simple para que los conductores de aplicaciones descubran su ganancia real por carrera.',
    'footer.produto': 'Producto',
    'footer.funcionalidades': 'Funcionalidades',
    'footer.preco': 'Precio',
    'footer.suporte': 'Soporte',
    'footer.termos': 'Términos de Uso',
    'footer.privacidade': 'Privacidad',
    'footer.fale': 'Contáctanos',
    'footer.copyright': '© 2026 LucroReal. Todos los derechos reservados.',

    'hero.nav_calc': 'Calculadora',
    'hero.nav_dep': 'Testimonios',
    'hero.comprar_btn': 'Comprar',
    'hero.badge': '+1.500 conductores ya lo usan',
    'hero.title1': '¿Sabes cuánto',
    'hero.title2': 'realmente ganas',
    'hero.title3': 'por carrera?',
    'hero.text1': 'La mayoría de los conductores',
    'hero.text2': 'cree que está ganando',
    'hero.text3': 'pero después de combustible, mantenimiento y desgaste,',
    'hero.text4': 'está perdiendo dinero',
    'hero.text5': 'sin saberlo.',
    'hero.text6': 'Descúbrelo en',
    'hero.text7': '5 segundos',
    'hero.cta': 'Calcular Mi Ganancia Ahora',
    'hero.como': 'Cómo Funciona',
    'hero.demo.calc': 'Calculadora',
    'hero.demo.live': 'En vivo • Demo',
    'hero.demo.valor': 'Valor recibido',
    'hero.demo.km': 'KM recorridos',
    'hero.demo.comb': 'Combustible',
    'hero.demo.lucro': 'Ganancia real',
    'hero.demo.f_msg': '¡Pérdida! Esta carrera te está costando dinero.',
    'hero.demo.d_msg': 'Margen muy bajo. Casi en pérdida.',
    'hero.demo.c_msg': 'Margen razonable. Se puede mejorar.',
    'hero.demo.b_msg': '¡Buena carrera! Vale la pena.',
    'hero.stat1': 'Conductores en Brasil',
    'hero.stat2': 'Están endeudados',
    'hero.stat3': 'Por día conduciendo',
    'hero.stat4': 'Dependen solo de la app',
    'hero.sabia': '¿Sabías que?',
    'hero.sabia_msg': '70% de los conductores no controlan sus gastos y 67% están endeudados.',

    'benefits.badge': 'FUNCIONALIDADES',
    'benefits.title': '¿Por qué todo conductor necesita esto?',
    'benefits.sub': 'Puedes estar trabajando gratis y ni lo sabes. LucroReal te muestra la verdad en segundos.',
    'benefits.1.title': 'Resultado en Segundos',
    'benefits.1.desc': 'Ingresa valor, KM y combustible. El cálculo aparece al instante. Sin hojas de cálculo, sin complicaciones.',
    'benefits.2.title': 'Dashboard Completo',
    'benefits.2.desc': 'Ve tu ganancia por día, semana y mes. Gráficos bonitos y datos claros sobre tu rendimiento.',
    'benefits.3.title': '100% Offline',
    'benefits.3.desc': 'Tus datos se guardan en el celular. Puedes usarlo sin internet, sin registro, sin complicaciones.',
    'benefits.4.title': 'Score A hasta F',
    'benefits.4.desc': 'Cada carrera recibe una nota. Sepa al instante si fue buena, regular o pérdida. Sin suposiciones.',
    'benefits.5.title': 'Costo por KM Real',
    'benefits.5.desc': 'Descubre exactamente cuánto está costando cada kilómetro recorrido. Base para decisiones inteligentes.',
    'benefits.6.title': 'Informe Exportable',
    'benefits.6.desc': 'Genera informes profesionales en PDF con todos tus datos. Perfecto para planificar metas.',

    'pricing.badge': 'PRECIO ÚNICO',
    'pricing.title': 'Menos que un tanque de gasolina',
    'pricing.sub': 'Más que un mes de pérdidas. Invierte en información y deja de perder dinero.',
    'pricing.best': '🔥 MÁS VENDIDO',
    'pricing.tag': 'pago único • acceso vitalicio',
    'pricing.feat1': 'Calculadora de ganancia ilimitada',
    'pricing.feat2': 'Dashboard con gráficos e historial',
    'pricing.feat3': 'Score por carrera (A hasta F)',
    'pricing.feat4': 'Costo por KM automático',
    'pricing.feat5': 'Informe semanal completo',
    'pricing.feat6': 'Exportación en PDF profesional',
    'pricing.feat7': 'Consejos personalizados de ahorro',
    'pricing.feat8': 'Actualizaciones vitalicias gratis',
    'pricing.cta': 'QUIERO MI GANANCIA REAL',
    'pricing.cta_sub': 'Compra segura • Acceso inmediato',
    'pricing.segura': 'Compra Segura',
    'pricing.garantia': 'Garantía 7 Días',
    'pricing.suporte': 'Soporte WhatsApp',

    'social.badge': 'TESTIMONIOS',
    'social.title': 'Lo que los conductores están diciendo',
    'social.sub': 'Más de 1.500 conductores ya descubrieron su ganancia real',
    'social.rating': '{rating} de media • {count}+ evaluaciones',
    'social.test1.name': 'Carlos M.',
    'social.test1.role': 'Conductor Uber • SP',
    'social.test1.text': 'Descubrí que estaba perdiendo dinero en el 40% de las carreras. Creía que ganaba R$200/día, pero en realidad eran R$80. LucroReal cambió mi forma de trabajar.',
    'social.test2.name': 'Ana P.',
    'social.test2.role': 'Conductora 99 • RJ',
    'social.test2.text': 'Ya había descargado hojas de cálculo, apps, todo. Nunca mantuve por más de 2 días. LucroReal es tan simple que lo usé desde el primer día. Me volví referencia en el grupo de conductores de mi región.',
    'social.test3.name': 'Rafael S.',
    'social.test3.role': 'Conductor iFood • MG',
    'social.test3.text': 'El informe semanal me mostró que trabajaba 60h por semana y ganaba menos que un salario mínimo líquido. Después de ver los números, cambié completamente mi estrategia.',

    'faq.badge': 'FAQ',
    'faq.title': 'Preguntas Frecuentes',
    'faq.sub': 'Resuelve tus dudas sobre LucroReal',
    'faq.q1': '¿Cómo funciona el cálculo de ganancia?',
    'faq.a1': 'Ingresas el valor que recibiste en la carrera, cuántos KM recorriste y cuánto gastaste en combustible. El sistema calcula automáticamente tu ganancia real, costo por KM y asigna una nota de A a F. Todo en segundos, sin complicaciones.',
    'faq.q2': '¿Necesito descargar alguna aplicación?',
    'faq.a2': '¡No! LucroReal funciona directamente en el navegador de tu celular. Accede por el enlace, úsalo y guarda tus datos. Sin instalación, sin ocupar espacio, sin necesidad de iPhone o Android específico.',
    'faq.q3': '¿Funciona para Uber, 99, iFood y otros?',
    'faq.a3': '¡Sí! Funciona para cualquier aplicación de transporte o entrega. El cálculo se basa en el valor recibido, KM recorrido y combustible gastado — independientemente de la plataforma.',
    'faq.q4': '¿Funciona sin internet?',
    'faq.a4': '¡Sí! Una vez que accedes al sitio y cargas la página, puedes usarlo sin conexión. Tus datos se guardan en el propio celular (localStorage). Perfecto para quienes no tienen internet estable.',
    'faq.q5': '¿Qué incluye el informe en PDF?',
    'faq.a5': 'Un informe profesional completo con: total de carreras, ganancia total por período, facturación bruta, gasto de combustible, KM recorridos, promedio de ganancia por carrera y tabla detallada día a día. Ideal para imprimir o enviar.',
    'faq.q6': '¿Tiene garantía?',
    'faq.a6': '¡Sí! Tienes 7 días de garantía incondicional. Si LucroReal no transforma tu forma de ver tus ganancias, devolvemos el 100% de tu dinero. Sin burocracia, sin preguntas.',

    'page.calc_badge': 'CALCULADORA',
    'page.calc_title1': '¿Cuánto',
    'page.calc_title2': 'realmente ganaste',
    'page.calc_title3': 'hoy?',
    'page.calc_sub': 'Completa los datos de tu última carrera y ve el resultado al instante',

    'form.valor': 'Valor recibido en la carrera ({symbol})',
    'form.valor_ph': 'Ej: 25.50',
    'form.km': 'KM recorridos',
    'form.km_ph': 'Ej: 12.5',
    'form.comb': 'Gasto de combustible en la carrera ({symbol})',
    'form.comb_ph': 'Ej: 8.50',
    'form.calcular': 'Calcular Ganancia',

    'result.titulo': 'Resultado',
    'result.valor_bruto': 'Valor bruto',
    'result.margem': 'Margen',
    'result.custo_total': 'Costo total',
    'result.custo_km': 'Costo por KM',
    'result.score_a': 'Excelente',
    'result.score_b': 'Buena',
    'result.score_c': 'Regular',
    'result.score_d': 'Baja',
    'result.score_f': 'Pérdida',
    'result.nota': 'Nota {score} — {label}',
    'result.msg_a': '¡Carrera excelente! Sigue así.',
    'result.msg_b': '¡Buena carrera! Vale la pena.',
    'result.msg_c': 'Margen razonable, pero puede mejorar.',
    'result.msg_d': 'Margen muy bajo. Casi en pérdida.',
    'result.msg_f': '¡Esta carrera dio pérdida! Evita carreras así.',
    'result.saved': '✓ Carrera Guardada',
    'result.save': 'Guardar en Historial',

    'dash.title': 'Dashboard',
    'dash.corridas_count': '{count} carrera|{count} carreras',
    'dash.registered': 'registrada|registradas',
    'dash.limpar_tudo': 'Limpiar Todo',
    'dash.cancelar': 'Cancelar',
    'dash.limpar_dados': 'Limpiar Datos',
    'dash.historico': 'Historial de Carreras',

    'stats.corridas': 'Carreras',
    'stats.lucro_total': 'Ganancia Total',
    'stats.faturamento': 'Facturación',
    'stats.combustivel': 'Combustible',
    'stats.km': 'KM Recorridos',
    'stats.media': 'Promedio/Carrera',

    'chart.titulo': 'Ganancia por Día',
    'chart.tooltip': 'Ganancia',

    'history.empty_title': 'Ninguna carrera registrada',
    'history.empty_desc': 'Agrega carreras en la calculadora para seguir tus resultados',
    'history.sim': 'Sí',
    'history.nao': 'No',
    'history.excluir': 'Eliminar',
    'history.mostrando': 'Mostrando las 50 carreras más recientes de {total} en total',

    'export.exportar': 'Exportar Informe en PDF',
    'export.desbloquear': '🔒 Desbloquear Exportación PDF',
    'export.relatorio': '📊 Informe LucroReal',
    'export.periodo': 'Período: {days} día(s) — Generado el {date}',
    'export.data': 'Fecha',
    'export.corridas': 'Carreras',
    'export.faturamento': 'Facturación',
    'export.combustivel': 'Combustible',
    'export.km': 'KM',
    'export.lucro': 'Ganancia',
    'export.lucro_total': 'Ganancia Total',
    'export.km_rodados': 'KM Recorridos',
    'export.dias': 'Días',
    'export.rodape': 'Informe generado por LucroReal — lucroreal.app',

    'obrigado.title': '¡Compra Confirmada! 🎉',
    'obrigado.desc': 'Tu acceso a LucroReal ha sido liberado con éxito. Ya puedes usar todas las funciones premium.',
    'obrigado.redirect': 'Redirigiendo a tu dashboard en {countdown} segundos...',
    'obrigado.cta': 'Ir al Dashboard Ahora',
  },
}

export const locales: Locale[] = ['pt', 'es']

export function getLocaleFromPath(): Locale {
  if (typeof window === 'undefined') return 'pt'
  const params = new URLSearchParams(window.location.search)
  const lang = params.get('lang') as Locale | null
  if (lang && locales.includes(lang)) {
    localStorage.setItem('lucroreal-lang', lang)
    return lang
  }
  const stored = localStorage.getItem('lucroreal-lang') as Locale | null
  if (stored && locales.includes(stored)) return stored
  return 'pt'
}

export function t(locale: Locale, key: string, vars?: Record<string, string | number>): string {
  const text = dict[locale]?.[key]
  if (!text) return key
  if (!vars) return text
  return text.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`))
}

export function plural(locale: Locale, key: string, count: number, vars?: Record<string, string | number>): string {
  const text = dict[locale]?.[key]
  if (!text) return String(count)
  const forms = text.split('|')
  const idx = count === 1 ? 0 : 1
  const form = forms[idx] || forms[0] || ''
  if (!vars) return form
  return form.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`))
}

export function formatDate(locale: Locale, date: Date, options?: Intl.DateTimeFormatOptions): string {
  const loc = localeConfig[locale].locale
  return date.toLocaleDateString(loc, options)
}

interface LanguageContextValue {
  locale: Locale
  setLocale: (l: Locale) => void
  t: (key: string, vars?: Record<string, string | number>) => string
  plural: (key: string, count: number, vars?: Record<string, string | number>) => string
}

const LanguageContext = createContext<LanguageContextValue>({
  locale: 'pt',
  setLocale: () => {},
  t: (key: string) => key,
  plural: (key: string, count: number) => String(count),
})

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('pt')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    const detected = getLocaleFromPath()
    setLocaleState(detected)
    setMounted(true)
  }, [])

  const setLocale = (l: Locale) => {
    localStorage.setItem('lucroreal-lang', l)
    setLocaleState(l)
  }

  const value: LanguageContextValue = {
    locale,
    setLocale,
    t: (key: string, vars?: Record<string, string | number>) => t(locale, key, vars),
    plural: (key: string, count: number, vars?: Record<string, string | number>) => plural(locale, key, count, { ...vars, count }),
  }

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  return useContext(LanguageContext)
}
