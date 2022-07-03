if Rails.env == 'production' 
  Rails.application.config.session_store :cookie_store, key: '_authentication_podcast_user', domain: :all
else
  Rails.application.config.session_store :cookie_store, key: '_authentication_podcast_user'
end