# Event photo project (Memora)

### Veja seu evento pelo ponto de vista dos seus convidados

## Database

| User    | Name     | Email           | Number         | ID      |
| ------- | -------- | --------------- | -------------- | ------- |
| id      | string   | string          | string         | id      |
| Album   | Name     | User ID         | Cover          |
| -----   | ------   | -------         | ---            |
| id      | string   | user_id         | string         |
| Media   | URL      | Expiration Date | Album ID       | Deleted |
| ------  | ------   | --------------- | --------       | ---     |
| string  | string   | date            | album_id       | boolen  |
| Preview | URL      | Media ID        | Quality        |
| ---     | ---      | ---             | ---            |
| string  | string   | media_id        | SD, HD, FULLHD |
| Code    | Album ID | Expiration      |
| ------  | -------- | ----------      |
| string  | album_id | date            |

## Custos

- Stripe
  3.99% + R$0.39
- Vercel
  20 USD
- Supabase
  25 USD + 0.021 per gb after 100GB
- Turso
  8.25/25 USD
- Uploadthing
  25 USD - 250gb + 0.08usd por gb > 250gb
- Clerk
  25 USD + 0.02 per MAU after 10k
- Cloudflare

### Planos

Paga e tem acesso por x meses, fotos são apagadas dps de 1 mês sem novo pagamento
Fotos acima do limite com tempo de expiração, 0.1 cents a mais por foto

- tier 1 - custo 1.35 usd - price 19.9 usd
  - 500 fotos
  - 6 meses
- tier 2 - custo 5.4 usd - price 59.9 usd
  - 1000 fotos
  - 1 ano
- tier 3 - custo 21.6 usd - price 129.9 usd
  - ilimitado
  - 1 ano
