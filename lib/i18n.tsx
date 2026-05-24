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
    'form.outros': 'Outros custos (opcional)',
    'form.outros_ph': 'Ex: 5.00 (pedágio, lavagem, etc)',
    'form.calcular': 'Calcular Lucro',

    // RESULT CARD
    'result.titulo': 'Resultado',
    'result.valor_bruto': 'Valor bruto',
    'result.margem': 'Margem',
    'result.custo_total': 'Custo total',
    'result.custo_km': 'Custo por KM',
    'result.combustivel': 'Combustível',
    'result.outros': 'Outros custos',
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
    'dash.meta_atingida': '🎯 Meta do dia atingida!',
    'dash.custo_fixo_periodo': 'Custos fixos (período)',
    'dash.lucro_real': 'Lucro Real (líquido)',

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

    // CALCULAR PAGE
    'calc.limit_title': 'Limite gratuito atingido',
    'calc.limit_desc': 'Você já usou suas {max} calculadoras grátis. Adquira o LucroReal para cálculos ilimitados, dashboard completo e exportação em PDF.',
    'calc.limit_cta': 'Quero Acesso Ilimitado',
    'calc.remaining': 'Você tem mais {count} cálculo|Você tem mais {count} cálculos',
    'calc.remaining_premium': 'Cálculos ilimitados • Premium',
    'calc.preview_title': 'Prévia do Dashboard',
    'calc.preview_desc': 'Este é o dashboard que você terá acesso. Conforme você adiciona corridas, os gráficos e estatísticas são preenchidos automaticamente.',
    'calc.profit_total': 'Lucro Total',
    'calc.rides_total': 'Total de Corridas',
    'calc.avg_per_ride': 'Média por Corrida',
    'calc.preview_blocked': 'Esse recurso fica disponível na versão completa',
    'calc.saved': 'Corrida salva! +1 cálculo utilizado.',
    'calc.save_error': 'Limite atingido. Adquira o LucroReal.',
    'calc.try_again': 'Calcular Outra',
    'calc.recent': 'Suas últimas corridas',

    // PREVIEW
    'preview.dash_title': 'Veja o que você vai ter acesso',
    'preview.dash_sub': 'Transparência total. Antes de comprar, veja exatamente como funciona o ambiente completo.',
    'preview.dash_badge': 'PRÉ-VISUALIZAÇÃO',
    'preview.include': 'O que está incluído:',
    'preview.include1': 'Calculadora de lucro ilimitada',
    'preview.include2': 'Dashboard com gráfico de lucro diário',
    'preview.include3': 'Score de A a F para cada corrida',
    'preview.include4': 'Custo por KM automático',
    'preview.include5': 'Exportação de relatório em PDF',
    'preview.include6': 'Salvamento automático no celular',
    'preview.pdf_title': 'Exemplo de Relatório Exportado em PDF',
    'preview.pdf_desc': 'Com a versão premium, você gera relatórios profissionais como este com 1 clique.',
    'preview.pdf_badge': 'EXEMPLO PDF',
    'preview.pdf_info': 'Relatório gerado com 12 corridas • 3 dias de dados',

    // OBRIGADO
    'obrigado.title': 'Compra Confirmada! 🎉',
    'obrigado.desc': 'Seu acesso ao LucroReal foi liberado com sucesso. Você já pode usar todas as funcionalidades premium.',
    'obrigado.redirect': 'Redirecionando para seu dashboard em {countdown} segundos...',
    'obrigado.cta': 'Ir para o Dashboard Agora',

    // SETTINGS
    'settings.titulo': 'Configurações',
    'settings.metas': 'Metas de Ganho',
    'settings.meta_dia': 'Meta diária',
    'settings.meta_semana': 'Meta semanal',
    'settings.custos_fixos': 'Custos Fixos Mensais',
    'settings.custos_fixos_desc': 'Estes custos são rateados por dia trabalhado e exibidos no dashboard.',
    'settings.manutencao': 'Manutenção',
    'settings.seguro': 'Seguro',
    'settings.ipva': 'IPVA + Licenciamento',
    'settings.dias_trab': 'Dias trabalhados/mês',
    'settings.custo_dia': 'Custo fixo por dia',
    'settings.custo_dia_desc': 'Baseado em {dias} dias trabalhados por mês',
    'settings.salvar': 'Salvar Configurações',

    // TERMOS DE USO
    'termos.title': 'Termos de Uso',
    'termos.subtitle': 'Ao usar o LucroReal, você concorda com estes termos. Leia com atenção.',
    'termos.last_update': 'Última atualização: Maio de 2026',
    'termos.s1_title': '1. Aceitação dos Termos',
    'termos.s1_text': 'Ao acessar ou utilizar o LucroReal (\"Serviço\"), você confirma que leu, entendeu e concorda em ficar vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, não utilize o Serviço.',
    'termos.s2_title': '2. Descrição do Serviço',
    'termos.s2_text': 'O LucroReal é uma ferramenta digital que permite a motoristas de aplicativo calcularm o lucro real de suas corridas. O Serviço é fornecido \"como está\" e não substitui aconselhamento profissional. Os cálculos são baseados nas informações fornecidas pelo usuário.',
    'termos.s3_title': '3. Uso Permitido',
    'termos.s3_text': 'Você concorda em utilizar o Serviço apenas para fins legais e de acordo com estes termos. Não é permitido: (a) copiar, modificar ou distribuir o código sem autorização; (b) usar o Serviço para fins fraudulentos; (c) tentar acessar áreas restritas do sistema.',
    'termos.s4_title': '4. Propriedade Intelectual',
    'termos.s4_text': 'Todo o conteúdo, design, código e funcionalidades do LucroReal são de propriedade exclusiva do desenvolvedor. O usuário recebe uma licença limitada, não exclusiva e intransferível para uso pessoal do Serviço.',
    'termos.s5_title': '5. Limitação de Responsabilidade',
    'termos.s5_text': 'O LucroReal não se responsabiliza por decisões tomadas com base nos cálculos fornecidos. O usuário é o único responsável por suas decisões financeiras e profissionais. Em nenhum caso o LucroReal será responsável por danos indiretos, incidentais ou consequenciais.',
    'termos.s6_title': '6. Garantia e Reembolso',
    'termos.s6_text': 'Oferecemos garantia de 7 dias para reembolso total, conforme política da Hotmart. Após esse período, não serão realizados reembolsos. A garantia cobre insatisfação com o produto, desde que o usuário não tenha violado estes termos.',
    'termos.s7_title': '7. Alterações nos Termos',
    'termos.s7_text': 'Reservamo-nos o direito de modificar estes termos a qualquer momento. Alterações serão comunicadas através do Serviço. O uso continuado após as alterações constitui aceitação dos novos termos.',
    'termos.voltar': 'Voltar para Home',

    // PRIVACIDADE
    'priv.title': 'Política de Privacidade',
    'priv.subtitle': 'Saiba como tratamos suas informações e protegemos sua privacidade.',
    'priv.last_update': 'Última atualização: Maio de 2026',
    'priv.s1_title': '1. Informações Coletadas',
    'priv.s1_text': 'O LucroReal coleta apenas as informações que você voluntariamente fornece: dados das corridas (valor, KM, combustível, outros custos) e configurações (metas, custos fixos). Não coletamos dados pessoais como nome, e-mail ou localização.',
    'priv.s2_title': '2. Uso das Informações',
    'priv.s2_text': 'Suas informações são usadas exclusivamente para gerar os cálculos de lucro, exibir o dashboard e produzir relatórios. Nenhum dado é usado para treinamento de IA, publicidade ou compartilhamento com terceiros.',
    'priv.s3_title': '3. Armazenamento',
    'priv.s3_text': 'Todos os seus dados são armazenados localmente no seu dispositivo (localStorage). Nenhuma informação é enviada para servidores externos. Isso significa que seus dados financeiros permanecem sob seu controle total.',
    'priv.s4_title': '4. Compartilhamento com Terceiros',
    'priv.s4_text': 'O único dado compartilhado com terceiros é o token de pagamento enviado à Hotmart para verificação de compra. Não vendemos, alugamos ou compartilhamos suas informações com terceiros para fins comerciais.',
    'priv.s5_title': '5. Direitos do Usuário',
    'priv.s5_text': 'Você tem o direito de acessar, corrigir e excluir todos os seus dados a qualquer momento. Como os dados ficam armazenados localmente, você pode limpá-los nas configurações do dashboard ou removendo os dados do navegador.',
    'priv.s6_title': '6. Cookies',
    'priv.s6_text': 'O LucroReal não utiliza cookies de rastreamento. Utilizamos apenas armazenamento local (localStorage) para salvar suas preferências de idioma e dados de uso.',
    'priv.s7_title': '7. Contato',
    'priv.s7_text': 'Para dúvidas sobre esta política, entre em contato conosco pelo WhatsApp ou pelo formulário de contato disponível no site.',
    'priv.voltar': 'Voltar para Home',

    // FALE CONOSCO
    'fale.title': 'Fale Conosco',
    'fale.subtitle': 'Tem dúvidas, sugestões ou precisa de ajuda? Estamos aqui para você.',
    'fale.whatsapp': 'WhatsApp',
    'fale.whatsapp_desc': 'Resposta rápida em horário comercial',
    'fale.falar': 'Falar no WhatsApp',
    'fale.email': 'E-mail',
    'fale.email_desc': 'Respondemos em até 24h úteis',
    'fale.enviar': 'Enviar',
    'fale.nome': 'Seu nome',
    'fale.nome_ph': 'Digite seu nome',
    'fale.email_input': 'Seu e-mail',
    'fale.email_ph': 'Digite seu e-mail',
    'fale.assunto': 'Assunto',
    'fale.assunto_ph': 'Ex: Dúvida sobre o produto',
    'fale.msg': 'Mensagem',
    'fale.msg_ph': 'Digite sua mensagem aqui...',
    'fale.enviado': 'Mensagem enviada com sucesso! Entraremos em contato em breve.',
    'fale.erro': 'Erro ao enviar. Tente novamente ou fale conosco pelo WhatsApp.',
    'fale.voltar': 'Voltar para Home',
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
    'form.outros': 'Otros costos (opcional)',
    'form.outros_ph': 'Ej: 5.00 (peaje, lavado, etc)',
    'form.calcular': 'Calcular Ganancia',

    'result.titulo': 'Resultado',
    'result.valor_bruto': 'Valor bruto',
    'result.margem': 'Margen',
    'result.custo_total': 'Costo total',
    'result.custo_km': 'Costo por KM',
    'result.combustivel': 'Combustible',
    'result.outros': 'Otros costos',
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
    'dash.meta_atingida': '🎯 ¡Meta del día alcanzada!',
    'dash.custo_fixo_periodo': 'Costos fijos (período)',
    'dash.lucro_real': 'Ganancia Real (líquida)',

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

    // CALCULAR PAGE
    'calc.limit_title': 'Límite gratuito alcanzado',
    'calc.limit_desc': 'Ya usaste tus {max} calculadoras gratis. Adquiere LucroReal para cálculos ilimitados, dashboard completo y exportación en PDF.',
    'calc.limit_cta': 'Quiero Acceso Ilimitado',
    'calc.remaining': 'Te queda {count} cálculo|Te quedan {count} cálculos',
    'calc.remaining_premium': 'Cálculos ilimitados • Premium',
    'calc.preview_title': 'Vista previa del Dashboard',
    'calc.preview_desc': 'Este es el dashboard al que tendrás acceso. A medida que agregas carreras, los gráficos y estadísticas se completan automáticamente.',
    'calc.profit_total': 'Ganancia Total',
    'calc.rides_total': 'Total de Carreras',
    'calc.avg_per_ride': 'Promedio por Carrera',
    'calc.preview_blocked': 'Esta función está disponible en la versión completa',
    'calc.saved': '¡Carrera guardada! +1 cálculo utilizado.',
    'calc.save_error': 'Límite alcanzado. Adquiere LucroReal.',
    'calc.try_again': 'Calcular Otra',
    'calc.recent': 'Tus últimas carreras',

    // PREVIEW
    'preview.dash_title': 'Mira lo que vas a tener',
    'preview.dash_sub': 'Transparencia total. Antes de comprar, ve exactamente cómo funciona el ambiente completo.',
    'preview.dash_badge': 'PREVISUALIZACIÓN',
    'preview.include': 'Lo que está incluido:',
    'preview.include1': 'Calculadora de ganancia ilimitada',
    'preview.include2': 'Dashboard con gráfico de ganancia diaria',
    'preview.include3': 'Score de A a F para cada carrera',
    'preview.include4': 'Costo por KM automático',
    'preview.include5': 'Exportación de informe en PDF',
    'preview.include6': 'Guardado automático en el celular',
    'preview.pdf_title': 'Ejemplo de Informe Exportado en PDF',
    'preview.pdf_desc': 'Con la versión premium, genera informes profesionales como este con 1 clic.',
    'preview.pdf_badge': 'EJEMPLO PDF',
    'preview.pdf_info': 'Informe generado con 12 carreras • 3 días de datos',

    // SETTINGS
    'settings.titulo': 'Configuraciones',
    'settings.metas': 'Metas de Ganancia',
    'settings.meta_dia': 'Meta diaria',
    'settings.meta_semana': 'Meta semanal',
    'settings.custos_fixos': 'Costos Fijos Mensuales',
    'settings.custos_fixos_desc': 'Estos costos se prorratean por día trabajado y se muestran en el dashboard.',
    'settings.manutencao': 'Mantenimiento',
    'settings.seguro': 'Seguro',
    'settings.ipva': 'IPVA + Licencia',
    'settings.dias_trab': 'Días trabajados/mes',
    'settings.custo_dia': 'Costo fijo por día',
    'settings.custo_dia_desc': 'Basado en {dias} días trabajados por mes',
    'settings.salvar': 'Guardar Configuraciones',

    // TERMINOS DE USO
    'termos.title': 'Términos de Uso',
    'termos.subtitle': 'Al usar LucroReal, aceptas estos términos. Lee con atención.',
    'termos.last_update': 'Última actualización: Mayo de 2026',
    'termos.s1_title': '1. Aceptación de los Términos',
    'termos.s1_text': 'Al acceder o utilizar LucroReal (\"Servicio\"), confirmas que has leído, entendido y aceptas quedar vinculado por estos Términos de Uso. Si no estás de acuerdo con alguna parte, no utilices el Servicio.',
    'termos.s2_title': '2. Descripción del Servicio',
    'termos.s2_text': 'LucroReal es una herramienta digital que permite a los conductores de aplicaciones calcular la ganancia real de sus carreras. El Servicio se proporciona \"tal cual\" y no sustituye el asesoramiento profesional. Los cálculos se basan en la información proporcionada por el usuario.',
    'termos.s3_title': '3. Uso Permitido',
    'termos.s3_text': 'Aceptas utilizar el Servicio solo para fines legales y de acuerdo con estos términos. No está permitido: (a) copiar, modificar o distribuir el código sin autorización; (b) usar el Servicio para fines fraudulentos; (c) intentar acceder a áreas restringidas del sistema.',
    'termos.s4_title': '4. Propiedad Intelectual',
    'termos.s4_text': 'Todo el contenido, diseño, código y funcionalidades de LucroReal son propiedad exclusiva del desarrollador. El usuario recibe una licencia limitada, no exclusiva e intransferible para uso personal del Servicio.',
    'termos.s5_title': '5. Limitación de Responsabilidad',
    'termos.s5_text': 'LucroReal no se responsabiliza por decisiones tomadas con base en los cálculos proporcionados. El usuario es el único responsable de sus decisiones financieras y profesionales. Bajo ninguna circunstancia LucroReal será responsable por daños indirectos, incidentales o consecuentes.',
    'termos.s6_title': '6. Garantía y Reembolso',
    'termos.s6_text': 'Ofrecemos garantía de 7 días para reembolso total, según la política de Hotmart. Después de ese período, no se realizarán reembolsos. La garantía cubre insatisfacción con el producto, siempre que el usuario no haya violado estos términos.',
    'termos.s7_title': '7. Cambios en los Términos',
    'termos.s7_text': 'Nos reservamos el derecho de modificar estos términos en cualquier momento. Los cambios serán comunicados a través del Servicio. El uso continuado después de los cambios constituye aceptación de los nuevos términos.',
    'termos.voltar': 'Volver a Inicio',

    // PRIVACIDAD
    'priv.title': 'Política de Privacidad',
    'priv.subtitle': 'Conoce cómo tratamos tu información y protegemos tu privacidad.',
    'priv.last_update': 'Última actualización: Mayo de 2026',
    'priv.s1_title': '1. Información Recopilada',
    'priv.s1_text': 'LucroReal recopila solo la información que proporcionas voluntariamente: datos de las carreras (valor, KM, combustible, otros costos) y configuraciones (metas, costos fijos). No recopilamos datos personales como nombre, correo electrónico o ubicación.',
    'priv.s2_title': '2. Uso de la Información',
    'priv.s2_text': 'Tu información se utiliza exclusivamente para generar los cálculos de ganancia, mostrar el dashboard y producir informes. Ningún dato se usa para entrenamiento de IA, publicidad o compartir con terceros.',
    'priv.s3_title': '3. Almacenamiento',
    'priv.s3_text': 'Todos tus datos se almacenan localmente en tu dispositivo (localStorage). Ninguna información se envía a servidores externos. Esto significa que tus datos financieros permanecen bajo tu control total.',
    'priv.s4_title': '4. Compartición con Terceros',
    'priv.s4_text': 'El único dato compartido con terceros es el token de pago enviado a Hotmart para verificación de compra. No vendemos, alquilamos ni compartimos tu información con terceros con fines comerciales.',
    'priv.s5_title': '5. Derechos del Usuario',
    'priv.s5_text': 'Tienes derecho a acceder, corregir y eliminar todos tus datos en cualquier momento. Como los datos se almacenan localmente, puedes limpiarlos en las configuraciones del dashboard o eliminando los datos del navegador.',
    'priv.s6_title': '6. Cookies',
    'priv.s6_text': 'LucroReal no utiliza cookies de rastreo. Utilizamos solo almacenamiento local (localStorage) para guardar tus preferencias de idioma y datos de uso.',
    'priv.s7_title': '7. Contacto',
    'priv.s7_text': 'Para dudas sobre esta política, contáctanos por WhatsApp o mediante el formulario de contacto disponible en el sitio.',
    'priv.voltar': 'Volver a Inicio',

    // CONTÁCTANOS
    'fale.title': 'Contáctanos',
    'fale.subtitle': '¿Tienes dudas, sugerencias o necesitas ayuda? Estamos aquí para ti.',
    'fale.whatsapp': 'WhatsApp',
    'fale.whatsapp_desc': 'Respuesta rápida en horario comercial',
    'fale.falar': 'Hablar por WhatsApp',
    'fale.email': 'Correo electrónico',
    'fale.email_desc': 'Respondemos en hasta 24h hábiles',
    'fale.enviar': 'Enviar',
    'fale.nome': 'Tu nombre',
    'fale.nome_ph': 'Escribe tu nombre',
    'fale.email_input': 'Tu correo',
    'fale.email_ph': 'Escribe tu correo',
    'fale.assunto': 'Asunto',
    'fale.assunto_ph': 'Ej: Duda sobre el producto',
    'fale.msg': 'Mensaje',
    'fale.msg_ph': 'Escribe tu mensaje aquí...',
    'fale.enviado': '¡Mensaje enviado con éxito! Te contactaremos pronto.',
    'fale.erro': 'Error al enviar. Intenta de nuevo o contáctanos por WhatsApp.',
    'fale.voltar': 'Volver a Inicio',
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
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== 'undefined') {
      return getLocaleFromPath()
    }
    return 'pt'
  })

  useEffect(() => {
    const detected = getLocaleFromPath()
    setLocaleState(detected)
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

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useTranslation() {
  return useContext(LanguageContext)
}
