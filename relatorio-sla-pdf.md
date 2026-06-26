# Relatório SLA - Exportação em PDF

Este arquivo descreve a especificação da tarefa e o planejamento do Relatório SLA em PDF.

## Requisitos da Funcionalidade
1. Criar um botão "Exportar Relatório SLA" na barra superior do dashboard.
2. Integrar as bibliotecas `jsPDF` (v2.5.1) e `jsPDF-AutoTable` (v3.8.2) no arquivo `index.html` via CDN.
3. Respeitar todos os filtros atualmente selecionados no dashboard (Busca, Criticidade, Responsável, Departamento, Status, Status SLA, etc.).
4. Gerar relatórios específicos dependendo da escala de tempo selecionada no filtro:
   - **Dia (Hoje / 1 único dia personalizado):** Tabela de chamados individuais e tempo gasto detalhado.
   - **Semana (Esta Semana / Até 7 dias personalizados):** Tabela agrupada por dia útil (Segunda a Sexta) mostrando a taxa de conformidade do SLA de cada dia (classificado como "SLA Batido" se >= 95%, caso contrário "SLA Não Batido") + tabela detalhada com os ofensores da semana.
   - **Mês (Este Mês / Últimos 30 dias / personalizado largo):** Tabela agrupada por semanas (Segunda a Domingo) mostrando a taxa de conformidade da semana (meta de 95%) + tabela com os ofensores do mês.
5. Aplicar design corporativo print-friendly (tons claros com paleta azul, verde e vermelha para status de SLA).
6. Adicionar KPIs consolidados no início do documento PDF.

## Cronograma de Tarefas (Slugs de Implementação)
- [ ] Integrar scripts das bibliotecas jsPDF e jsPDF-AutoTable via CDN no head de `index.html`.
- [ ] Adicionar botão de exportação na interface HTML e configurar o listener de clique.
- [ ] Implementar funções auxiliares de agregação temporal de dados (por dia, por semana).
- [ ] Desenhar o layout estrutural do PDF (cabeçalho, metadados de filtros, painel de KPIs).
- [ ] Renderizar tabelas dinâmicas baseadas no agrupamento no corpo do PDF.
- [ ] Incluir tabela de ofensores de SLA para relatórios semanais e mensais.
- [ ] Testar e verificar visualmente o layout exportado sob múltiplos cenários de filtros.
