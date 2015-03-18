---
layout: post
title: "A little look back at the Wisita video uploader command-line to UI utility."
date: 2015-03-18 11:40:00
categories: wistia uploader command line utility api 
---

While working on our [project-2](http://getsensei.net) at GA, we faced a number of difficulties for features to implement - the main one being video uploads, through Wistia. The problem with this, though you'd think "well that's easy, it's just a gem right?" well, yes and no. 
Wistia provides amazing documentation on their video upload utility, the downside though is that it was only through the command-line. This didn't really help our novice minds much, but in this post I'll try and document the process of how we turned that utility into a graphical user interface in our app, so that our users could upload videos.


#### Gems
First off you'd need the following ruby gems, you can check them out on [rubygems](https://rubygems.org/) for more info:

```
gem 'wistia-api'
gem 'wistia-uploader'
gem 'faraday', '~> 0.9.1'
```

Run `bundle install` then continue.

#### Upload Form
Our user flow was that when a lesson is created, a video could be uploaded ( to Wistia's servers ). 
So let's build out our form as `_form.html.erb` for our `new` lesson rails action.

```
<%= simple_form_for([@project, @lesson],
wrapper_mappings: { boolean: :vertical_boolean }, input_html: {multipart: true}) do |f| %>

<%= f.input :name %>

<%= f.input :description %>
<div class="btn btn-info btn-file file-btn-edit">
	<%= f.input :pdf, as: :file %>
</div>
<div class="btn btn-warning btn-file file-btn-edit">
	<%= f.input :video, as: :file %>
</div>
<%# f.input :logo %>


<%= f.button :submit, class: 'btn-primary' %>
<% end %>
```

#### Controller Create Action
So in our *lessons_controller.rb* our `create` action would look like this:

```
  def create 
    @project = current_account.projects.find(params[:project_id])  

    @lesson = @project.lessons.create(lesson_params)
    if @lesson.valid?
      
      @lesson.wistia_video = post_video_to_wistia(params["lesson"]["video"].tempfile)
      @lesson.save
      
      redirect_to project_lesson_path(@project, @lesson), notice: "Lesson created"
    else
      render :new
    end
  end
```
Basically this is saying, on the `create` action - create a new instance of this project's lessons as `@lesson`, using the params that we permit through `lesson_params`, and saving the returned object. 
We then run a conditional to see if this object is valid, if it is we want to call the `post_video_to_wistia(video_file)` function which will take our video file - saved as `tempfile` so it doesn't cause bloat to our project - from our POST request as `params['lesson']['video']` then save it. 

#### Post Video Action
Still in our 'Lessons Controller', we want to keep working on our video upload action.
Now let's move onto what our `post_video_to_wistia(video_file)` method looks like:

```

  def post_video_to_wistia(video_file)

    conn = Faraday.new(:url => 'https://upload.wistia.com/') do |conn|
      conn.request :multipart
      conn.request :url_encoded
      conn.adapter :net_http
    end

    response = conn.post '/', {
      api_password: ENV['WISTIA_API_PASSWORD'],
      file: Faraday::UploadIO.new(video_file.path, 'application/octet-stream')
    }

    return JSON.parse(response.body)["hashed_id"]
  end
```  

Here, we need to use the [Faraday](https://github.com/lostisland/faraday) gem to talk to the Wistia API through a thing called a 'Net::HTTP' adapter so that we can process the request/ response cycle.

We begin by creating a new connection which we've named "`con`" and specify the url to connect to 'upload.wistia.com' which they've specified in their documentation [here](http://wistia.com/doc/upload-api):

> #### Importing Web/FTP Content to Wistia

> 'To import a file from a web or FTP server, supply the required parameters as a standard form-url encoded POST to https://upload.wistia.com/.'

The file is a multipart as specified in their documentation

> 'The file parameter must be multipart-form encoded into the request body.'

We then specify our adapter to be `:net_http` and we url encode our input before it is sent to their server with `conn.request :url_encoded`

Now that we have our connection object saved as a variable, we want to construct a 'request'. In this request we want to specify our api password, and our file that we are uploading. 
On the Faraday gem documentation it says:

```
payload[:profile_pic] = Faraday::UploadIO.new('/path/to/avatar.jpg', 'image/jpeg')
```

And on the Wisita uploader gem it says for video uploads:

```
...
    'file' => UploadIO.new(
                File.open(path_to_video),
                'application/octet-stream',
                File.basename(path_to_video)
                )
...
```                
( `File.basename(path_to_video)` is the vanilla ruby way of saying we want the last part of the file path, so basically we only want the file name. )

We parse the JSON as the body of our constructed response, and post it to our connection's 'root' url path. The `hashed_id` is a parameter specified on Wistia's documentation as our guid for the particular file upload, which we can then reference later to display the video. 
And there, we have uploaded our video to Wistia's Server!

Later, I will outline how we displayed the video in a next post. 
