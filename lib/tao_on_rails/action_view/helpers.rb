module TaoOnRails
  module ActionView
    module Helpers

      include ::ActionView::Helpers

      def page_id
        controller_names = controller_path.split('/')
        [controller_names, action_name].compact.flatten.join('-')
      end

      def icon_tag(name, options = {})
        if options[:class].present?
          options[:class] += " icon icon-#{name}"
        else
          options[:class] = "icon icon-#{name}"
        end

        use_tag = %Q(<use xlink:href="#icon-#{name}"/>).html_safe
        content_tag(:svg, use_tag, options).html_safe
      end

    end
  end
end
