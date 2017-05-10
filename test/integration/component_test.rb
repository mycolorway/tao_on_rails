require 'test_helper'

class ComponentTest < ActionDispatch::IntegrationTest

  test "The Tao Page should be render correctly" do
    get "/posts/1"

    assert_response :success

    assert response.body.include?('<h1>Tao Page</h1>')
  end

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
    assert response.body.include?('</article>')
    assert response.body.include?('<h2>Comments</h2>')
  end

  test "render component without component template defined" do
    get "/authors/1"

    assert_response :success

    assert response.body.include?('<tao-author>')
    assert response.body.include?('<h2>Jesus<h2>')
    assert response.body.include?('</tao-author>')
  end
end
