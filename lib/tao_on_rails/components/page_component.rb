require 'tao_on_rails/components/base'

module TaoOnRails
  module Components
    class PageComponent < Base
      attr_reader :page_id

      def initialize view, options = {}
        @page_id = view.page_id
        super
      end

      def render &block
        view.content_tag "#{view.page_id}-page", options, &block
      end

      def self.component_name
        :page
      end

      private

      def default_options
        {class: ['tao-page', "#{@page_id}-page"]}
      end

    end
  end
end
