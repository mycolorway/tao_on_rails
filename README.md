# Tao on Rails [![Build Status](https://travis-ci.org/mycolorway/tao_on_rails.svg?branch=master)](https://travis-ci.org/mycolorway/tao_on_rails)

[Ruby on Rails](http://rubyonrails.org/) lacks a recommended way to structure your frontend code for many years. Tao on Rails is the framework to fill the gap which will modularize your page with the new [Custom Elements v1](https://developers.google.com/web/fundamentals/getting-started/primers/customelements) API.

## Usage

Create new Tao application with following commands:

```bash
rails new app_name -m https://git.io/vM2ml
```

There are generators provided by Tao for you to quickly start your work:

* assets
* view
* controller
* locale
* channel
* scaffold

It is recommended to use `scaffold` generator as first step of your workflow. See `rails g scaffold --help` for more information.

## Plugin

Create plugin of Tao on Rails with following commands:

```bash
rails plugin new plugin_name -m https://git.io/vM2ml
```

## Contributing

Bug reports and pull requests are welcome on GitHub at https://github.com/mycolorway/tao_on_rails. This project is intended to be a safe, welcoming space for collaboration, and contributors are expected to adhere to the [Contributor Covenant](http://contributor-covenant.org) code of conduct.


## License

The gem is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).
