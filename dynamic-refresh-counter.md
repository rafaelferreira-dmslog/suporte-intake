# Dynamic Refresh Counter Plan

## Overview
O usuário solicitou que o contador de "Última atualização", localizado abaixo do botão "Atualizar Dados", seja dinâmico. Ou seja, em vez de mostrar apenas a hora estática ("Última atualização: 10:29:24"), ele deve contar o tempo real decorrido ("Atualizado há 15 segundos", "Atualizado há 2 minutos", etc.).

## Project Type
WEB

## Success Criteria
- O texto do elemento `#last-refresh-time` atualiza a cada 1 segundo.
- Mostra o tempo decorrido de forma amigável (ex: "agora mesmo", "há X segundos", "há X min").
- O contador é resetado automaticamente quando novos dados são carregados.
- Ao abrir a página, o filtro "Período" virá pré-selecionado como "Esta Semana" em vez de "Todo o Histórico".

## Tech Stack
- Vanilla JavaScript
- `setInterval` para o loop de contagem
- Operações com `Date` e `Math`

## File Structure
- `index.html` (Lógica e UI concentradas aqui)

## Task Breakdown

### Task 1: Refatorar o estado da última atualização
- **Agent**: `@frontend-specialist`
- **Skill**: `@clean-code`
- **INPUT**: Função `updateLastRefreshTime()` existente.
- **OUTPUT**:
  - Criar variável global `let lastRefreshTimestamp = null;`.
  - Atualizar `updateLastRefreshTime()` para registrar `lastRefreshTimestamp = Date.now();` e chamar uma atualização imediata da tela.
- **VERIFY**: A variável global captura o timestamp corretamente ao carregar a página e após atualizações manuais.

### Task 2: Implementar o loop dinâmico (Contador em tempo real)
- **Agent**: `@frontend-specialist`
- **Skill**: `@frontend-design`
- **INPUT**: `lastRefreshTimestamp` configurado.
- **OUTPUT**:
  - Criar função `startDynamicCounter()` que inicia um `setInterval` rodando a cada 1000ms (1 segundo).
  - Dentro do intervalo, calcular `Math.floor((Date.now() - lastRefreshTimestamp) / 1000)`.
  - Formatar a string:
    - < 10s: "Atualizado agora mesmo"
    - < 60s: "Atualizado há X segundos"
    - >= 60s: "Atualizado há X min e Y seg"
  - Atualizar o `textContent` do `#last-refresh-time`.
  - Chamar `startDynamicCounter()` uma única vez no carregamento da página.
- **VERIFY**: O texto na interface pisca a cada segundo atualizando a contagem, refletindo a diferença temporal exata.

### Task 3: Configurar filtro "Esta Semana" por padrão
- **Agent**: `@frontend-specialist`
- **Skill**: `@frontend-design`
- **INPUT**: Elemento `<select id="filter-date-preset-top">`.
- **OUTPUT**:
  - Adicionar o atributo `selected` à option de "Esta Semana".
  - Garantir que a lógica de JavaScript de inicialização (`window.addEventListener('DOMContentLoaded', ...)` ou equivalente) dispare e aplique o filtro visual e de dados.
- **VERIFY**: Ao carregar a página via refresh (sem caches locais), apenas os chamados da semana atual são mostrados.

## Phase X: Verification
- [ ] O contador não exibe valores negativos ou NaN.
- [ ] Funciona tanto com a carga inicial de `data.csv` quanto após um Upload Manual.
- [ ] O filtro de período "Esta Semana" está ativo no primeiro load e filtra os dados reais do CSV.
- [ ] O tema escuro/claro não afeta a legibilidade do texto dinâmico.
- [ ] `playwright` (se disponível) ou verificação local via `python -m http.server`.

---
## ✅ PHASE X COMPLETE
(Aguardando execução da Phase 2)
