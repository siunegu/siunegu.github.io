---
layout: post
title: "Rails PDF Generator with Barcodes generated from Models using Wicked PDF & Barby."
date: 2015-04-22 11:40:00
categories: barby wicked_pdf rails pdf
---
1. First Install **wicked_pdf** `gem wicked_pdf`
2. Generate an initializer for wicked pdf `rails generate wicked_pdf`
3. You'll need to add a new mime type in **mime_types.rb** for older versions of Rails 
```
Mime::Type.register "application/pdf", :pdf
```
4. Install `gem wkhtmltopdf-binary` This is important, as wicked_pdf is a wrapper for this binary. 
5. Now run `bundle install` for everything

> if there is an issue with Yosemite add this to your **wicked_pdf.rb** file:

```
 module WickedPdfHelper
  if Rails.env.development?
    if RbConfig::CONFIG['host_os'] =~ /linux/
      executable = RbConfig::CONFIG['host_cpu'] == 'x86_64' ?
'wkhtmltopdf_linux_x64' : 'wkhtmltopdf_linux_386'
    elsif RbConfig::CONFIG['host_os'] =~ /darwin/
      executable = 'wkhtmltopdf_darwin_386'
    else
      raise 'Invalid platform. Must be running linux or intel-based Mac OS.'
    end

    WickedPdf.config = { exe_path:
"#{Gem.bin_path('wkhtmltopdf-binary').match(/(.+)\/.+/).captures.first}/#{executable}"
}
  end
end
```

* * *

