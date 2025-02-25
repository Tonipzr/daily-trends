FROM node:22 AS build

WORKDIR /usr/app

COPY --chown=node:node package*.json .

RUN npm install

COPY --chown=node:node ./src/ ./src/
COPY --chown=node:node ./tsconfig.json .
RUN node --run build



FROM node:22-alpine AS deploy

ENV NODE_ENV=production

WORKDIR /usr/app

COPY --chown=node:node package*.json ./

RUN --mount=type=cache,target=/usr/app/.npm \
    npm set cache /usr/app/.npm && \
    npm ci --omit=dev

USER node

COPY --chown=node:node --from=build /usr/app/dist /usr/app/dist

EXPOSE 4000

CMD ["node", "dist/src/start.js"]
