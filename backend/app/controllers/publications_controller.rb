class PublicationsController < ApplicationController
  include Authenticatable

  before_action :authenticate_user!, except: [:public_index, :show_public]
  before_action :set_publication, only: [:show, :update, :destroy, :change_status]

  # ---------- PUBLIC ROUTES ----------
  def public_index
    pubs = Publication.published.order(published_at: :desc)
    render json: pubs, status: :ok
  end

  def show_public
    pub = Publication.published.find(params[:id])
    render json: pub, status: :ok
  end

  # ---------- AUTHENTICATED ROUTES ----------
  def index
    pubs = current_user.publications
                       .search_title(params[:q])
                       .filter_status(params[:status])
                       .order(created_at: :desc)
    render json: pubs, status: :ok
  end

  def show
    if @publication.user_id != current_user&.id
      render json: { error: 'Forbidden' }, status: :forbidden and return
    end
    render json: @publication, status: :ok
  end

  def create
    pub = current_user.publications.new(pub_params)
    if pub.save
      render json: pub, status: :created
    else
      render json: { errors: pub.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def update
    if @publication.user_id != current_user.id
      render json: { error: 'Forbidden' }, status: :forbidden and return
    end

    if @publication.update(pub_params)
      render json: @publication, status: :ok
    else
      render json: { errors: @publication.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def destroy
    if @publication.user_id != current_user.id
      render json: { error: 'Forbidden' }, status: :forbidden and return
    end

    @publication.destroy
    head :no_content
  end

  def change_status
    if @publication.user_id != current_user.id
      render json: { error: 'Forbidden' }, status: :forbidden and return
    end

    status = params[:status]
    if Publication.statuses.keys.include?(status)
      @publication.update(
        status: status,
        published_at: (status == 'published' ? Time.current : nil)
      )
      render json: @publication, status: :ok
    else
      render json: { error: 'Invalid status' }, status: :unprocessable_entity
    end
  end

  def bulk_delete
    ids = params[:ids] || []
    to_delete = current_user.publications.where(id: ids)
    deleted = to_delete.map(&:id)
    to_delete.destroy_all
    render json: { deleted_ids: deleted }, status: :ok
  end

  private

  def set_publication
    @publication = Publication.find(params[:id])
  rescue ActiveRecord::RecordNotFound
    render json: { error: 'Not Found' }, status: :not_found
  end

  def pub_params
    params.require(:publication).permit(:title, :content, :status, :summary, tags: [])
  end
end
