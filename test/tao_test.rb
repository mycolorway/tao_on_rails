require 'test_helper'

class TaoTest < ActiveSupport::TestCase

  test 'version number' do
    assert Tao::VERSION.is_a? String
  end

  test 'Tao::Engine inherits from Rails::Engine' do
    assert Tao::Engine < Rails::Engine
  end

end
