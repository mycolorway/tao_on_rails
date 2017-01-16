module TaoOnRails
  module Generators
    class AppGenerator < Rails::Generators::Base
      source_root File.expand_path('../templates', __FILE__)

      class_option :variants, type: :array, default: [], desc: "Generate files for different variants"

      def create_assets_files
        remove_file 'app/assets/javascripts/cable.js'
        remove_file 'app/assets/javascripts/application.js'
        remove_file 'app/assets/stylesheets/application.css'

        template 'application.coffee.erb', 'app/assets/javascripts/application.coffee'
        template 'application.scss.erb', 'app/assets/stylesheets/application.scss'
        template 'home_index_page.coffee.erb', 'app/assets/javascripts/home/index_page.coffee'
        template 'home_index_page.scss.erb', 'app/assets/stylesheets/home/index_page.scss'
      end

      def create_view_files
        remove_file 'app/views/layouts/application.html.erb'
        remove_file 'app/helpers/application_helper.rb'

        template 'application.html.erb', 'app/views/layouts/application.html.erb'
        template 'application_helper.rb.erb', 'app/helpers/application_helper.rb'
        template 'home_index.html.erb', 'app/views/home/index.html.erb'
      end

      def create_controlller_files
        template 'home_controller.rb.erb', 'app/controllers/home_controller.rb'
        route "root to: 'home#index'"
      end

    end
  end
end
