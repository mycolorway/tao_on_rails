require 'test_helper'

class ComponentTest < ActionDispatch::IntegrationTest

  test "article component should be render correctly" do
    get "/posts"

    assert_response :success

    assert response.body.include?('<article>')
    assert response.body.include?('<h1>Hello</h1>')
    assert response.body.include?('<p>You can call me God</p>')
    assert response.body.include?('</article>')

    assert response.body.include?('<h1>Hola</h1>')
    assert response.body.include?(' <p>CarpeDiem</p>')
    assert_not response.body.include?('<h2>Comments</h2>')
  end

  test "article component should be render correctly with block given" do
    get "/posts/1"

    assert_response :success

    assert response.body.include?('<article>')
    assert response.body.include?('<h1>Hello</h1>')
    assert response.body.include?('<p>You can call me God</p>')
    assert response.body.include?('<p>Extra Content</p>')
    assert response.body.include?('<h3>Comments</h3>')
    assert response.body.include?('</article>')
  end

  test "render component without component template defined" do
    get "/posts/1"

    assert_response :success

    assert response.body.include?('<tao-post-comment-list>')
    assert response.body.include?('<h3>Comments</h3>')
    assert response.body.include?('</tao-post-comment-list>')
  end
end
