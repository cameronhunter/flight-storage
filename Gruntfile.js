module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    jasmine: {
      test: {
        src: 'lib/*.js',
        options: {
          specs: 'test/**/*.js',
          vendor: [
            // flight dependencies
            "components/jquery/jquery.js",
            "components/es5-shim/es5-shim.js",
            "components/es5-shim/es5-sham.js",
            // jasmine extensions
            "components/jasmine-jquery/lib/jasmine-jquery.js",
            "components/flight-jasmine/lib/flight-jasmine.js"
          ],
          template: require('grunt-template-jasmine-requirejs'),
          templateOptions: {
            requireConfig: {
              paths: {
                flight: 'components/flight'
              }
            }
          }
        }
      }
    }
  });

  // Load the plugin that provides the "grunt-contrib-jasmine" task.
  grunt.loadNpmTasks('grunt-contrib-jasmine');

  grunt.registerTask('default', ['jasmine']);
  grunt.registerTask('travis', ['jasmine']);
};