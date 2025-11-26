class CreatePublications < ActiveRecord::Migration[7.0]
  def change
    create_table :publications do |t|
      t.references :user, null: false, foreign_key: true
      t.string :title, null: false
      t.text :content, null: false
      t.integer :status, null: false, default: 0
      t.text :summary
      t.text :tags, array: true, default: []
      t.datetime :published_at
      t.timestamps
    end
  end
end
