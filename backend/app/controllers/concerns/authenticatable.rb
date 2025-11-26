module Authenticatable
  extend ActiveSupport::Concern

  included do
    before_action :set_current_user
  end

  def authenticate_user!
    render json: { error: 'Unauthorized' }, status: :unauthorized unless current_user
  end

  def current_user
    @current_user
  end

  private

  # ---------------------------
  # ONLY AUTHORIZATION TOKEN
  # ---------------------------
  def set_current_user
    token = extract_token_from_header
    return unless token

    payload = decode_token(token)
    @current_user = User.find_by(id: payload['sub'])

  rescue JWT::DecodeError, JWT::ExpiredSignature
    @current_user = nil
  end

  def extract_token_from_header
    auth_header = request.headers['Authorization']
    return nil unless auth_header.present?

    scheme, token = auth_header.split(' ')
    return token if scheme == 'Bearer'

    nil
  end

  def encode_token(user_id)
    payload = { sub: user_id, exp: Time.now.to_i + JWT_EXP }
    JWT.encode(payload, JWT_SECRET, 'HS256')
  end

  def decode_token(token)
    decoded, = JWT.decode(token, JWT_SECRET, true, algorithm: 'HS256')
    decoded
  end
end
