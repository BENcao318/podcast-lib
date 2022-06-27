class RemoveArtistNameFromEpisodeQueues < ActiveRecord::Migration[6.1]
  def change
    remove_column :episode_queues, :artist_name
  end
end
