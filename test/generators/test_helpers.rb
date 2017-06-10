module Tao
  module Generators
    module TestHelpers
      extend ActiveSupport::Concern

      included do
        destination File.expand_path("tmp", File.dirname(__FILE__))

        setup do
          generate_sample_app
        end

        teardown do
          remove_sample_app
        end

        def generate_sample_app
          root_path = File.expand_path('../', destination_root)
          FileUtils.cd(root_path) do
            system "rails new tmp --skip-active-record --skip-action-mailer --skip-test-unit --skip-spring --skip-bundle --skip-system-test --skip-git --quiet"
          end
        end

        def remove_sample_app
          FileUtils.rm_rf(destination_root)
        end
      end

    end
  end
end
