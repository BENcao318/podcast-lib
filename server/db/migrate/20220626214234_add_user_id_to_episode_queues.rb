class AddUserIdToEpisodeQueues < ActiveRecord::Migration[6.1]
  def change
    add_column :episode_queues, :user_id, :integer
    add_index :episode_queues, :user_id
  end
end
