FROM ubuntu:22.04
LABEL maintainer="pernudi@ualberta.ca"

# install node16 and yarn
RUN curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get update -y \
	&& apt-get install -y nodejs \
	&& apt-get install -y yarn

# install libraries
COPY package*.json ./
RUN yarn install --frozen-lockfile
