module Tao
  module Generators
    class IconsGenerator < Rails::Generators::NamedBase
      source_root File.expand_path('../templates', __FILE__)

      class_option :svg_path, type: :string, default: 'app/assets/icons', desc: "Directory path containing svg source files."

      attr_reader :icons_html

      def create_icons_file
        @icons_html = svg_files.map {|file| "  #{symbol(file)}\n"}.join
        template 'icons.coffee.erb', 'lib/assets/javascripts/tao/icons.coffee'
      end

      private

      def svg_file
        Dir.glob(File.expand_path(::Rails.root, svg_path, '*.svg')).uniq
      end

      def symbol(path)
        name = File.basename(path, ".*").underscore().dasherize()
        content = File.read(path)
        content.gsub(/<?.+\?>/,'')
          .gsub(/<!.+?>/,'')
          .gsub(/<title>.*<\/title>/, '')
          .gsub(/<desc>.*<\/desc>/, '')
          .gsub(/id=/,'class=')
          .gsub(/<svg.+?>/, %Q{<svg id="icon-#{name}" #{dimensions(content)}>})
          .gsub(/svg/,'symbol')
          .gsub(/\sfill=".+?"/,'')
          .gsub(/\n/, '') # Remove endlines
          .gsub(/\s{2,}/, ' ') # Remove whitespace
          .gsub(/>\s+</, '><') # Remove whitespace between tags
      end

      def dimensions(content)
        dimension = content.scan(/<svg.+(viewBox=["'](.+?)["'])/).flatten
        %Q{#{dimension.first} width="100%" height="100%"}
      end

    end
  end
end
