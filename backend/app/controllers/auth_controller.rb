class AuthController < ApplicationController
  include Authenticatable

  skip_before_action :set_current_user, only: [:signup, :login]
  # skip_before_action :verify_authenticity_token

  def signup
    user = User.new(signup_params)
    if user.save
      token = encode_token(user.id)
      render json: {
        user: user.as_json(only: [:id, :name, :email]),
        token: token
      }, status: :created
    else
      render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
    end
  end

  def login
    user = User.find_by(email: params[:email])

    if user&.authenticate(params[:password])
      token = encode_token(user.id)
      render json: {
        user: user.as_json(only: [:id, :name, :email]),
        token: token
      }, status: :ok
    else
      render json: { error: 'Invalid credentials' }, status: :unauthorized
    end
  end

  # For JWT logout, nothing to delete — just tell frontend to remove the token
  def logout
    render json: { message: 'Logged out. Remove token on client.' }, status: :ok
  end

  def me
    if current_user
      render json: { user: current_user.as_json(only: [:id, :name, :email]) }, status: :ok
    else
      render json: { user: nil }, status: :ok
    end
  end

  private

  def signup_params
    params.require(:user).permit(:name, :email, :password, :password_confirmation)
  end
end
