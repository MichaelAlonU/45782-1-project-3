# Base image
FROM node:22-alpine

WORKDIR /app

# ----------------------------
# Install dependencies
# ----------------------------
# Backend dependencies
COPY ./backend/package*.json ./backend/
RUN npm install --prefix backend

# IO dependencies
COPY ./io/package*.json ./io/
RUN npm install --prefix io

# ----------------------------
# Copy source code
# ----------------------------
COPY ./backend ./backend
COPY ./io ./io

# ----------------------------
# Build TypeScript
# ----------------------------
RUN npm run build --prefix backend
RUN npm run build --prefix io

# Clean src folders to reduce image size
RUN rm -rf ./backend/src ./io/src

# ----------------------------
# Expose ports
# ----------------------------
EXPOSE 3000 3004

# ----------------------------
# Start both servers
# ----------------------------
CMD ["sh", "-c", "node backend/dist/app.js & node io/dist/app.js"]
