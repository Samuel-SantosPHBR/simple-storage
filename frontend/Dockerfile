FROM node:18-alpine

WORKDIR /usr/app

# Copiar package.json e package-lock.json (se existir)
COPY package*.json ./

# Instalar dependências
RUN npm install

# Copiar código fonte
COPY . ./

EXPOSE 3000

CMD ["npm", "run", "dev"]