class AddCollectionIdToEpisodeQueues < ActiveRecord::Migration[6.1]
  def change
    add_column :episode_queues, :collection_id, :bigint
  end
end
