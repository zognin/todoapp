class ApplicationController < ActionController::Base
        include DeviseTokenAuth::Concerns::SetUserByToken
        skip_before_action :verify_authenticity_token
        before_action :set_csrf_cookie

        def render_resource(resource)
          if resource.errors.empty?
            render json: resource
          else
            validation_error(resource)
          end
        end

        def validation_error(resource)
          render json: {
            errors: [
              {
                status: '400',
                title: 'Bad Request',
                detail: resource.errors,
                code: '100'
              }
            ]
          }, status: :bad_request
        end

        private
        def set_csrf_cookie
          cookies["CSRF-TOKEN"] = form_authenticity_token
        end
end
