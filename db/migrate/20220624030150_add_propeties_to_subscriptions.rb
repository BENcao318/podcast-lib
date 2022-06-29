class AddPropetiesToSubscriptions < ActiveRecord::Migration[6.1]
  def change
    add_column :subscriptions, :artist_name, :string
    add_column :subscriptions, :art_work_url_600, :string
    add_column :subscriptions, :genres, :string, array:true, default:[]
    add_column :subscriptions, :genre_ids, :string, array:true, default:[]
    add_column :subscriptions, :track_id, :int
  end
end
