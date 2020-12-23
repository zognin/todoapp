module Api
  module V1
    module DeviseTokenAuth
      class PasswordsController < ::DeviseTokenAuth::PasswordsController
        # Prevent password parameter from being passed
        # Unpermitted parameter: password
        wrap_parameters format: []
      end
    end
  end
end