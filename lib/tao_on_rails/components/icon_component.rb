require 'tao_on_rails/components/base'

module TaoOnRails
  module Components
    class IconComponent < Base

      attr_reader :name

      def initialize name, options, view
        super options, view

        @name = name

        if @options[:class].present?
          @options[:class] += " icon icon-#{name}"
        else
          @options[:class] = "icon icon-#{name}"
        end
      end

      def render
        view.content_tag(:svg, %Q(<use xlink:href="#icon-#{name}"/>).html_safe, options)
      end

      def self.component_name
        :icon
      end

    end
  end
end
