FROM node:14.15.4

#Ubicarse en el directorio
WORKDIR /app

#Copiar los archivos
COPY ["./src", "/app/"]

RUN ls

RUN npm install

#Exponer puerto en el host anfitrion
EXPOSE 3000