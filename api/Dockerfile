FROM node:alpine

WORKDIR /usr/src/app
COPY package.json package-lock.json ./

RUN npm ci --only=production
COPY . .

EXPOSE 3000
USER node

CMD ["node", "app.js"]
