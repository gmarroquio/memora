# Wedding photo project (probably event)

### Veja seu evento pelo ponto de vista dos seus convidados

## Todo

- [x] Mudar a navegação da dashboard pro lado
- [x] Cadastro
- [x] Show Camera
- [x] Take photo
- [x] Upload photo
- [x] Colocar botão pra mudar a camera
- [x] Colocar a camera em full screen
- [x] Improve photo quality
- [x] Upload page
  - [x] Upload page topbar only with logo
  - [x] Arrumar o tamanho do preview
  - [x] Change button to retake
  - [x] blank page with powered by [App Name]
- [ ] Create album
  - [ ] Add cover
  - [ ] Show cover or title on upload photo
- [ ] On open upload check id code is valid
- [ ] Codigo do album
  - [ ] Validade do codigo
- [ ] Generate QR code to album - site.com/album/add-photo/${CODE}
- [ ] Delete photo
- [ ] Photo expiration time kinda
  - add to metadata
  - add to database
- [ ] Code expiration time
- [ ] if db failed -> Delete photo
- [ ] Check code expiration date when page load
  - [ ] Show invalid code page
- [ ] On upload generate 3 images with lower quality for preview

### Pre launch

- [ ] Ajustar site para eventos e em português
- [ ] Gerar fotos para o site
- [ ] Nome
- [ ] Cores
- [ ] Social media

### Post launch

- [ ] App
- [ ] Upload video
- [ ] Photo limit (quantity)
- [ ] Add presentation slide for the guests
- [ ] Create a demo account, photo limit, time limit, quality limit, 2 guest per album
- [ ] Fotos acima do limite com marca dagua e com tempo de uma semana
- [ ] Adicionar limite de fotos no album
- [ ] Add presentation slide for the guests
- [ ] Cronjob checking photo expiration date
  - [ ] delete from UT
  - [ ] set on db as deleted

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
  percentage
- Vercel
  20usd
- Uploadthing
  25 USD - 250gb + 0.08usd por gb > 250gb
- Clerk
  25 USD + 0.02 per MAU after 10k

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
