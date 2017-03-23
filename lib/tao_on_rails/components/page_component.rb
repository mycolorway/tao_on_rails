require 'tao_on_rails/components/base'

module TaoOnRails
  module Components
    class PageComponent < Base

      def initialize view, options
        super

        @page_id = view.page_id

        if @options[:class].present?
          @options[:class] += " tao-page #{@page_id}-page"
        else
          @options[:class] = "tao-page #{@page_id}-page"
        end
      end

      def render &block
        view.content_tag "#{view.page_id}-page", options, &block
      end

      def self.component_name
        :page
      end

    end
  end
end
