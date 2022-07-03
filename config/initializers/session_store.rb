if Rails.env == 'production' 
  Rails.application.config.session_store :cookie_store, key: '_authentication_podcast_user', domain: "https://my-podcast-lib-app.herokuapp.com"
else
  Rails.application.config.session_store :cookie_store, key: '_authentication_podcast_user', domain: "https://my-podcast-lib-app.herokuapp.com"
  
end