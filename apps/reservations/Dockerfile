FROM docker.arvancloud.ir/node:alpine As development

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm config set registry https://package-mirror.liara.ir/repository/npm

RUN npm install -g pnpm 
RUN pnpm install

COPY . .

RUN pnpm run build


FROM docker.arvancloud.ir/node:alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm config set registry https://package-mirror.liara.ir/repository/npm

RUN npm install -g pnpm 
RUN pnpm install --prod 

COPY --from=development /usr/src/app/dist ./dist

CMD [ "node", "dist/app/reservations/main" ]
