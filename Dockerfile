#Build stage
FROM node:lts AS build

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

RUN HUSKY=0 npm run build

#Production stage
FROM node:lts AS production

WORKDIR /app

COPY package*.json .

RUN HUSKY=0 npm ci --only=production

COPY --from=build /app/dist ./dist

CMD ["node", "dist/src/index.js"]