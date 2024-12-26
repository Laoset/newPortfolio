FROM node:20.18.1-alpine
WORKDIR /app
COPY . .

RUN npm install
RUN npm run build
CMD ["npm", "start"]