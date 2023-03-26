FROM node:18.12.1

EXPOSE 3000

WORKDIR /app

RUN npm install npm@latest -g

COPY package.json yarn.lock ./

run npm install

COPY . .

CMD ["node", "./bin/www"]

