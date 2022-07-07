class Api::V1::NotificationsController < ApplicationController
  def index
    puts 'notificationssssss'
    # render_counter = 0 
    # set_interval(2) {
    #   render_counter += 1
    #   render json: {
    #     message: render_counter
    #   }
    # }
  end

  private 

  def set_interval(delay)
    Thread.new do
      loop do
        sleep delay
        yield
      end
    end
  end
end
