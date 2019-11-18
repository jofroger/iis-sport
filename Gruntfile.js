module.exports = (grunt) => {
    grunt.initConfig({
      execute: {
        target: {
          src: ['./backend/dtb-connection.js']
        }
      },
      watch: {
        scripts: {
          files: ['./backend/dtb-connection.js'],
          tasks: ['execute'],
        },
      }
    });
  
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-execute');
  };