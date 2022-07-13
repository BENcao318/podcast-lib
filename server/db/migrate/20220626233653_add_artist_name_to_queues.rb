class AddArtistNameToQueues < ActiveRecord::Migration[6.1]
  def change
    add_column :episode_queues, :artist_name, :string
  end
end
