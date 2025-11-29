# Use lightweight Nginx image
FROM nginx:alpine

# Copy all frontend files into Nginx html folder
COPY ./frontend /usr/share/nginx/html
