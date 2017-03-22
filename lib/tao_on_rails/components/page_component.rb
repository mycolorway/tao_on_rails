require 'tao_on_rails/components/base'

module TaoOnRails
  module Components
    class PageComponent < Base

      component_name :page

      def initialize options = {}, view = nil
        super

        if @options[:class].present?
          @options[:class] += " tao-page #{tag_name}"
        else
          @options[:class] = "tao-page #{tag_name}"
        end
      end

      def render &block
        view.content_tag "#{self.class.tag_prefix}-#{view.page_id}", options, &block
      end

    end
  end
end
