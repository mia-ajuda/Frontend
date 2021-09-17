FROM node:14

# Diretorio de trabalho
WORKDIR /app

# Docker guarda cache para cada instrução do dockerfile.
# Colocar instruções mais mutáveis no final do arquivo para haver proveito do cache
RUN yarn global add expo-cli


COPY package.json /app/

RUN yarn install

# Após instalação das dependências do package.json, é hora de instalar o expo que é onde o app é executado
# Copiar todo o diretório para o diretório de trabalho do Docker
# Definir a porta 19000 como porta de trabalho
# Definir o comando yarn start para quando executarmos o comando "run" no container

COPY . /app/

EXPOSE 19000


ENV EXPO_DEVTOOLS_LISTEN_ADDRESS=0.0.0.0


CMD REACT_NATIVE_PACKAGER_HOSTNAME=$IP_ADDRESS yarn start