FROM node:23-bookworm-slim
LABEL authors="ndkhoa"

ENTRYPOINT ["top", "-b"]