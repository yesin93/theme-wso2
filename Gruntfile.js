var path = require('path');

module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist: {
                options: {
                    style: 'expanded'
                },
                files: {
                    'build/css/<%= pkg.name %>.css': 'scss/base.scss',
                    'build/css/<%= pkg.name %>-ie.css': 'scss/ie.scss'
                }
            }
        },
        cssmin: {
            css:{ 
                files: {
                    'build/css/<%= pkg.name %>.min.css': ['build/css/<%= pkg.name %>.css'],
                    'build/css/<%= pkg.name %>-ie.min.css': ['build/css/<%= pkg.name %>-ie.css']
                }
            }
        },
        concat: {
            dist: {
                files: {
                    'build/js/loading.js': ['templates/js-header.js','js/loading.js','templates/js-footer.js'],
                    'build/js/<%= pkg.name %>.js': [
                        'templates/js-header.js',
                        'js/loading.js',
                        'js/functions.js',
                        'templates/js-footer.js',
                        'js/optional.js'
                    ],
                },
            },
        },
        uglify: {
            options: {
                mangle: false,
                banner: 
                 '/*' +
                 '~   Copyright (c) WSO2 Inc. (http://wso2.com) All Rights Reserved.'+
                 '~'+
                 '~   Licensed under the Apache License, Version 2.0 (the "License");'+
                 '~   you may not use this file except in compliance with the License.'+
                 '~   You may obtain a copy of the License at'+
                 '~'+
                 '~        http://www.apache.org/licenses/LICENSE-2.0'+
                 '~'+
                 '~   Unless required by applicable law or agreed to in writing, software'+
                 '~   distributed under the License is distributed on an "AS IS" BASIS,'+
                 '~   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.'+
                 '~   See the License for the specific language governing permissions and'+
                 '~   limitations under the License.'+
                 '*/'
            },
            my_target: {
                files: {
                    'build/js/<%= pkg.name %>.min.js': ['build/js/<%= pkg.name %>.js']
                }
            }
        },
        json_generator: {
            target: {
                dest: "build/build.json",
                options: {
                    "name": "<%= pkg.name %>",
                    "version": "<%= pkg.version %>",
                    "url": "<%= pkg.url %>",
                    "git": "<%= pkg.git %>",
                    "designer": "<%= pkg.designer %>",
                    "designerURL": "<%= pkg.designerURL %>",
                    "license": "<%= pkg.license %>",
                    "licenseURL": "<%= pkg.licenseURL %>"
                }
            }
        },
        copy: {
            main: {
                files: [
                    { expand: true, cwd: 'build/css/', src: ['**'], dest: 'dist/css/' },
                    { expand: true, cwd: 'build/js/', src: ['<%= pkg.name %>.js','<%= pkg.name %>.min.js'], dest: 'dist/js/' },
                    { expand: true, cwd: 'fonts/', src: ['**'], dest: 'dist/fonts/' },
                    { expand: true, cwd: 'images/', src: ['**'], dest: 'dist/images/' },
                    
                    { expand: true, cwd: 'dist/css/', src: ['**'], dest: 'docs/libs/<%= pkg.name %>_<%= pkg.version %>/css/' },
                    { expand: true, cwd: 'dist/js/', src: ['**'], dest: 'docs/libs/<%= pkg.name %>_<%= pkg.version %>/js/' },
                    { expand: true, cwd: 'dist/fonts/', src: ['**'], dest: 'docs/libs/<%= pkg.name %>_<%= pkg.version %>/fonts/' },
                    { expand: true, cwd: 'dist/images/', src: ['**'], dest: 'docs/libs/<%= pkg.name %>_<%= pkg.version %>/images/' }
                ],
            },
        }
    });
    
    // Load the plugin that provides the “uglify” task.
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-json-generator');

    // Default task(s).
    grunt.registerTask('default', ['sass','cssmin','concat','uglify','json_generator','copy']);

};