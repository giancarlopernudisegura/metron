FROM node:16
LABEL maintainer="pernudi@ualberta.ca"

RUN yarn install --frozen-lockfile

ENTRYPOINT [ "bash" ]
