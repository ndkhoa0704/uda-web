FROM ubuntu:latest
LABEL authors="ndkhoa"

ENTRYPOINT ["top", "-b"]