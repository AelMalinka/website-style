# Copyright 2017 (c) Michael Thomas (malinka) <malinka@entropy-development.com>
# Distributed under the terms of the GNU Affero General Public License v3

FROM us.gcr.io/entropy-development/node

RUN mkdir -p /code
COPY . /code
WORKDIR /code
RUN npm install
VOLUME /code

ENV	STYLE_DIR="style" \
	STYLE_COMPRESS="true" \
	PORT="8080"

CMD [ "npm", "start" ]
