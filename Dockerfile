FROM .devcontainer/base.dockerfile

RUN yarn build

CMD ["yarn", "start"]
