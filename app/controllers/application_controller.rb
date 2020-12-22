class ApplicationController < ActionController::Base
        include DeviseTokenAuth::Concerns::SetUserByToken
        skip_before_action :verify_authenticity_token
        before_action :set_csrf_cookie

        private
        def set_csrf_cookie
          cookies["CSRF-TOKEN"] = form_authenticity_token
        end
end
