# Copyright 2017 (c) Michael Thomas (malinka) <malinka@entropy-development.com>
# Distributed under the terms of the GNU Affero General Public License v3

FROM node

COPY . /code
RUN npm install
VOLUME /code
VOLUME /code/node_modules/config

ENV CONFIG_HOST="localhost" \
	CONFIG_PORT="8080" \
	FORWARD="localhost:8080"

CMD [ "npm", "start" ]
