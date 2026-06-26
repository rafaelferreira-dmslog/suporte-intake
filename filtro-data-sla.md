# Plano de Implementação: Filtro de SLA por Datas (Filtro Temporal)

Este documento descreve o plano para adicionar um filtro temporal (semanas, dias, meses ou períodos personalizados) no dashboard interativo de SLA do Suporte Intake.

## Visão Geral (Overview)
Atualmente, o dashboard carrega todos os chamados da planilha de uma vez (ex: ~3.000 chamados) e exibe os KPIs acumulados e gráficos baseados no histórico total.
Esta nova funcionalidade introduzirá a capacidade de focar as análises de SLA e volumetria em períodos de tempo específicos (como últimos 7 dias, mês atual ou datas livres), permitindo um acompanhamento temporal mais preciso e refinado para o time de Service Desk.

## Tipo de Projeto (Project Type)
- **WEB** (Single-page application estática local em `index.html`)

## Critérios de Sucesso (Success Criteria)
- [ ] O usuário pode filtrar os chamados por atalhos de data predefinidos ou selecionar um intervalo de início e fim.
- [ ] KPIs de SLA e volume (Total de Chamados, Aderência ao SLA %, Dentro do SLA, Chamados em Aberto) são recalculados dinamicamente com base no período de data escolhido.
- [ ] Os três gráficos (Aderência por Criticidade, Volume por Status e Top Causas Raiz) são re-renderizados instantaneamente para refletir apenas os dados do período filtrado.
- [ ] A tabela de chamados é atualizada com paginação/scrolling correto respeitando as datas selecionadas.
- [ ] O filtro de datas funciona perfeitamente tanto para os dados do CSV importado pelo usuário quanto para a massa de "Dados de Exemplo".

## Pilha Tecnológica (Tech Stack)
- **HTML5 & CSS3** (Estilização premium existente com CSS nativo e fontes Inter/Outfit, paleta de cores Teal/Cyan/Emerald).
- **JavaScript (ES6+)** (Filtros locais em tempo de execução na memória do navegador).
- **Chart.js v4.x** (Renderização reativa dos gráficos).

## Estrutura de Arquivos (File Structure)
- [index.html](file:///c:/Users/rafae/OneDrive/Documentos/Suporte-Intake/index.html) (Modificações inline na interface de filtros, lógica de filtragem e reinicialização de instâncias dos gráficos).

---

## Cronograma e Divisão de Tarefas (Task Breakdown)

### Fase 1: Interface de Filtro Temporal (UI/UX)
- **ID da Tarefa**: `task-ui-filter`
- **Nome**: Adicionar componentes visuais de filtro por data
- **Responsável**: `frontend-specialist`
- **Habilidades Recomendadas**: `@[skills/frontend-design]`
- **Prioridade**: Alta
- **Dependências**: Nenhuma
- **Descrição**: Criar no bloco de filtros do HTML uma seção dedicada para filtros de data, contendo um dropdown de atalhos rápidos ("Tudo", "Hoje", "Esta Semana", "Este Mês", "Últimos 30 dias", "Personalizado") e dois inputs de data (`<input type="date">`) que aparecem dinamicamente quando a opção "Personalizado" é selecionada.
- **Entradas (INPUT)**: Layout atual de filtros em [index.html](file:///c:/Users/rafae/OneDrive/Documentos/Suporte-Intake/index.html) (linhas 758-783).
- **Saídas (OUTPUT)**: Nova interface elegante e responsiva com seletor de data integrada na barra de filtros.
- **Verificação (VERIFY)**: Inspecionar visualmente o layout no navegador para garantir alinhamento, contraste adequado (sem cores roxas/violetas) e funcionamento responsivo.

### Fase 2: Lógica de Filtragem de Datas (Script)
- **ID da Tarefa**: `task-js-date-logic`
- **Nome**: Desenvolver lógica de verificação de intervalo de datas
- **Responsável**: `frontend-specialist`
- **Habilidades Recomendadas**: `@[skills/clean-code]`
- **Prioridade**: Crítica
- **Dependências**: `task-ui-filter`
- **Descrição**: Atualizar a função `applyFiltersAndRender()` para ler os valores das datas selecionadas. Para cada ticket do array `rawTicketsData`, validar se a data de criação (ou de referência) está dentro do intervalo escolhido. Se o filtro estiver ativo, apenas tickets do intervalo correspondente serão incluídos no `filteredTicketsData`.
- **Entradas (INPUT)**: Função `applyFiltersAndRender()` em [index.html](file:///c:/Users/rafae/OneDrive/Documentos/Suporte-Intake/index.html).
- **Saídas (OUTPUT)**: Filtro lógico de datas que atualiza `filteredTicketsData`.
- **Verificação (VERIFY)**: Carregar os "Dados de Exemplo" e mudar o filtro para "Esta Semana" para conferir se apenas chamados criados nos últimos 7 dias são mantidos na tabela e nos cálculos.

### Fase 3: Re-renderização dos Gráficos e KPIs
- **ID da Tarefa**: `task-charts-kpis-refresh`
- **Nome**: Integrar re-renderização de KPIs e gráficos
- **Responsável**: `frontend-specialist`
- **Habilidades Recomendadas**: `@[skills/clean-code]`
- **Prioridade**: Alta
- **Dependências**: `task-js-date-logic`
- **Descrição**: Garantir que as funções `updateKPIs()` e `renderCharts()` processem e desenhem os dados atualizados sem causar crash no Chart.js (gerenciar a destruição prévia das instâncias dos gráficos).
- **Entradas (INPUT)**: Funções `updateKPIs()` e `renderCharts()`.
- **Saídas (OUTPUT)**: KPIs de SLA recalculados e gráficos dinâmicos atualizados.
- **Verificação (VERIFY)**: Confirmar que os totais e percentuais do SLA mudam instantaneamente ao alterar as seleções de data, sem bugs visuais de sobreposição de gráficos.

---

## Fase X: Verificação Final (Verification Checklist)

- [ ] Nenhum código de cor roxa/violeta adicionado (respeito às diretrizes visuais).
- [ ] Validação manual de data limite e parsing (como formato DD/MM/YYYY).
- [ ] Execução das verificações de acessibilidade e linter.

## ✅ PLANO PRONTO PARA VALIDAÇÃO
