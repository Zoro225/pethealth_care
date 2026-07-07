pipeline {

    agent any

    environment {
        BACKEND_IMAGE = "pethealth-backend:v1"
        FRONTEND_IMAGE = "pethealth-frontend:v1"
    }

    stages {

        stage('Checkout Code') {
            steps {
                echo "Cloning repository..."
                git branch: 'main',
                    url: 'https://github.com/Zoro225/pethealth_care.git'
            }
        }


        stage('Backend Build') {
            steps {
                echo "Building Spring Boot backend..."
                sh '''
                    cd backend
                    mvn clean package -DskipTests
                '''
            }
        }


        stage('Frontend Build') {
            steps {
                echo "Building React frontend..."
                sh '''
                    cd frontend
                    npm install
                    npm run build
                '''
            }
        }


        stage('Docker Build') {
            steps {
                echo "Building Docker images..."

                sh '''
                    docker build -t ${BACKEND_IMAGE} ./backend
                    docker build -t ${FRONTEND_IMAGE} ./frontend
                '''
            }
        }


        stage('Deploy Application') {
            steps {
                echo "Deploying application..."

                sh '''
                    docker compose down
                    docker compose up -d
                '''
            }
        }


        stage('Verify Deployment') {
            steps {
                sh '''
                    docker ps
                '''
            }
        }
    }


    post {

        success {
            echo "Deployment Successful 🚀"
        }

        failure {
            echo "Pipeline Failed ❌"
        }
    }
}
