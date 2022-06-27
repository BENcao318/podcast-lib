class AddReleaseDateToEpisodeQueues < ActiveRecord::Migration[6.1]
  def change
    add_column :episode_queues, :release_date, :string
  end
end
