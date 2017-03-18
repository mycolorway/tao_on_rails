module TaoOnRails
  module ActionView
    module Helpers

      include ::ActionView::Helpers
      include ::ActionView::Context

      def page_id
        controller_names = controller_path.split('/')
        [controller_names, action_name].compact.flatten.join('-')
      end

      def icon_tag(name, attributes = {})
        if attributes[:class].present?
          attributes[:class] += " icon icon-#{name}"
        else
          attributes[:class] = "icon icon-#{name}"
        end

        use_tag = %Q(<use xlink:href="#icon-#{name}"/>).html_safe
        content_tag(:svg, use_tag, attributes).html_safe
      end

      def tao_page(tag,  attributes = nil, &block)
        if tag.is_a? Hash
          attributes = tag
          tag = "#{page_id.dasherize}-page"
        end

        if attributes[:class].present?
          attributes[:class] += " tao-page #{tag}"
        else
          attributes[:class] = "tao-page #{tag}"
        end

        content_tag(tag, capture(&block), attributes)
      end

    end
  end
end
