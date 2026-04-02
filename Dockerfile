# ===== BUILD =====

# Usa Node.js versão 20 baseado em Alpine Linux (imagem leve)
# Essa etapa será usada apenas para compilar o Angular
FROM node:20-alpine AS build

# Define a pasta de trabalho dentro do container
# Todos os comandos seguintes rodam dentro de /app
WORKDIR /app

# Copia package.json e package-lock.json
# Faz isso separado para aproveitar cache do Docker
COPY package*.json ./

# Instala dependências do projeto de forma limpa e reprodutível
# (mais rápido e confiável para CI/CD)
RUN npm ci

# Copia todo o código fonte do frontend para o container
COPY . .

# Executa o build do Angular
# Gera os arquivos finais dentro da pasta dist/
RUN npm run build

# ===== SERVE =====

# Usa nginx leve baseado em Alpine para servir arquivos estáticos
FROM nginx:alpine

# Copia o resultado do build da etapa anterior
# para a pasta que o nginx usa para servir o site
COPY --from=build /app/dist/angular-basico/browser /usr/share/nginx/html

# Informa que o container usa a porta 80 (HTTP)
EXPOSE 80
