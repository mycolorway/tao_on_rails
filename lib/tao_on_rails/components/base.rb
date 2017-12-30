module TaoOnRails
  module Components
    class Base

      attr_reader :options, :view

      delegate :component_name, :tag_prefix, :template_paths, :template_name, to: :class

      def initialize view, options = {}
        @view = view
        @options = merge_options default_options, options
        template_paths.unshift(@options.delete(:template_path)) if @options.key?(:template_path)
        @tag_name = @options.delete(:tag_name)
      end

      def render &block
        if template = find_template
          render_template template, &block
        else
          view.content_tag tag_name, nil, html_options, &block
        end
      end

      def render_template(template, &block)
        if template.is_a?(String) || template.is_a?(Symbol)
          template = find_template(template)
        end

        if template
          if block_given?
            block_content = view.capture(&block)
            template.render(view, {component: self, block_given: true}) do |*name|
              view._layout_for(*name) {block_content}
            end
          else
            template.render(view, {component: self})
          end
        end
      end

      def translate key, options = {}
        keys = [].tap do |result|
          component_class = self.class
          until component_class == TaoOnRails::Components::Base
            scope = component_class.name.underscore.split('/').join('.').gsub(/(.+)_component$/, '\1')
            result << "#{scope}.#{key}".to_sym
            component_class = component_class.superclass
          end
        end
        I18n.t(keys.shift, options.merge!(default: keys))
      end
      alias_method :t, :translate

      def html_options
        @html_options ||= transform_html_options options
      end

      def tag_name
        @tag_name || self.class.tag_name
      end

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

      def default_options
        {}
      end

      def merge_options options, other_options
        options.merge(other_options) { |key, old_val, new_val|
          if key.to_s == 'class'
            old_val = old_val.split(' ') if old_val.is_a? String
            new_val = new_val.split(' ') if new_val.is_a? String
            Array(old_val) + Array(new_val)
          elsif old_val.is_a?(Hash) && old_val.is_a?(Hash)
            old_val.merge! new_val
          else
            new_val
          end
        }
      end

      def transform_html_options options, other_options = nil
        if other_options
          options = merge_options options, other_options
        end

        options.transform_keys { |key|
          key.to_s.dasherize.to_sym
        }.transform_values { |value|
          case value
          when true
            ''
          when false
            nil
          else
            value
          end
        }
      end

      def find_template(name = template_name)
        view.lookup_context.find_all(name, template_paths, true, template_keys, formats: [:html]).first
      end

      def template_keys
        @template_keys ||= [:component, :block_given]
      end

    end
  end
end
