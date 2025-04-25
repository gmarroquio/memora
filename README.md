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
- Polar (dont know)
  4% + U$0.4
- Vercel
  20 USD
- Cloudflare R2 (fazer como teste)
  - 0.015 after 10gb
  - Cloudflare images for content delivery
- Convex
  25 usd + 0.03 per gb after 100 gb
  - auth
  - database
  - storage (can be r2)
  - real time
- Supabase (gone)
  25 USD + 0.021 per gb after 100GB
  - auth
  - storage
  - database
- Uploadthing (gone)
  25 USD - 250gb + 0.08usd per gb after 250gb
- Clerk (gone)
  25 USD + 0.02 per MAU after 10k

### Planos

Por album e por pessoa

Album com 10
9.99
Album com 25
19.99
Album com 50
39.99
Album com 100
69.99
Album com 150
99.99
