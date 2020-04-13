# Geth
# --datadir /root/edu
# example: docker build -t eth-img:xenial .

FROM ubuntu:xenial

MAINTAINER foo <eth@kosmo.com>

ENV HOME /root
ENV DATADIR /root/edu
ENV TZ Asia/Seoul

RUN rm /bin/sh && ln -s /bin/bash /bin/sh
RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections


# Install Geth from PPA
# Always combine RUN apt-get update with apt-get install in the same RUN
RUN apt-get update \
      && apt-get install -y software-properties-common \
      && add-apt-repository -y ppa:ethereum/ethereum \
      && apt-get update \
      && apt-get install -y ethereum \
      && apt-get install -y git curl tree vim iputils-ping netcat-openbsd dos2unix

RUN echo $TZ > /etc/timezone && \
    apt-get update && apt-get install -y tzdata && \
    rm /etc/localtime && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && \
    dpkg-reconfigure -f noninteractive tzdata

RUN mkdir $HOME/edu && mkdir $HOME/shared

# genesis.json
COPY ./genesis_istanbul.json $HOME/genesis.json
# COPY ./genesis.json $HOME/genesis.json

# config
COPY ./config.toml $HOME/config.toml

RUN geth --datadir=$DATADIR --nousb init $HOME/genesis.json

COPY ./.vimrc $HOME/.vimrc

RUN dos2unix $HOME/.vimrc

CMD ["/bin/bash"]
