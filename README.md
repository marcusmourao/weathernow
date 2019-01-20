# weathernow

> A simple weather checker

## Build Setup

``` bash
# Versão mínima do Node:8
# Primeiramente instale todas as dependências do projeto
$ npm install

# Para rodar os testes locais
$ npm run test

# Para subir o ambiente em modo de desenvolvimento (a porta 3000 deve estar disponível)
$ npm run dev

# O ambiente estará rodando em http://localhost:3000
```

## Build Production

``` bash
# Versão mínima do Node: 8
# Primeiramente instale todas as dependências do projeto
$ npm install --only=production

# Build o projeto
$ npm run build

# Start o projeto
$ npm run start

# O ambiente estará rodando em http://localhost:3000
```

## Usuários Docker - Production
``` bash
# Realize o build da imagem
$ docker build -t weather-now .

# Rode a imagem localmente
$ docker run -d --restart=always -p 3000:3000 weather-now
# O ambiente estará rodando em http://localhost:3000
```

## Ambiente Online
```bash
# Acesse http://165.227.252.136:3010/
```
