class ApplicationController < ActionController::API
  # REMOVE include ActionController::Cookies
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  private

  def not_found
    render json: { error: "Not Found" }, status: :not_found
  end
end
