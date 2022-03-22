###
# Compass
###

# ::Compass.configuration.sass_options = { :debug_info => true }
# # Change Compass configuration
# class MyFeature < Middleman::Extension
#   def initialize(app, options_hash={}, &block)
#     super
#
#     app.compass_config do |config|
#       # config is the Compass.configuration object
#       # config.output_style = :compact
#       config.sass_options = {:debug_info => true, :quiet => true, :sourcemap => true}
#       # enable_sourcemaps = true
#     end
#   end
# end
# compass_config do |config|
#   config.sass_options = {:debug_info => true}
#   config.output_style = :expanded
#   # config.enable_sourcemaps = true
# end

###
# HAML
###

set :haml, {
  :attr_wrapper =>  "\"",
}

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
page "-i.html", :layout => false
page "h-*", :layout => :helps
page "a-*", :layout => :account
page "index*.html", :layout => :main
#
# With alternative layout
# page "/path/to/file.html", :layout => :otherlayout
#
# A path which all have the same layout
# with_layout :admin do
#   page "/admin/*"
# end

# Proxy pages (http://middlemanapp.com/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", :locals => {
#  :which_fake_page => "Rendering a fake page with a local variable" }

###
# Helpers
###

# Automatic image dimensions on image_tag helper
# activate :automatic_image_sizes

# Reload the browser automatically whenever files change
activate :livereload

# Parse CSS and add vendor prefixes to CSS rules using values from Can I Use
activate :autoprefixer

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end
# activate :directory_indexes

set :build_dir, 'tmp'
set :css_dir, 'assets/stylesheets'
set :js_dir, 'assets/javascripts'
set :images_dir, 'assets/images'
set :partials_dir, 'shared'


# Build-specific configuration
configure :build do
  # For example, change the Compass output style for deployment
  activate :minify_css

  # Minify Javascript on build
  activate :minify_javascript

  # Enable cache buster
  # activate :asset_hash

  # Use relative URLs
  # activate :relative_assets

  # Or use a different image path
  # set :http_prefix, "/Content/images/"
end
