FROM node:8

ARG ENV=prod
ARG HOST=0.0.0.0

ENV PORT 3000

RUN mkdir -p /app
COPY . /app
WORKDIR /app

EXPOSE $PORT

RUN npm install --only=production
RUN npm run build

CMD npm run start
