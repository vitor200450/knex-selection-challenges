# Teste Técnico - Frontend
> Knex Empresa Júnior de Computação

## Avaliação
Este teste é uma oportunidade para você demonstrar seus conhecimentos em desenvolvimento frontend, boas práticas de programação e implementação de formulários complexos. Avaliaremos diversos aspectos do seu código e da implementação da solução. Lembrando que não é necessário concluir tudo do projeto, fazer o que conseguir!

## Instruções
- Desenvolva a solução utilizando React
- Utilize uma biblioteca para gerenciamento de formulários (React hook form, formik, ...entre outros)
- Utilize uma biblioteca para validação de dados (Zod, Yup, ...entre outros)
- Você pode utilizar quaisquer outras bibliotecas que considerar necessárias
- Adicione um arquivo README.md com instruções claras de como executar sua aplicação
- O desenvolvimento deve ser individual

## Desafio
Desenvolver um formulário multistep para doações aos cães/gatos que habitam o campus universitário. O foco principal é criar uma experiência fluida e intuitiva no preenchimento do formulário, com validações adequadas e feedback visual para o usuário.

### A solução deve focar em três pontos principais:
1) Implementação de um formulário multistep com React
2) Validações em tempo real com feedback visual claro
3) Gerenciamento de estado entre os steps e persistência dos dados

### Steps do Formulário e Validações Requeridas

1. **Informações do Doador**
   - Nome completo
     * Obrigatório
     * Mínimo 3 caracteres
     * Apenas letras e espaços
   - Email
     * Obrigatório
     * Formato de email válido
     * Não permitir emails temporários
   - Telefone
     * Opcional
     * Formato brasileiro válido quando preenchido
     * Aceitar com ou sem DDD

2. **Detalhes da Doação**
   - Valor
     * Obrigatório
     * Mínimo de R$ 5,00
     * Apenas números e formatação monetária
     * Máximo de R$ 10.000,00
   - Frequência
     * Obrigatório
     * Opções: única ou mensal
   - Mensagem de apoio
     * Opcional
     * Máximo 200 caracteres
     * Não permitir caracteres especiais exceto pontuação básica

3. **Método de Pagamento**
   - PIX
     * Única opção disponível neste momento
     * Validar se QR Code foi gerado corretamente
     * Timeout de 15 minutos para o QR Code

4. **Confirmação**
   - Todos os dados precisam ser validados novamente
   - Garantir que nenhuma informação foi perdida entre os steps
   - Validar se todos os steps anteriores foram completados

### Requisitos Gerais de Validação
- Feedback visual imediato para o usuário
- Mensagens de erro claras e específicas
- Validação em tempo real nos campos
- Não permitir avançar para próximo step com erros
- Persistir dados válidos entre steps
- Permitir edição de steps anteriores
- Validar formulário completo antes do envio final

## O que não pode faltar neste projeto?
- Uma releitura do protótipo, em Figma mesmo [preferencialmente] ou outra ferramenta análoga
- Testes automatizados (Jest, React Testing Library)
- Uso de Eslint e Prettier
- Código limpo e semântico
- Componentização adequada
- Responsividade
- Tratamento de erros

## O que pode te destacar?
- Uso de Typescript
- Página inicial de apresentação
- Deploy da aplicação
- Animações fluidas nas transições
- Cobertura de testes

## Entrega
- O código deve ser disponibilizado em um repositório público no GitHub
- Inclua instruções detalhadas de como rodar o projeto
- Screenshots ou GIFs da aplicação funcionando

## Prazo
O prazo para entrega está especificado no edital do processo seletivo.

## Contato
Em caso de dúvidas, utilize o canal de comunicação informado no início do processo seletivo.