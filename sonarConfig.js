const scanner = require("sonarqube-scanner").default;
scanner(
  {
    serverUrl: "http://localhost:9000", 
    token: "2b6bc7f1336f18a92c2bde36b5788381617374fb",
    options: {
      "sonar.projectName": "DevOps Nodejs Example", 
      "sonar.projectDescription": "Sample project to DEMO DevOps Nodejs Example",
      "sonar.projectKey": "DevOps-Nodejs-Example",
      "sonar.projectVersion": "1.0.0",
      "sonar.sources": ".", // `src` source code for sonar coverage
    //   "sonar.exclusions": "**/exclusions.scss", 
    //   "sonar.javascript.lcov.reportPaths": "coverage/lcov.info" 
    }
  },
  error => {
    if (error) {
      console.error(error);
    }
    process.exit();
  }
);