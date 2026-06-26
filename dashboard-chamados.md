# Plano: Dashboard de Chamados

## Objetivos
- Criar um painel de controle interativo (`index.html`) para visualizar chamados do Jira a partir de um CSV.
- Calcular o SLA exato com base nas regras de negócios de suporte (segunda a sexta, 07:30 às 17:18, excluindo fins de semana).
- Exibir gráficos de volume de chamados, causas raiz e maiores ofensores (responsáveis por chamados estourados).

## Fases do Projeto
1. **Fase 1: Planejamento e Design de Negócio** (Concluída - Alinhado no Socratic Gate)
2. **Fase 2: Arquitetura e Estruturação do Código** (Definida no plano de implementação)
3. **Fase 3: Implementação** (A ser executada após aprovação)
4. **Fase 4: Validação e Testes** (A ser executada após implementação)

## Regras de SLA Confirmadas
- **P0:** 4 horas úteis.
- **P1:** 8 horas úteis.
- **P2:** 2 dias úteis (19.6 horas úteis).
- **P3:** 5 dias úteis (49.0 horas úteis).
- **Horário:** 07:30 às 17:18 de segunda a sexta.
- **Finais de semana:** Descontados.
- **Abertura fora de expediente:** Conta a partir das 07:30 do próximo dia útil.
- **Chamados abertos:** Comparados com o horário atual dinamicamente.
