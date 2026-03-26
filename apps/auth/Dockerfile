ARG MIRROR_REGISTRY=https://package-mirror.liara.ir/repository/npm/

FROM docker.arvancloud.ir/node:alpine As development

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

ARG MIRROR_REGISTRY
RUN npm install -g pnpm --registry="$MIRROR_REGISTRY"
RUN pnpm install --registry="$MIRROR_REGISTRY"

COPY . .

RUN pnpm run build


FROM docker.arvancloud.ir/node:alpine As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
ARG MIRROR_REGISTRY

WORKDIR /usr/src/app

COPY package.json ./
COPY pnpm-lock.yaml ./

RUN npm install -g pnpm --registry="$MIRROR_REGISTRY"
RUN pnpm install --prod --registry="$MIRROR_REGISTRY"

COPY --from=development /usr/src/app/dist ./dist

CMD [ "node", "dist/app/auth/main" ]
