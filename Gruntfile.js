module.exports = (grunt) => {
    grunt.initConfig({
      execute: {
        target: {
          src: ['./backend/server.js']
        }
      },
      watch: {
        scripts: {
          files: ['./backend/server.js'],
          tasks: ['execute'],
        },
      }
    });
  
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-execute');
  };