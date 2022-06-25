class Api::V1::SubscriptionsController < ApplicationController
  before_action :is_logged_in?

  def create  #subscribe
    subscription = Subscription.find_by(name: params[:podcast_to_subscribe][:name])
    unless subscription
      Subscription.create!(name: params[:podcast_to_subscribe][:name], description: params[:podcast_to_subscribe][:description], artist_name: params[:podcast_to_subscribe][:artist_name], art_work_url_600: params[:podcast_to_subscribe][:art_work_url_600], genre_ids: params[:podcast_to_subscribe][:genre_ids], genres: params[:podcast_to_subscribe][:genres], track_id: params[:podcast_to_subscribe][:track_id], user_id: session[:user_id])
    end
  end

  def destroy #unsubscribe
    subscription = Subscription.find_by(name: params[:podcast_to_unsubscribe])
    subscription.destroy
  end

  def index
    subscriptions = Subscription.all
    render json: subscriptions
  end

  private
  
  def subscribe_params
    params.require(:podcast_to_subscribe)
  end

  def is_logged_in?
    if logged_in? && current_user
      puts 'logged_in'
    else
      render json: {
        status: 401,
        message: 'user not logged_in'
      }
    end
  end
end
