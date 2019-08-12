@Library('mdc-pipeline-library@1.3.8') _

def build(String envName) {
  sh "rm -rf build"
  sh "bin/build ${envName}"
  stash(name: "${envName}-deploy-artifacts", includes:"build/**,firebase.json,bin/deploy,secrets/${envName}.env")
}

def deploy(String envName) {
  sh "rm -rf build"
  unstash "${envName}-deploy-artifacts"
  sh "bin/deploy ${envName}"
}

pipeline {
  environment {
    AGENT_LABEL        = "k8s"
    SLACK_CHANNEL      = "#ops"

    BUILD_APP_NAME     = getPackageJsonName()
    BUILD_VERSION      = getPackageJsonVersion()
    BUILD_NUMBER_FULL  = getFullBuildNumber()
  }

  agent { label env.AGENT_LABEL }

  stages {
    stage('build') {
      steps {
        revealGitSecrets()
        sh "yarn install"
        //build "stg"
        build "prod"
      }
    }

    // stage("[stg] deploy") {
    //   agent { label env.AGENT_LABEL }
    //   options {
    //     timeout(time: 1, unit: "HOURS")
    //     skipDefaultCheckout()
    //   }
    //   input {
    //     message "Should we deploy to [stg]?"
    //     ok "Yes, we should."
    //   }
    //   steps {
    //     deploy "stg"
    //   }
    //   post {
    //     success {
    //       slackSend channel: env.SLACK_CHANNEL, color: 'good', message: "${env.BUILD_APP_NAME}@${env.BUILD_VERSION} deployed to STG"
    //     }
    //   }
    // }

    stage("[prod] deploy") {
      agent { label env.AGENT_LABEL }
      when {
        branch 'master'
      }
      options {
        timeout(time: 1, unit: "DAYS")
        skipDefaultCheckout()
      }
      input {
        message "Should we deploy to [prod]?"
        ok "Yes, we should."
      }
      steps {
        deploy "prod"
      }
      post {
        success {
          slackSend channel: env.SLACK_CHANNEL, color: 'good', message: "${env.BUILD_APP_NAME}@${env.BUILD_VERSION} deployed to PROD"
        }
      }
    }
  }
}
