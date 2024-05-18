FROM node:lts

WORKDIR /app

COPY package*.json ./

RUN npm install
ENV DATABASE_URL postgresql://myuser:mypassword@localhost:5432/mydb?schema=public

COPY . .
COPY ./prisma ./

RUN npx prisma generate

EXPOSE 3000

CMD [ "npm", "run", "dev" ]