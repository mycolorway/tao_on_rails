# Configure Rails Environment
ENV['RAILS_ENV'] = 'test'

require File.expand_path('../../test/dummy/config/environment.rb', __FILE__)
require 'rails/test_help'
require 'generators/test_helpers'
require 'mocha/mini_test'


# Filter out Minitest backtrace while allowing backtrace from other libraries
# to be shown.
Minitest.backtrace_filter = Minitest::BacktraceFilter.new
