FROM node:20
WORKDIR /server
COPY . /server

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/index.js"]