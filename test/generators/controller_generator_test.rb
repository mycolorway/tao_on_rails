require 'test_helper'
require 'generators/tao/controller/controller_generator'

class Tao::Generators::ControllerGeneratorTest < Rails::Generators::TestCase
  include Tao::Generators::TestHelpers

  tests Tao::Generators::ControllerGenerator

  test 'generate controller files' do
    assert_no_file 'app/controllers/employees_controller.rb'
    run_generator %w(employees show edit update)
    assert_file 'app/controllers/employees_controller.rb' do |content|
      assert_match(/class EmployeesController < ApplicationController/, content)
      assert_match(/def show/, content)
      assert_match(/def edit/, content)
      assert_match(/def update/, content)
      assert_match(/def build_employee/, content)
      assert_match(/def load_employee/, content)
      assert_match(/def employee_params/, content)
    end
  end

end
