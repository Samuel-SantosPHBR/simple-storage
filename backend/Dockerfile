FROM node:18-alpine

WORKDIR /usr/app

# Copiar package.json e package-lock.json (se existir)
COPY package*.json ./

# Instalar dependências
RUN npm install

# Criar diretório de uploads
RUN mkdir -p uploads

# Copiar código fonte
COPY . ./

EXPOSE 3001

CMD ["npm", "run", "dev"]