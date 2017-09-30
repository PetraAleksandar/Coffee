module.exports = function (grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    watch: {
      sass: {
        files: ['style/main.scss'],
        tasks: ['sass', 'postcss'],
      }
    },
    sass: {
      options: {
        style: 'compressed'
      },
      dist: {
        files: {
          'build/style.css': 'style/main.scss'
        }
      }
    },
    postcss: {
      options: {
        map: true,
        processors: [
          require('autoprefixer') ({browsers: 'last 2 versions'})
        ]
      },
      dist: {
        src: 'build/style.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-postcss');
  grunt.registerTask('default', ['watch']);
};
