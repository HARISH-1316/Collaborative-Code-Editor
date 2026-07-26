FROM ubuntu:24.04

WORKDIR /workspace

RUN apt-get update && \
    apt-get install -y gcc && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

CMD ["bash"]