You can find more usage of PDF creation options [here](https://github.com/mileszs/wicked_pdf#advanced-usage-with-all-available-option) on the official gem documentation.

* * *
# Getting Something Going

I will not go into building out our models and views in this brief walkthrough, but we will have an "**Orders**" model which will have a bunch of fields, but most importantly a "**Barcode**" field as a *String* where we will generate it dynamically later.

To build a basic PDF output first, let's write this code in our **orders_controller.rb**
```
	# GET /orders/1
	# GET /orders/1.json
	# GET /orders/1.pdf
	def show
		@order = Order.find(params[:id])

		respond_to do |format|
			format.html			
			format.pdf do 
				render pdf: "PDF_#{@order.id}",
							 template: 'layouts/application.pdf.erb',
							 layout: 'order.pdf',
							 show_as_html: params[:debug].present?,                     
               outline: {   outline:           true,
                            outline_depth:     50 },
               margin:  {   top:               35, # default 10 (mm)
                            bottom:            35,
                            left:              35,
                            right:             35 }
			end
		end
	end
```
> Note that the options in our `format.pdf do...end` block  `pdf:` `template:` & `layout:` are necessary for there to be an output. 

Now if you navigate to an order's endpoint such as `<your_app_name>/orders/1.pdf` you will be able view your PDF.

> **pdf: "filenameofyourchoice"**
> 
> This contains the filename of the pdf that will be generated. You need
> this line in order to let WickedPDF know to start its magic.
> 
> **template: "invoices/show.pdf.erb"**
> 
> This is your bread and butter. The draw of wicked_pdf is that you can
> use an existing HTML layout to generate your PDF. This line tells
> WickedPDF where to look for that particular file. In this case, it can
> be found in your app/views/invoices/show.pdf.erb.
> 
> **locals: {:invoice => @invoice}**
> 
> With your HTML layout being loaded, what use is it if you cannot
> populate it with dynamic data. In this example, you want to send your
> invoice details to your view. To do so, we set the locals params like
> in a partial. ( probably used when passing in complex relations )

* * * 

# Templates

In our controller above we specified the template as an **layouts/application.pdf.erb**, which will have code similar to our *application.html.erb* except the catch is that we must use the 'wicked_pdf' tag helpers to have the loaded from the asset pipeline. It would look something like this:

```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<%= wicked_pdf_stylesheet_link_tag "orders" -%>
	<%= wicked_pdf_javascript_include_tag "number_pages" -%>
	<title>Orders</title>
</head>
<body onload="number_pages">
	<div id="header">
		<%= yield %>
	</div>
</body>
</html>

```

We can then have specific partials to be displayed by `yield` or whichever you specify. 

* * *

# Show Variables

Say we want to put model data onto the page ( which is most likely what we are doing anyway ), we simply output it like any other instance variable in rails *eg.* `@order = Order.find params[:id]` Then in an `order.pdf.erb` which we have specified as the layout in our controller code - and we will have saved in **views/layouts/order.pdf.erb** directory of our Rails application. 
So in our **order.pdf.erb** view we can simply do 
```
<%= @order.barcode %> 
<%= @order.something_else %> 
# etc...
``` 

* * *

# Displaying images

Showing images is simply that we must use the wicked_pdf's helpers. The image is loaded from the same assets images folder as the rest of your media. 

```
<%= wicked_pdf_image_tag( "name_of_image.jpg" ) %>
```

> The helper simply outputs a string which is an `<img>` tag with the `src=""` attribute pointing to the image you specify in the helper.

* * *

# Barcodes

So now's the tricky part, we first must install the `gem barby` as well as `gem chunky_png` ( chunky_png is only required if you want to output the Barcode image as a PNG ). You can find more information upon the specifics of Barby [here](https://github.com/toretore/barby) on the official documentation. 

The steps basically involve us taking a Barcode string from our database ( or wherever ) then encoding that to a barcode object, which we will then convert that to an image. We then want to transfer the image to a 'data url' which will be a Base64 encoded string representing our image. Then we will save this string in a variable and fill an image tag with it *. 

> The image helper will not accept this string we pass ( for some reason ) it so we will write our own helper later *

First we must require a bunch of dependencies such as: 
- Barby
- Barby Barcode Encoder, which will vary depending on which one you are doing. In this case we will use a 'Code 128'
- Our PNG outputter, where will use PNGs for this case, may vary depending on what output, can refer to Docs
- Chunky PNG because our PNG outputter requires it 

So at the top of our Controller we:

```
	  require 'chunky_png'
	  require 'barby'
	  require 'barby/barcode/code_128'	  
	  require 'barby/outputter/png_outputter'	 
```

So let's write a `barcode_output` function which will accept an order from our model. We put this in our controller for now ( why not ).

```
	def barcode_output( order )
	  barcode_string = order.barcode	  
	  barcode = Barby::Code128B.new(barcode_string)

	  # PNG OUTPUT
	  data = barcode.to_image(height: 15, margin: 5) .to_data_url
	end
```	

Now modify our **show** action in our controller to spit out a `@barcode` instance variable and pass an `@order` into it:

```
		@order = Order.find(params[:id])
		@barcode = barcode_output( @order )
		# ... 
		# respond_to stuff etc...
```

Now we will have a string that looks something like this in your `@barcode`

```
"data:image/svg+xml;base64,PD94bWwgdmVy..."
```

Wicked PDF's `wicked_pdf_image_tag` outputs an `<img>` tag which points to a `file://Rails.root`based on the root of your rails application. In this specific case, we want to keep our image that we've generated at hand and pass it into the view. So let's build a new helper in our **app/helpers/application_helper.rb**

```
module ApplicationHelper
  def wicked_pdf_image_tag_for_public(img, options={})
    if img[0] == "/"    	
      new_image = img.slice(1..-1)
      image_tag "file://#{Rails.root.join('public', new_image)}", options
    else    	
    	image_tag img
    end
  end	
end

```

Which was taken from [this](http://stackoverflow.com/questions/12180433/wicked-pdf-image-tag-given-undefined-pathname-for-image)  StackOverflow answer. 

Now if we call `<%= wicked_pdf_image_tag_for_public( @barcode ) %>` in our **vies/layouts/order.pdf.erb** it should display the barcode in our PDF !

* * *

# Heroku
Uploading to Heroku you will need to have the wkhtmltopdf binary working on heroku side. To do this you can installa Heroku Buildpack at [heroku-buildpack-wkhtmltopdf](https://github.com/dscout/wkhtmltopdf-buildpack) 
Once your application is live, in the same directory run

```
$ heroku config:set BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git
$ echo 'https://github.com/heroku/heroku-buildpack-ruby.git' >> .buildpacks
$ echo 'https://github.com/dscout/wkhtmltopdf-buildpack.git' >> .buildpacks
$ git add .buildpacks
$ git commit -m 'Add multi-buildpack'
```

For more information on troubleshooting refer to link tot he documentation provided.
