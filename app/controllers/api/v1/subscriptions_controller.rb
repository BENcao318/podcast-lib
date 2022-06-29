class Api::V1::SubscriptionsController < ApplicationController
  before_action :is_logged_in?

  def create  #subscribe
    user_subscription = Subscription.where(name: subscribe_params[:name], user_id: session[:user_id])

    if user_subscription.length == 0
      Subscription.create!(name: subscribe_params[:name], description: subscribe_params[:description], artist_name: subscribe_params[:artist_name], art_work_url_600: subscribe_params[:art_work_url_600], genre_ids: subscribe_params[:genre_ids], genres: subscribe_params[:genres], track_id: subscribe_params[:track_id], user_id: session[:user_id])
      render json: {
        success: true,
        message: "A subscription is created in the user's database"
      }
    else 
      render json: {
        success: false,
        message: "Failed to create subscription"
      }
    end
  end

  def destroy #unsubscribe
    subscription = Subscription.find_by(name: params[:podcast_to_unsubscribe], user_id: session[:user_id])
    if subscription
      subscription.destroy
      render json: {
        success: true,
        message: "Successfully deleted the subscription"
      }
    else
      render json: {
        success: false,
        message: "Failed find the subscription to delete"
      }
    end 
  end

  def index
    subscriptions = Subscription.where(user_id: session[:user_id])
    render json: subscriptions
  end

  private
  
  def subscribe_params
    params.require(:podcast_to_subscribe).permit(:name, :description, :artist_name, :art_work_url_600, :genre_ids, :genres, :track_id )
  end

  def is_logged_in?
    unless logged_in? && current_user
      render json: {
        status: 401,
        message: 'user not logged_in'
      }
    end
  end
end