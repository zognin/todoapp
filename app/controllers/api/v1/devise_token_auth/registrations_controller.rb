module Api
  module V1
    module DeviseTokenAuth
      class RegistrationsController < ::DeviseTokenAuth::RegistrationsController
        # Prevent registration parameter from being passed
        # Unpermitted parameter: registration
        wrap_parameters format: []
      end
    end
  end
end