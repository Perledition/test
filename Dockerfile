# Base image
#FROM node:15.4 as build

# Working directory
#WORKDIR /app

# Copy package.json and package-lock.json
#COPY package*.json .

# Install dependencies
#RUN npm i
# RUN npm ci --only=production
# RUN npm ci --production

# Copy application files
#COPY . .

#RUN npm run build

#FROM nginx:1.19 as prod

#COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
#COPY --from=build /app/build /usr/share/nginx/html


# Expose the desired port (replace 3000 with the actual port if needed)
#EXPOSE 80

# Start the application
#CMD ["nginx", "-g", "daemon off;"]
FROM node:18-alpine3.16
WORKDIR /app
COPY . /app
RUN npm install
RUN npm run build
CMD ["npx", "serve", "-s", "build"]