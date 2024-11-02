# Teste Técnico - Backend
> Knex Empresa Júnior de Computação

## Avaliação
Este teste é uma oportunidade para você demonstrar seus conhecimentos em desenvolvimento backend, modelagem de dados, e boas práticas de programação. Avaliaremos diversos aspectos do seu código e da implementação da solução. Lembrando que não é necessário concluir tudo do projeto, fazer o que conseguir!

## Instruções
- Desenvolva a solução utilizando a linguagem e framework de sua preferência
- Utilize qualquer ORM de sua escolha
- Você pode utilizar quaisquer bibliotecas externas que considerar necessárias
- Adicione um arquivo README.md com instruções claras de como executar sua aplicação
- O desenvolvimento deve ser individual

## Desafio
Desenvolver uma API REST para gerenciar doações aos cães que habitam o campus universitário. O sistema deve gerenciar doadores, doações e pagamentos via PIX, mantendo um histórico das transações.

### A solução deve focar em três pontos principais:
1) CRUD completo de doações e doadores
2) Validações robustas e tratamento de erros
3) Integração com sistema PIX (mock) e gestão de status de pagamentos

### Entidades e Relacionamentos

**Doador**
- id
- nome
- email
- telefone
- data_cadastro
- Relacionamento: Um doador pode ter várias doações

**Doação**
- id
- valor
- mensagem
- status (pendente/confirmada/cancelada)
- data_criacao
- data_confirmacao
- Relacionamento: Pertence a um doador
- Relacionamento: Possui um pagamento

**Pagamento**
- id
- chave_pix
- qr_code
- status
- data_criacao
- data_expiracao
- data_confirmacao
- Relacionamento: Pertence a uma doação

### Requisitos de Validação

**Doador**
- Nome: obrigatório, mínimo 3 caracteres
- Email: obrigatório, formato válido, único no sistema
- Telefone: opcional, formato brasileiro válido se fornecido

**Doação**
- Valor: obrigatório, mínimo R$ 5,00, máximo R$ 10.000,00
- Status: transições válidas conforme regra de negócio
- Mensagem: opcional, máximo 200 caracteres

**Pagamento**
- Timeout de 15 minutos para pagamento
- Validação de status conforme regras de negócio
- Não permitir confirmar pagamentos expirados

### Casos de uso

## Gestão de doadores
- Deve ser possível cadastrar um novo doador no sistema
- Deve ser possível consultar informações de um doador específico
- Deve ser possível atualizar os dados cadastrais de um doador
- Deve ser possível visualizar o histórico de doações de um doador

## Gestão de doações
- Deve ser possível um doador realizar uma ou mais doações
- Deve ser possível consultar o status de uma doação específica
- Deve ser possível filtrar doações por período, valor ou status
- Deve ser possível cancelar uma doação pendente
- Deve ser possível configurar doações recorrentes mensais
- Deve ser possível adicionar uma mensagem personalizada à doação

## Gestão de Pagamentos

- Deve ser possível gerar um QR Code PIX para uma doação
- Deve ser possível confirmar o recebimento de um pagamento PIX
- Deve ser possível consultar o status de um pagamento
- Deve ser possível gerar nova chave PIX quando o pagamento expirar
- Sistema deve notificar o doador após confirmação do pagamento

### Regras de Negócio
- Doação só pode ser cancelada se estiver pendente
- Pagamento confirmado não pode ser alterado
- Pagamento expirado deve gerar nova chave PIX
- Sistema deve registrar todas as mudanças de status

## O que não pode faltar neste projeto?
- Uso de Typescript
- Código limpo e semântico
- Uso de Eslint e Prettier
- Tratamento de erros padronizado
- Validação de dados

## O que pode te destacar?
- Docker
- Deploy da aplicação
- S.O.L.I.D.
- Uso de PostgreSQL
- Monitoramento de erros
- Testes automatizados
- Documentação detalhada

## Entrega
- O código deve ser disponibilizado em um repositório público no GitHub
- Inclua instruções detalhadas de como rodar o projeto

## Prazo
O prazo para entrega está especificado no edital do processo seletivo.

## Contato
Em caso de dúvidas, utilize o canal de comunicação informado no início do processo seletivo.