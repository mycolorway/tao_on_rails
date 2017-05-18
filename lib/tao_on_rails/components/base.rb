module TaoOnRails
  module Components
    class Base

      attr_reader :options, :template_name, :template_paths, :view

      def initialize view, options = {}
        @view = view
        @options = options
        @template_name = self.class.template_name.dup
        @template_paths = self.class.template_paths.dup
        @template_paths.unshift(@options.delete(:template_path)) if @options[:template_path].present?
      end

      def render &block
        if template = find_template
          if block_given?
            template.render(view, {component: self, block_given: true}) do |*name|
              view._layout_for(*name, &block)
            end
          else
            template.render(view, {component: self})
          end
        else
          view.content_tag self.class.tag_name, nil, options, &block
        end
      end

      def translate key
        i18n_scope = self.class.name.underscore.split('/').join('.').gsub(/(.+)_component$/, '\1')
        I18n.t(key, scope: i18n_scope).presence
      end
      alias_method :t, :translate

      def self.tag_name
        @tag_name ||= "#{self.tag_prefix}-#{self.component_name.to_s.dasherize}"
      end

      def self.component_name
        @component_name ||= self.name.underscore.split('/').map(&:singularize).join('_')
          .gsub(/(.+)_component$/, '\1')
          .gsub(/^#{Regexp.quote(self.tag_prefix.to_s.underscore)}_(.+)/, '\1')
      end

      def self.tag_prefix
        :tao
      end

      def self.template_paths
        @template_paths ||= [
          "components/#{self.name.deconstantize.underscore}",
          "#{self.name.deconstantize.underscore}/components"
        ]
      end

      def self.template_name
        @template_name ||= self.name.demodulize.underscore.gsub(/(.+)_component$/, '\1')
      end

      private

      def find_template
        view.lookup_context.find_all(template_name, template_paths, true, template_keys).first
      end

      def template_keys
        [:component, :block_given]
      end

    end
  end
end
