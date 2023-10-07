# Use the official Ruby image from Docker Hub
FROM ruby:3.1.2

# Set the working directory inside the container
WORKDIR /app

# Install bundler and bundle install
COPY Gemfile Gemfile.lock ./
RUN gem install bundler && bundle install

# Copy the current directory contents into the container at /app
COPY . .

# Start the application on port 3001
CMD ["rails", "server", "-b", "0.0.0.0", "-p", "3000"]
