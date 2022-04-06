<?php

require_once WP_PLUGIN_DIR . "/ski-resort-block/Api/Controllers/ResortController.php";

class SkiResortCustomRoutes {
    private $resortController;
 
    // Here initialize our namespace and resource name.
    public function __construct() {
        $this->namespace     = 'ski-resort-block/v1/resorts';
        $this->resortController = new ResortController();
    }

    // Register our routes.
    public function register_routes() {
        // Autocomplete
        register_rest_route( $this->namespace, '/autocomplete', array(
            array(
                'methods'   => 'GET',
                'callback'  => array( $this->resortController, 'autocomplete' ),
                'permission_callback' => array( $this, 'routePermission' ),
            ),
            'schema' => array(),
        ));

        // Search
        register_rest_route( $this->namespace, '/search', array(
            array(
                'methods'   => 'GET',
                'callback'  => array( $this->resortController, 'search' ),
                'permission_callback' => array( $this, 'routePermission' ),
            ),
            'schema' => array(),
        ));
    }

    public function routePermission($request) {
        return true;
    }
}