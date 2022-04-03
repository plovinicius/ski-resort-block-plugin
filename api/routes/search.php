<?php

class SkiResortBlockSearchController {
 
    // Here initialize our namespace and resource name.
    public function __construct() {
        $this->namespace     = 'ski-resort-block/v1/resorts';
        $this->resource_name = 'search';
    }

    // Register our routes.
    public function register_routes() {
        register_rest_route( $this->namespace, '/' . $this->resource_name, array(
            // Here we register the readable endpoint for collections.
            array(
                'methods'   => 'GET',
                'callback'  => array( $this, 'get_search' ),
                'permission_callback' => array( $this, 'get_search_permissions_check' ),
            ),
            // Register our schema callback.
            // 'schema' => array( $this, 'get_search_item_schema' ),
        ) );
    }

    /**
     * Check permissions for the posts.
     *
     * @param WP_REST_Request $request Current request.
     */
    public function get_search_permissions_check( $request ) {
        // if ( ! current_user_can( 'read' ) ) {
        //     return new WP_Error( 'rest_forbidden', esc_html__( 'You cannot view the post resource.' ), array( 'status' => $this->authorization_status_code() ) );
        // }
        return true;
    }

    /**
     * Grabs the five most recent posts and outputs them as a rest response.
     *
     * @param WP_REST_Request $request Current request.
     */
    public function get_search( $request ) {
        $search = $request->get_param('q');
        
        // FIXME: create a constant with API path
        $fetch = wp_remote_get( "https://api.fnugg.no/search/?q={$search}" );
        $body = wp_remote_retrieve_body( $fetch );
        $response = json_decode( $body );
        $data = array();
        $responseData = $response->hits->hits;

        if ( is_wp_error( $response ) || empty($responseData) ) {
            return rest_ensure_response( $data );
        }

        $res = $this->prepare_item_for_response( $responseData, $request );
        $data[] = $this->prepare_response_for_collection( $res );

        // Return all of our comment response data.
        return rest_ensure_response( $data );
    }

    /**
     * Matches the post data to the schema we want.
     */
    public function prepare_item_for_response( $item, $request ) {
        // $schema = $this->get_search_schema( $request );

        $data = [
            'name' => esc_attr($item->name),
            'site_path' => esc_attr($item->site_path)
        ];

        return rest_ensure_response( $data );
    }

    /**
     * Prepare a response for inserting into a collection of responses.
     *
     * This is copied from WP_REST_Controller class in the WP REST API v2 plugin.
     *
     * @param WP_REST_Response $response Response object.
     * @return array Response data, ready for insertion into collection data.
     */
    public function prepare_response_for_collection( $response ) {
        if ( ! ( $response instanceof WP_REST_Response ) ) {
            return $response;
        }

        $data = (array) $response->get_data();
        // $server = rest_get_server();

        // if ( method_exists( $server, 'get_compact_response_links' ) ) {
        //     $links = call_user_func( array( $server, 'get_compact_response_links' ), $response );
        // } else {
        //     $links = call_user_func( array( $server, 'get_response_links' ), $response );
        // }

        // if ( ! empty( $links ) ) {
        //     $data['_links'] = $links;
        // }

        return $data;
    }

    /**
     * Get our sample schema for a post.
     *
     * @return array The sample schema for a post
     */
    public function get_search_item_schema() {
        if ( $this->schema ) {
            // Since WordPress 5.3, the schema can be cached in the $schema property.
            return $this->schema;
        }

        $this->schema = array(
            // This tells the spec of JSON Schema we are using which is draft 4.
            '$schema'              => 'http://json-schema.org/draft-04/schema#',
            // The title property marks the identity of the resource.
            'title'                => 'post',
            'type'                 => 'object',
            // In JSON Schema you can specify object properties in the properties attribute.
            'properties'           => array(
                'name' => array(
                    'description'  => esc_html__( 'Resort name.', 'ski-resort-block' ),
                    'type'         => 'string',
                ),
                'site_path' => array(
                    'description'  => esc_html__( 'Path to get resort detail.', 'ski-resort-block' ),
                    'type'         => 'string',
                ),
            ),
        );

        return $this->schema;
    }

    // Sets up the proper HTTP status code for authorization.
    public function authorization_status_code() {
        $status = 401;

        if ( is_user_logged_in() ) {
            $status = 403;
        }

        return $status;
    }
}

// Function to register our new routes from the controller.
function ski_resort_block_register_search_route() {
   $controller = new SkiResortBlockSearchController();
   $controller->register_routes();
}

add_action( 'rest_api_init', 'ski_resort_block_register_search_route' );