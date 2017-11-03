module Tao
  module Generators
    class InstallGenerator < Rails::Generators::Base
      source_root File.expand_path('../templates', __FILE__)

      def install_tao
        assert_rails_version

        gem 'tao_on_rails'

        # remove_file 'app/assets/javascripts/cable.js'
        # remove_file 'app/assets/javascripts/application.js'
        # remove_file 'app/assets/stylesheets/application.css'
        #
        # template 'app/assets/javascripts/application.coffee'
        # template 'app/assets/stylesheets/application.scss'
        # template 'app/assets/stylesheets/_globals.scss'
        #
        # template 'app/views/layouts/application.html.erb', force: true

        template 'app/components/application_component.rb'
      end

      private

      def assert_rails_version
        requirement = Gem::Requirement.new('>= 5.0.0')
        rails_version = Gem::Version.new(Rails::VERSION::STRING)
        return if requirement.satisfied_by?(rails_version)
        fail Rails::Generators::Error, 'Rails >= 5.0.0 is required'
      end

    end
  end
end
