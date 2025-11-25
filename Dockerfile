FROM node:20-alpine

WORKDIR /app

# Copy only if these files exist — harmless if they don’t
# (Docker will warn but not fail)
COPY package*.json ./

# Install deps ONLY if package.json is present
RUN if [ -f package.json ]; then npm install; fi

# Copy the rest of the project
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
